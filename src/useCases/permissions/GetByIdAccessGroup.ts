import { Request, Response } from "express";
import { AccessGroupController } from "../../controllers/AccessGroupController";
import { ApiError } from "../../helpers/ApiError";

export class GetByIdAccessGroup {
  async execute(request: Request, response: Response) {
    try {
      const accessGroupController = new AccessGroupController();
      const accessGroup = await accessGroupController.findById(
        Number(request.params.idAccessGroup)
      );

      return response.status(200).json(accessGroup);
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode)
        .json({ message: typedError.message });
    }
  }
}
