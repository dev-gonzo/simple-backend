import { Request, Response } from "express";
import { AuthController } from "../../controllers/AuthController";
import { ApiError, BadRequest } from "../../helpers/ApiError";

export class LogoutUser {
  async execute(request: Request, response: Response) {
    try {
      const { authorization } = request.headers;

      if (!authorization || authorization.replace("Bearer", "").trim() == "") {
        throw new BadRequest("Informe um token");
      }

      const token = authorization.replace("Bearer", "").trim();

      const logout = new AuthController();
      logout.logout(token);

      return response.status(200).json({ message: "Usuário deslogado" });
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode)
        .json({ message: typedError.message });
    }
  }
}
