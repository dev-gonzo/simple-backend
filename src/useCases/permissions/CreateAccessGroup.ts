import { Request, Response } from "express";
import { AccessGroupController } from "../../controllers/AccessGroupController";
import { AccessGroup } from "../../entities/permissions/AccessGroup";
import { ApiError, BadRequest } from "../../helpers/ApiError";
import { validate } from "../../helpers/validate";
import { accessGroupSchema } from "../../validations/permissions/accessSchema";

export class CreateAccessGroup {
  async execute(request: Request, response: Response) {
    try {
      const errors = await validate(request.body, accessGroupSchema);
      if (errors) throw new BadRequest(errors.join(", "));

      const { name, active } = request.body;

      const accessGroup = new AccessGroup({
        name,
        active: active === undefined ? true : active,
      });

      const accessGroupController = new AccessGroupController();
      const accessGroupCreated = await accessGroupController.create(
        accessGroup.data
      );

      return response.status(201).json(accessGroupCreated);
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode ?? 400)
        .json({ message: typedError.message });
    }
  }
}
