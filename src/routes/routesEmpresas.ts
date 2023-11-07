import { Router } from "express";
import authMiddlewares from "../middlewares/authMiddlewares";
import { CreateEmrpesa } from "../useCases/empresas/CreateEmpresa";
import { GetCnpjEmpresas } from "../useCases/empresas/GetCnpjEmpresa";

const routerEmpresa = Router();

const createEmpresa = new CreateEmrpesa();
const getCnpjEmpresas = new GetCnpjEmpresas();

routerEmpresa.post("/empresas", authMiddlewares, createEmpresa.execute);
routerEmpresa.get(
  "/empresas/cnpj/:cnpj",
//   authMiddlewares,
  getCnpjEmpresas.execute
);

export { routerEmpresa };
