import { Request, Response } from "express";
import { PropsOrigin } from "../../@types/typeOrigin";
import { OriginController } from "../../controllers/OriginController";
import { ApiError } from "../../helpers/ApiError";

export class FilterOrigin {
  async execute(request: Request, response: Response) {
    try {
      const originController = new OriginController();
      const origins = await originController.filter(
        request.query as Partial<PropsOrigin>,
        request.empresaId
      );

      return response.status(200).json(origins);
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode)
        .json({ message: typedError.message });
    }
  }
}
