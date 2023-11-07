import { Router } from "express";
import authMiddlewares from "../middlewares/authMiddlewares";
import { CreateLead } from "../useCases/leads";
import { FilterLead } from "../useCases/leads/FilterLead";

const routerLeads = Router();

const createLeads = new CreateLead();
const filterLeads = new FilterLead();

routerLeads.post("/leads", authMiddlewares, createLeads.execute);
routerLeads.get("/leads", authMiddlewares, filterLeads.execute);

export { routerLeads };
