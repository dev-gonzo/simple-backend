import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthController } from "../controllers/AuthController";
import { ApiError, Unauthorized } from "../helpers/ApiError";

interface TokenPayload {
  id: number;
  name: string;
  email: string;
  empresa: {
    id: number;
    nomeFantasia: string;
    active: boolean;
  };
  iat: number;
  exp: number;
}
export default async function authMiddlewares(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      throw new Unauthorized("Informe um token");
    }

    const token = authorization.replace("Bearer", "").trim();
    const invalidToken = new AuthController();
    if (await invalidToken.blackList(token)) {
      throw new Unauthorized("Login inválido");
    }

    const data = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
    const { id, empresa } = data as TokenPayload;

    req.userId = id;
    req.empresaId = empresa.id;
    next();
  } catch (err) {
    const typedError = err as ApiError;
    return res.status(typedError.statusCode ?? 401).json({
      message: typedError.statusCode ? typedError.message : "Login inválido",
    });
  }
}
