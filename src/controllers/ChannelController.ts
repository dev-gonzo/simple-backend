import { Prisma } from "@prisma/client";
import { PropsChannel } from "../@types/typeChannel";
import { prismaClient } from "../database/prismaClient";
import { ApiError, BadRequest, InternalServerError } from "../helpers/ApiError";
import { convertStringToBoolean } from "../helpers/convertStringToBoolean";

export class ChannelController {
  async create(payload: PropsChannel, empresaId: number) {
    const registered = await this.registeredName(payload.name);
    if (registered) throw new BadRequest("Canal de atendimento já cadastrado");

    try {
      const origin = await prismaClient.serviceChannel.create({
        data: {
          ...payload,
          active: true,
          empresaId: empresaId,
        },
      });

      return origin;
    } catch (e) {
      throw new BadRequest("Erro ao cadatrar o origin");
    }
  }

  async update(payload: Partial<PropsChannel>, idOrigin: number) {
    if (payload.name) {
      const registered = await this.registeredName(payload.name);

      if (registered && idOrigin != registered?.id) {
        throw new BadRequest("Nome já esta sendo utilizado em origem");
      }
    }

    try {
      const origin = await prismaClient.origin.update({
        where: {
          id: idOrigin,
        },
        data: payload,
      });

      return origin;
    } catch (e) {
      throw new BadRequest("Não foi possível atualizar");
    }
  }

  async delete(idOrigin: number) {
    try {
      await prismaClient.serviceChannel.delete({
        where: {
          id: idOrigin,
        },
      });

      return;
    } catch (e) {
      throw new BadRequest("Não foi possível excluir");
    }
  }

  async findById(idOrigin: number) {
    try {
      const accessGroup = await prismaClient.serviceChannel.findUnique({
        where: {
          id: idOrigin,
        },
      });

      return accessGroup;
    } catch (e) {
      throw new InternalServerError();
    }
  }

  async filter(filter: Partial<PropsChannel>, empresaId: number) {
    try {
      const { name, active } = filter;

      const origin = await prismaClient.serviceChannel.findMany({
        where: {
          name: name
            ? {
                contains: name,
                mode: "insensitive",
              }
            : undefined,

          active: convertStringToBoolean(active),
          empresaId: empresaId,
        },
      });

      return origin;
    } catch (e) {
      throw new InternalServerError();
    }
  }

  private async registeredName(name: string) {
    try {
      const origin = await prismaClient.serviceChannel.findFirst({
        where: {
          name,
        },
      });

      return origin;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return null;
      }
      const typedError = err as ApiError;
      throw new BadRequest(typedError.message);
    }
  }
}
