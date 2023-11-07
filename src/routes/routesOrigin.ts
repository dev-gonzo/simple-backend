import { Router } from "express";
import { CreateOrigin } from "../useCases/origin";
import authMiddlewares from "../middlewares/authMiddlewares";
import { FilterOrigin } from "../useCases/origin/FilterOrigin";

const routerOrigin = Router();

const createOrigin = new CreateOrigin();
const filterOrigin = new FilterOrigin();

routerOrigin.post("/origins", authMiddlewares, createOrigin.execute);
routerOrigin.get("/origins", authMiddlewares, filterOrigin.execute);

export { routerOrigin };
