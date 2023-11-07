import { Prisma } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";
import { ApiError, BadRequest, InternalServerError } from "../helpers/ApiError";
import { PropsUser } from "../@types/typeUsers";
import { convertStringToBoolean } from "../helpers/convertStringToBoolean";

export class UserController {
  async create(payload: PropsUser) {
    const registered = await this.registeredEmail(payload.email);
    if (registered) throw new BadRequest("E-mail já cadastrado");

    try {
      const user = await prismaClient.users.create({
        data: payload,
      });

      return this.userResponse(user);
    } catch (e) {
      throw new BadRequest("Erro ao cadatrar o usuário");
    }
  }

  async update(payload: Partial<PropsUser>, idUser: number) {
    if (payload.email) {
      const registered = await this.registeredEmail(payload.email);

      if (payload.id != registered?.id) {
        throw new BadRequest(
          "O e-mail informado já está cadastrado por outro usuário"
        );
      }
    }

    try {
      const user = await prismaClient.users.update({
        where: {
          id: idUser,
        },
        data: payload,
      });

      return this.userResponse(user);
    } catch (e) {
      throw new BadRequest("Não foi possível atualizar");
    }
  }

  async delete(idUser: number) {
    try {
      const user = await prismaClient.users.delete({
        where: {
          id: idUser,
        },
      });

      return;
    } catch (e) {
      throw new BadRequest("Não foi possível excluir");
    }
  }

  async findById(idUser: number) {
    try {
      const user = await prismaClient.users.findUnique({
        where: {
          id: idUser,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createAt: true,
          updateAt: true,
          active: true,
        },
      });

      return user;
    } catch (e) {
      throw new InternalServerError();
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await prismaClient.users.findUnique({
        where: {
          email: email,
        },
        select: {
          email: true,
        },
      });

      return user;
    } catch (e) {
      throw new InternalServerError();
    }
  }

  async filter(filter: Partial<PropsUser>) {
    try {
      const { name, email, active } = filter;

      const user = await prismaClient.users.findMany({
        where: {
          name: name
            ? {
                contains: name,
                mode: "insensitive",
              }
            : undefined,
          email: email
            ? {
                contains: email,
                mode: "insensitive",
              }
            : undefined,
          active: convertStringToBoolean(active),
        },
        select: {
          id: true,
          name: true,
          email: true,
          createAt: true,
          updateAt: true,
          active: true,
        },
      });

      return user;
    } catch (e) {
      throw new InternalServerError();
    }
  }

  private userResponse(user: PropsUser) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, deleted, ...others } = user;

    return others;
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
