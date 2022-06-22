import { Router } from "express";
import { parseISO } from "date-fns";

import CreateUserService from "../services/CreateUserService";
import GetUserService from "../services/GetUserService";
import GetAllUsersService from "../services/GetAllUsersService";
import UpdateUserService from "../services/UpdateUserService";
import DeleteUserService from "../services/DeleteUserService";
import { usersRepository } from ".";

const usersRouter = Router();

usersRouter.get("/:id", (request, response) => {
    try {
        const { id } = request.params;

        const getUser = new GetUserService(usersRepository);

        return response.json({ user: getUser.execute(id) });
    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.get("/", (request, response) => {
    try {
        const getAllUsers = new GetAllUsersService(usersRepository);

        return response.json({ users: getAllUsers.execute() });
    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.post("/", (request, response) => {
    try {
        const { name, birthday, CPF, phone_number } = request.body;

        const parsedBirthday = parseISO(birthday);

        const createUser = new CreateUserService(usersRepository);

        const user = createUser.execute({
            name,
            birthday: parsedBirthday,
            CPF,
            phone_number,
        });

        return response.json(user);
    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.delete("/:id", (request, response) => {
    try {
        const { id } = request.params;

        const deleteUser = new DeleteUserService(usersRepository);
        deleteUser.execute(id);
        return response.json({ message: "user deleted" });
    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.patch("/", (request, response) => {
    try {
        const { id, name, CPF, phone_number, birthday } = request.body;

        const updateUser = new UpdateUserService(usersRepository);
        const user = updateUser.execute({
            birthday: parseISO(birthday),
            CPF,
            id,
            name,
            phone_number,
        });

        return response.json({ user });
    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

export default usersRouter;
