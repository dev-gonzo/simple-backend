import express, { NextFunction, Request, Response } from "express";
import { routerUsers } from "./routes/routesUsers";
import { routerAuth } from "./routes/routesAuth";
import { routerEmpresa } from "./routes/routesEmpresas";
import cors from "cors";
import { routerRegister } from "./routes/routesRegister";
import { routerPermission } from "./routes/routesPermissions";
import { routerOrigin } from "./routes/routesOrigin";
import { routerChannel } from "./routes/routesChannel";
import { routerLeads } from "./routes/routesLeads";

const app = express();

app.use(express.json());
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    origin: "*",
  })
);

app.use(routerAuth);
app.use(routerUsers);
app.use(routerEmpresa);
app.use(routerRegister);
app.use(routerPermission);
app.use(routerOrigin);
app.use(routerChannel);
app.use(routerLeads);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({ message: "Erro interno do servidor" });
});
app.listen(3333, () => console.log("server running on port 3333"));
