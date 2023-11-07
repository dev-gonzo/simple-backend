import { Request, Response } from "express";
import { PermissionController } from "../../controllers/PermissionController";
import { ApiError } from "../../helpers/ApiError";

export class DeletePermission {
  async execute(request: Request, response: Response) {
    try {
      const permissionControler = new PermissionController();
      await permissionControler.delete(Number(request.params.idPermission));

      return response.status(204).json();
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode)
        .json({ message: typedError.message });
    }
  }
}
