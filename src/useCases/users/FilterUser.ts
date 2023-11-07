import { Request, Response } from "express";
import { UserController } from "../../controllers/UserController";
import { ApiError } from "../../helpers/ApiError";
import { PropsUser } from "../../@types/typeUsers";

export class FilterUser {
  async execute(request: Request, response: Response) {
    try {
      const useControler = new UserController();
      const users = await useControler.filter(
        request.query as Partial<PropsUser>
      );

      return response.status(200).json(users);
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode)
        .json({ message: typedError.message });
    }
  }
}
