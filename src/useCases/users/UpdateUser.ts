import { Request, Response } from "express";
import { UserController } from "../../controllers/UserController";
import { User } from "../../entities";
import { ApiError, BadRequest } from "../../helpers/ApiError";
import { validate } from "../../helpers/validate";
import { usersCreateSchema } from "../../validations";

export class UpdateUser {
  async execute(request: Request, response: Response) {
    try {
      const errors = await validate(request.body, usersCreateSchema);
      if (errors) throw new BadRequest(errors.join(", "));

      const { name, email, password } = request.body;

      const user = new User({
        name,
        email,
        active: true,
        password: password,
      });

      const useControler = new UserController();
      const userCreated = await useControler.update(
        user.data,
        Number(request.params.idUser)
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
