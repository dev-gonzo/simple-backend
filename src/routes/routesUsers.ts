import { Router } from "express";
import { CreateUser, UpdateUser } from "../useCases";
import { DeleteUser } from "../useCases/users/DeleteUser";
import { FilterUser } from "../useCases/users/FilterUser";
import { GetByIdUser } from "../useCases/users/GetByIdUser";

import authMiddlewares from "../middlewares/authMiddlewares";
import { InactiveUser } from "../useCases/users/InactiveUser";
import { ActiveUser } from "../useCases/users/ActiveUser";
import { GetEmailUser } from "../useCases/users/GetEmailUser";

const routerUsers = Router();

const createUser = new CreateUser();
const updateUser = new UpdateUser();
const deleteUser = new DeleteUser();
const getByIdUser = new GetByIdUser();
const filterUser = new FilterUser();
const inactiveUser = new InactiveUser();
const activeUser = new ActiveUser();
const getByEmailUser = new GetEmailUser();

routerUsers.post("/users", createUser.execute);
routerUsers.put("/users/:idUser", authMiddlewares, updateUser.execute);
routerUsers.delete("/users/:idUser", authMiddlewares, deleteUser.execute);
routerUsers.get("/users/:idUser", authMiddlewares, getByIdUser.execute);
routerUsers.get("/users", authMiddlewares, filterUser.execute);
routerUsers.get("/users", authMiddlewares, filterUser.execute);
routerUsers.put(
  "/users/:idUser/inactive",
  authMiddlewares,
  inactiveUser.execute
  );
  routerUsers.put("/users/:idUser/active", authMiddlewares, activeUser.execute);
  routerUsers.get("/users/email/:email", getByEmailUser.execute);

export { routerUsers };
