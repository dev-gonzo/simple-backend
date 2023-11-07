import { Request, Response } from "express";
import { PermissionController } from "../../controllers/PermissionController";
import { ApiError } from "../../helpers/ApiError";

export class GetByIdPermission {
  async execute(request: Request, response: Response) {
    try {
      const permissionControler = new PermissionController();
      const permission = await permissionControler.findById(
        Number(request.params.idPermission)
      );

      return response.status(200).json(permission);
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode)
        .json({ message: typedError.message });
    }
  }
}
