import { Request, Response } from "express";
import { PermissionController } from "../../controllers/PermissionController";
import { AccessGroup } from "../../entities/permissions/AccessGroup";
import { ApiError, BadRequest } from "../../helpers/ApiError";
import { validate } from "../../helpers/validate";
import { accessGroupSchema } from "../../validations/permissions/accessSchema";
import { AccessGroupController } from "../../controllers/AccessGroupController";

export class UpdateAccesGroup {
  async execute(request: Request, response: Response) {
    try {
      const errors = await validate(request.body, accessGroupSchema);
      if (errors) throw new BadRequest(errors.join(", "));

      const accessGroup = new AccessGroup(request.body);

      const accessGroupControler = new AccessGroupController();
      const accessGroupUpdate = await accessGroupControler.update(
        accessGroup.data,
        Number(request.params.idAccessGroup)
      );

      return response.status(200).json(accessGroupUpdate);
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode ?? 400)
        .json({ message: typedError.message });
    }
  }
}
