import { Prisma } from "@prisma/client";
import { PropsPermission } from "../@types/typePermission";
import { prismaClient } from "../database/prismaClient";
import { ApiError, BadRequest, InternalServerError } from "../helpers/ApiError";
import { convertStringToBoolean } from "../helpers/convertStringToBoolean";

export class PermissionController {
  async create(payload: PropsPermission) {
    const registered = await this.registeredKey(payload.key);
    if (registered) throw new BadRequest("Código já cadastrado");

    try {
      const permission = await prismaClient.permissions.create({
        data: payload,
      });

      return permission;
    } catch (e) {
      throw new BadRequest("Erro ao cadatrar o permissão");
    }
  }

  async update(payload: Partial<PropsPermission>, idPermission: number) {
    if (payload.key) {
      const registered = await this.registeredKey(payload.key);

      if (registered && idPermission != registered?.id) {
        throw new BadRequest(
          "Código já esta sendo utilizado em outra permissão"
        );
      }
    }

    try {
      const permission = await prismaClient.permissions.update({
        where: {
          id: idPermission,
        },
        data: payload,
      });

      return permission;
    } catch (e) {
      throw new BadRequest("Não foi possível atualizar");
    }
  }

  async delete(idPermission: number) {
    try {
      await prismaClient.permissions.delete({
        where: {
          id: idPermission,
        },
      });

      return;
    } catch (e) {
      throw new BadRequest("Não foi possível excluir");
    }
  }

  async findById(idPermission: number) {
    try {
      const permission = await prismaClient.permissions.findUnique({
        where: {
          id: idPermission,
        },
      });

      return permission;
    } catch (e) {
      throw new InternalServerError();
    }
  }

  async filter(filter: Partial<PropsPermission>) {
    try {
      const { key, active } = filter;

      const permission = await prismaClient.permissions.findMany({
        where: {
          key: key
            ? {
                contains: key,
                mode: "insensitive",
              }
            : undefined,

          active: convertStringToBoolean(active),
        },
      });

      return permission;
    } catch (e) {
      throw new InternalServerError();
    }
  }

  private async registeredKey(key: string) {
    try {
      const permissions = await prismaClient.permissions.findUnique({
        where: {
          key,
        },
      });

      return permissions;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return null;
      }
      const typedError = err as ApiError;
      throw new BadRequest(typedError.message);
    }
  }
}
