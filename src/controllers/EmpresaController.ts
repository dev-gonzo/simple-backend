import { Prisma } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";
import { removeSpecialCharacters } from "../helpers/removeSpecialCharacters";
import { ApiError, BadRequest } from "../helpers/ApiError";
import { PropsEmpresa } from "../@types/typeEmpresa";

export class EmpresaController {
  public empresa: PropsEmpresa | undefined;
  async create(payload: PropsEmpresa, userId: number) {
    const registered = await this.registeredCnpj(payload.cnpj);
    if (registered) throw new BadRequest("CNPJ já cadastrado");

    try {
      const empresa = await prismaClient.empresa.create({
        data: {
          ...payload,
          cnpj: removeSpecialCharacters(payload.cnpj),
          telefone: removeSpecialCharacters(payload.telefone),
          userId: userId,
          active: true,
          UserEmpresas: {
            create: [
              {
                userId: userId,
                active: true,
              },
            ],
          },
        },
      });

      return empresa;
    } catch (e) {
      throw new BadRequest("Erro ao cadatrar");
    }
  }

  async registeredCnpj(cnpj: string) {
    try {
      const empresa = await prismaClient.empresa.findUnique({
        where: {
          cnpj: removeSpecialCharacters(cnpj),
        },
      });

      return empresa;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return null;
      }
      const typedError = err as ApiError;
      throw new BadRequest(typedError.message);
    }
  }

  
}
