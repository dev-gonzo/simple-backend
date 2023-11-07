import { Request, Response } from "express";
import { UserController } from "../../controllers/UserController";
import { ApiError } from "../../helpers/ApiError";

export class DeleteUser {
  async execute(request: Request, response: Response) {
    try {
      const useControler = new UserController();
      await useControler.delete(Number(request.params.idUser));

      return response.status(204).json();
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode)
        .json({ message: typedError.message });
    }
  }
}
