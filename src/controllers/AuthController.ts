import md5 from "crypto-js/md5";
import { prismaClient } from "../database/prismaClient";
import { ApiError, Unauthorized } from "../helpers/ApiError";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export class AuthController {
  async authenticate(email: string, password: string) {
    try {
      const user = await prismaClient.users.findUnique({
        where: {
          email: email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          active: true,
          empresa: {
            select: {
              id: true,
              cnpj: true,
              nomeFantasia: true,
              razaoSocial: true,
            },
          },
          accessGroup: {
            select: {
              name: true,
              accessGroupPermissions: {
                where: {
                  permissions: {
                    active: true,
                  },
                },
                select: {
                  permissions: {
                    select: {
                      key: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (
        user?.email !== email ||
        user?.password !== md5(password).toString() ||
        !user?.active
      ) {
        throw new Unauthorized("Usuário ou senha inválido");
      }

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          empresa: user.empresa,
          permissions: user.accessGroup?.accessGroupPermissions?.map(
            (item) => item?.permissions?.key
          ),
        },
        `${process.env.SECRET_TOKEN}`,
        { expiresIn: "1d" }
      );

      return token;
    } catch (err) {
      const typedError = err as ApiError;
      throw new Unauthorized(typedError.message);
    }
  }

  async logout(token: string) {
    try {
      const blackList = await prismaClient.tokenBlackList.findUnique({
        where: {
          token,
        },
      });

      if (blackList) {
        return;
      }

      await prismaClient.tokenBlackList.create({
        data: {
          token: token,
        },
      });
    } catch (err) {
      const typedError = err as ApiError;
      throw new Unauthorized(typedError.message);
    }
  }

  async blackList(token: string) {
    try {
      const invalidToken = await prismaClient.tokenBlackList.findUnique({
        where: {
          token,
        },
      });

      return invalidToken?.token;
    } catch (err) {
      const typedError = err as ApiError;
      throw new Unauthorized(typedError.message);
    }
  }
}
