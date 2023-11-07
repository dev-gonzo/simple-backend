import { Router } from "express";
import { CreatePermission } from "../useCases/permissions/CreatePermission";
import { UpdatePermission } from "../useCases/permissions";
import { GetByIdPermission } from "../useCases/permissions/GetByIdPermission";
import { DeletePermission } from "../useCases/permissions/DeletePermission";
import { CreateAccessGroup } from "../useCases/permissions/CreateAccessGroup";
import { UpdateAccesGroup } from "../useCases/permissions/UpdateAccessGroup";
import { GetByIdAccessGroup } from "../useCases/permissions/GetByIdAccessGroup";
import { DeleteAccessGroup } from "../useCases/permissions/DeleteAccessGroup";
import { CreateAccessGroupPermissions } from "../useCases/permissions/CreateAccessGroupPermissions";

const routerPermission = Router();

const createPermission = new CreatePermission();
const updatePermission = new UpdatePermission();
const getByIdPermission = new GetByIdPermission();
const deletePermission = new DeletePermission();

const createAccessGroup = new CreateAccessGroup();
const updateAccessGroup = new UpdateAccesGroup();
const getByIdAccessGroup = new GetByIdAccessGroup();
const deleteAccessGroup = new DeleteAccessGroup();

const bondedAccessGroup = new CreateAccessGroupPermissions();

routerPermission.post("/permissions", createPermission.execute);
routerPermission.put("/permissions/:idPermission", updatePermission.execute);
routerPermission.get("/permissions/:idPermission", getByIdPermission.execute);
routerPermission.delete("/permissions/:idPermission", deletePermission.execute);
routerPermission.post("/access-groups", createAccessGroup.execute);
routerPermission.put(
  "/access-groups/:idAccessGroup",
  updateAccessGroup.execute
);
routerPermission.get(
  "/access-groups/:idAccessGroup",
  getByIdAccessGroup.execute
);
routerPermission.delete(
  "/access-groups/:idAccessGroup",
  deleteAccessGroup.execute
);
routerPermission.post(
  "/access-groups/:idAccessGroup/permissions",
  bondedAccessGroup.execute
);

export { routerPermission };
