import { Request, Response } from "express";
import { PermissionController } from "../../controllers/PermissionController";
import { Permission } from "../../entities/permissions/Permission";
import { ApiError, BadRequest } from "../../helpers/ApiError";
import { validate } from "../../helpers/validate";
import { permissionSchema } from "../../validations/permissions";

export class CreatePermission {
  async execute(request: Request, response: Response) {
    try {
      const errors = await validate(request.body, permissionSchema);
      if (errors) throw new BadRequest(errors.join(", "));

      const { key, active } = request.body;

      const permission = new Permission({
        key,
        active: active === undefined ? true : active,
      });

      const permissionController = new PermissionController();
      const permissionCreated = await permissionController.create(
        permission.data
      );

      return response.status(201).json(permissionCreated);
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode ?? 400)
        .json({ message: typedError.message });
    }
  }
}
