import { Request, Response } from "express";
import { UserController } from "../../controllers/UserController";
import { ApiError, BadRequest } from "../../helpers/ApiError";

export class ActiveUser {
  async execute(request: Request, response: Response) {
    try {
      const idUser = request.params.idUser;

      const useControler = new UserController();
      const user = await useControler.findById(Number(idUser));

      if (!user) throw new BadRequest("Usuário não existe");

      const userCreated = await useControler.update(
        {
          active: true,
        },
        Number(idUser)
      );
      return response.status(200).json(userCreated);
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode)
        .json({ message: typedError.message });
    }
  }
}
