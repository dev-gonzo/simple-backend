import { Router } from "express";
import authMiddlewares from "../middlewares/authMiddlewares";
import { CreateChannel, FilterChannel } from "../useCases/channel";

const routerChannel = Router();

const createChannel = new CreateChannel();
const filterChannel = new FilterChannel();

routerChannel.post("/channels", authMiddlewares, createChannel.execute);
routerChannel.get("/channels", authMiddlewares, filterChannel.execute);

export { routerChannel };

