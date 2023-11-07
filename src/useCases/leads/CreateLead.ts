import { Request, Response } from "express";
import { LeadController } from "../../controllers/LeadController";
import { Lead } from "../../entities/lead";
import { ApiError } from "../../helpers/ApiError";

export class CreateLead {
  async execute(request: Request, response: Response) {
    try {
      // const errors = await validate(request.body, originSchema);
      // if (errors) throw new BadRequest(errors.join(", "));

      const lead = new Lead(request.body);

      const leadController = new LeadController();
      const leadCreated = await leadController.create(
        lead.data,
        Number(request.empresaId),
        Number(request.userId)
      );

      return response.status(201).json(leadCreated);
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode ?? 500)
        .json({ message: typedError.message });
    }
  }
}
