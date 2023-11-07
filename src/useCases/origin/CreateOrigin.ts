import { Request, Response } from "express";
import { OriginController } from "../../controllers/OriginController";
import { Origin } from "../../entities/origin";
import { ApiError, BadRequest } from "../../helpers/ApiError";
import { validate } from "../../helpers/validate";
import { originSchema } from "../../validations/origin/originSchema";

export class CreateOrigin {
  async execute(request: Request, response: Response) {
    try {
      const errors = await validate(request.body, originSchema);
      if (errors) throw new BadRequest(errors.join(", "));

      const origin = new Origin(request.body);

      const originController = new OriginController();
      const originCreated = await originController.create(
        origin.data,
        Number(request.empresaId)
      );

      return response.status(201).json(originCreated);
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode ?? 500)
        .json({ message: typedError.message });
    }
  }
}
