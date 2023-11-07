import { Router } from "express";
import { AuthenticateUser } from "../useCases";
import { LogoutUser } from "../useCases/auth/LogoutUser";

const routerAuth = Router();

const authUser = new AuthenticateUser();
const logoutUser = new LogoutUser();

routerAuth.post("/login", authUser.execute);
routerAuth.post("/logout", logoutUser.execute);

export { routerAuth };
