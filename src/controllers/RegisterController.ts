import { Prisma } from "@prisma/client";
import md5 from "crypto-js/md5";
import { PropsRegister } from "../@types/typeRegister";
import { prismaClient } from "../database/prismaClient";
import { ApiError, BadRequest } from "../helpers/ApiError";
import { removeSpecialCharacters } from "../helpers/removeSpecialCharacters";
import { EmpresaController } from "./EmpresaController";

export class RegisterController extends EmpresaController {
  async register(payload: PropsRegister) {
    const registered = await this.registeredCnpj(payload.empresa.cnpj ?? "");
    if (registered) throw new BadRequest("CNPJ já cadastrado");

    const registeredEmail = await this.registeredEmail(
      payload.user.email ?? ""
    );
    if (registeredEmail)
      throw new BadRequest("E-mail de usuário já cadastrado");

    try {
      const { user, empresa } = payload;

      await prismaClient.empresa.create({
        data: {
          ...empresa,
          cnpj: removeSpecialCharacters(empresa.cnpj),
          telefone: removeSpecialCharacters(empresa.telefone),
          active: true,
          users: {
            create: [
              {
                name: user.name,
                email: user.email,
                password: md5(user.password).toString(),
                active: true,
                accessGroupId: 2,
              },
            ],
          },
        },
      });

      return { message: "Cadastro efetuado com sucesso" };
    } catch (e) {
      throw new BadRequest("Erro ao efetuar o cadastro");
    }
  }

  private async registeredEmail(email: string) {
    try {
      const user = await prismaClient.users.findUnique({
        where: {
          email,
        },
      });

      return user;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return null;
      }
      const typedError = err as ApiError;
      throw new BadRequest(typedError.message);
    }
  }
}
