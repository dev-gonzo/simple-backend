import { Request, Response } from "express";
import { EmpresaController } from "../../controllers/EmpresaController";
import { ApiError } from "../../helpers/ApiError";

export class GetCnpjEmpresas {
  async execute(request: Request, response: Response) {
    try {
      const empresaController = new EmpresaController();
      const empresa = await empresaController.registeredCnpj(
        request.params.cnpj
      );

      return response.status(200).json(empresa);
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode)
        .json({ message: typedError.message });
    }
  }
}
