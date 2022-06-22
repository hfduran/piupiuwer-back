import { Router } from "express";
import piusRouter from "./pius.routes";
import usersRouter from "./users.routes";
import PiusRepository from "../repositories/PiusRepository";
import UsersRepository from "../repositories/UsersRepository";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/pius", piusRouter);

export const piusRepository = new PiusRepository();
export const usersRepository = new UsersRepository();

export default routes;
