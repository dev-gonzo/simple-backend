import { Request, Response } from "express";
import { PropsLead } from "../../@types/typeLead";
import { LeadController } from "../../controllers/LeadController";
import { ApiError } from "../../helpers/ApiError";

export class FilterLead {
  async execute(request: Request, response: Response) {
    try {
      const leadController = new LeadController();
      const leads = await leadController.filter(
        request.query as Partial<PropsLead>,
        request.empresaId
      );

      return response.status(200).json(leads);
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode)
        .json({ message: typedError.message });
    }
  }
}
