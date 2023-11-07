import { Request, Response } from "express";
import { PermissionController } from "../../controllers/PermissionController";
import { Permission } from "../../entities/permissions/Permission";
import { ApiError, BadRequest } from "../../helpers/ApiError";
import { validate } from "../../helpers/validate";
import { permissionSchema } from "../../validations/permissions";

export class UpdatePermission {
  async execute(request: Request, response: Response) {
    try {
      const errors = await validate(request.body, permissionSchema);
      if (errors) throw new BadRequest(errors.join(", "));

      const permission = new Permission(request.body);

      const permissionControler = new PermissionController();
      const permissionUpdate = await permissionControler.update(
        permission.data,
        Number(request.params.idPermission)
      );

      return response.status(200).json(permissionUpdate);
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode ?? 400)
        .json({ message: typedError.message });
    }
  }
}
