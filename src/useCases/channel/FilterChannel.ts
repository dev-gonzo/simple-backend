import { Request, Response } from "express";
import { PropsOrigin } from "../../@types/typeOrigin";
import { OriginController } from "../../controllers/OriginController";
import { ApiError } from "../../helpers/ApiError";
import { ChannelController } from "../../controllers/ChannelController";

export class FilterChannel {
  async execute(request: Request, response: Response) {
    try {
      const channelController = new ChannelController();
      const channels = await channelController.filter(
        request.query as Partial<PropsOrigin>,
        request.empresaId
      );

      return response.status(200).json(channels);
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode)
        .json({ message: typedError.message });
    }
  }
}
