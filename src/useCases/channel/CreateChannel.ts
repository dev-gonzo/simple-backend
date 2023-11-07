import { Request, Response } from "express";
import { ChannelController } from "../../controllers/ChannelController";
import { Channel } from "../../entities/channel";
import { ApiError, BadRequest } from "../../helpers/ApiError";
import { validate } from "../../helpers/validate";
import { channelSchema } from "../../validations/channel/channelSchema";

export class CreateChannel {
  async execute(request: Request, response: Response) {
    try {
      const errors = await validate(request.body, channelSchema);
      if (errors) throw new BadRequest(errors.join(", "));

      const channel = new Channel(request.body);

      const channelController = new ChannelController();
      const channelCreated = await channelController.create(
        channel.data,
        Number(request.empresaId)
      );

      return response.status(201).json(channelCreated);
    } catch (err) {
      const typedError = err as ApiError;
      return response
        .status(typedError.statusCode ?? 500)
        .json({ message: typedError.message });
    }
  }
}
