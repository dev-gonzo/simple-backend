import { Request, Response } from "express";
import { RegisterController } from "../../controllers/RegisterController";
import { ApiError, BadRequest } from "../../helpers/ApiError";
import { validate } from "../../helpers/validate";
import { usersCreateSchema } from "../../validations";
import { empresaSchema } from "../../validations/empresa";

export class CreateRegister {
  async execute(request: Request, response: Response) {
    try {
      const errorsUser = await validate(request.body.user, usersCreateSchema);
      const errorsEmpresa = await validate(request.body.empresa, empresaSchema);
      if (errorsUser || errorsEmpresa)
        throw new BadRequest(
          errorsUser?.concat(errorsEmpresa ?? []).join(", ") ?? ""
        );

      const registerController = new RegisterController();
      const empresaCreated = await registerController.register(request.body);

      return response.status(201).json(empresaCreated);
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode ?? 500)
        .json({ message: typedError.message });
    }
  }
}
