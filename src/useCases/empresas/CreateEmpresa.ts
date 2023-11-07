import { Request, Response } from "express";
import { EmpresaController } from "../../controllers/EmpresaController";
import { Empresa } from "../../entities/empresa/empresa";
import { ApiError, BadRequest } from "../../helpers/ApiError";
import { validate } from "../../helpers/validate";
import { empresaSchema } from "../../validations/empresa";

export class CreateEmrpesa {
  async execute(request: Request, response: Response) {
    try {
      const errors = await validate(request.body, empresaSchema);
      if (errors) throw new BadRequest(errors.join(", "));

      const empresa = new Empresa(request.body);

      const empresaController = new EmpresaController();
      const empresaCreated = await empresaController.create(
        empresa.data,
        Number(request.userId)
      );

      return response.status(201).json(empresaCreated);
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode ?? 500)
        .json({ message: typedError.message });
    }
  }
}
