import { Prisma } from "@prisma/client";
import {
  PropsAccessGroup,
  PropsAccessGroupPermissions,
  PropsPermission,
} from "../@types/typePermission";
import { prismaClient } from "../database/prismaClient";
import { ApiError, BadRequest, InternalServerError } from "../helpers/ApiError";
import { convertStringToBoolean } from "../helpers/convertStringToBoolean";

export class AccessGroupController {
  async create(payload: PropsAccessGroup) {
    const registered = await this.registeredName(payload.name);
    if (registered) throw new BadRequest("Grupo já cadastrado");

    try {
      const accessGroup = await prismaClient.accessGroup.create({
        data: payload,
      });

      return accessGroup;
    } catch (e) {
      throw new BadRequest("Erro ao cadatrar o grupo");
    }
  }

  async update(payload: Partial<PropsAccessGroup>, idAccessGroup: number) {
    if (payload.name) {
      const registered = await this.registeredName(payload.name);

      if (registered && idAccessGroup != registered?.id) {
        throw new BadRequest("Nome já esta sendo utilizado em outra grupo");
      }
    }

    try {
      const accessGroup = await prismaClient.accessGroup.update({
        where: {
          id: idAccessGroup,
        },
        data: payload,
      });

      return accessGroup;
    } catch (e) {
      throw new BadRequest("Não foi possível atualizar");
    }
  }

  async delete(idAccessGroup: number) {
    try {
      await prismaClient.accessGroup.delete({
        where: {
          id: idAccessGroup,
        },
      });

      return;
    } catch (e) {
      throw new BadRequest("Não foi possível excluir");
    }
  }

  async findById(idAccessGroup: number) {
    try {
      const accessGroup = await prismaClient.accessGroup.findUnique({
        where: {
          id: idAccessGroup,
        },
      });

      return accessGroup;
    } catch (e) {
      throw new InternalServerError();
    }
  }

  async filter(filter: Partial<PropsAccessGroup>) {
    try {
      const { name, active } = filter;

      const accessGroup = await prismaClient.accessGroup.findMany({
        where: {
          name: name
            ? {
                contains: name,
                mode: "insensitive",
              }
            : undefined,

          active: convertStringToBoolean(active),
        },
      });

      return accessGroup;
    } catch (e) {
      throw new InternalServerError();
    }
  }

  async bondedPermissions(idAccessGroup: number, listPermissions: number[]) {
    try {
      const listExistingPermissions =
        await prismaClient.accessGroupPermissions.findMany({
          where: {
            accessGroupId: idAccessGroup,
          },
        });

      const listDelete = listExistingPermissions.filter(
        (permissions) => !listPermissions.includes(permissions.permissionsId)
      );

      listDelete.forEach(async (item) => {
        await prismaClient.accessGroupPermissions.delete({
          where: {
            id: item.id,
          },
        });
      });

      const listInsert = listPermissions
        .filter(
          (permission) =>
            listExistingPermissions.findIndex(item => item.permissionsId == permission) == -1
        )
        .map((permission) => {
          return {
            accessGroupId: idAccessGroup,
            permissionsId: permission,
          };
        });

  

      // const insertList = listPermissions.map((permission) => {
      //   return {
      //     accessGroupId: idAccessGroup,
      //     permissionsId: permission,
      //   };
      // });

      const accessGroup = await prismaClient.accessGroupPermissions.createMany({
        data: listInsert,
      });

      return accessGroup;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return null;
      }
      const typedError = err as ApiError;
      throw new BadRequest(typedError.message);
    }
  }

  private async registeredName(name: string) {
    try {
      const accessGroup = await prismaClient.accessGroup.findFirst({
        where: {
          name,
        },
      });

      return accessGroup;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return null;
      }
      const typedError = err as ApiError;
      throw new BadRequest(typedError.message);
    }
  }
}
