import { Router } from "express";
import { CreateRegister } from "../useCases/register/CreateRegister";

const routerRegister = Router();

const createRegister = new CreateRegister();

routerRegister.post("/register", createRegister.execute);

export { routerRegister };

