import { Request, Response } from "express";
import { User } from "../../entities";
import { validate } from "../../helpers/validate";
import { usersCreateSchema } from "../../validations";
import { UserController } from "../../controllers/UserController";
import { ApiError, BadRequest } from "../../helpers/ApiError";

export class CreateUser {
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
      const userCreated = await useControler.create(user.data);

      return response.status(201).json(userCreated);
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode ?? 400)
        .json({ message: typedError.message });
    }
  }
}
