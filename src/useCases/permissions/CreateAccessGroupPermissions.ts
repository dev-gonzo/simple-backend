import { Request, Response } from "express";
import { AccessGroupController } from "../../controllers/AccessGroupController";
import { AccessGroup } from "../../entities/permissions/AccessGroup";
import { ApiError, BadRequest } from "../../helpers/ApiError";
import { validate } from "../../helpers/validate";
import { accessGroupPermissionsSchema } from "../../validations/permissions/accessGroupPermissionsSchema";

export class CreateAccessGroupPermissions {
  async execute(request: Request, response: Response) {
    try {
      const errors = await validate(request.body, accessGroupPermissionsSchema);
      if (errors) throw new BadRequest(errors.join(", "));

      const accessGroupController = new AccessGroupController();
      const bondedCreated = await accessGroupController.bondedPermissions(
        Number(request.params.idAccessGroup),
        request.body.permissions
      );

      return response.status(201).json(bondedCreated);
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode ?? 400)
        .json({ message: typedError.message });
    }
  }
}
