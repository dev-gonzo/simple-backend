import { Request, Response } from "express";
import { AccessGroupController } from "../../controllers/AccessGroupController";
import { ApiError } from "../../helpers/ApiError";

export class DeleteAccessGroup {
  async execute(request: Request, response: Response) {
    try {
      const accessGroupController = new AccessGroupController();
      await accessGroupController.delete(Number(request.params.idAccessGroup));

      return response.status(204).json();
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode)
        .json({ message: typedError.message });
    }
  }
}
