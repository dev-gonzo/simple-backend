import { Request, Response } from "express";
import { AuthController } from "../../controllers/AuthController";
import { ApiError, BadRequest } from "../../helpers/ApiError";
import { validate } from "../../helpers/validate";
import { authLoginSchema } from "../../validations/auth";

export class AuthenticateUser {
  async execute(request: Request, response: Response) {
  
    try {
      const errors = await validate(request.body, authLoginSchema);
      if (errors) throw new BadRequest(errors.join(", "));

      const { email, password } = request.body;

      const authControler = new AuthController();
      const user = await authControler.authenticate(email, password);

      return response.status(200).json(user);
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode)
        .json({ message: typedError.message });
    }
  }
}
