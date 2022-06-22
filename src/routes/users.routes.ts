import { Router } from "express";
import { parseISO } from "date-fns";

import CreateUserService from "../services/CreateUserService";
import GetUserService from "../services/GetUserService";
import GetAllUsersService from "../services/GetAllUsersService";
import UsersRepository from "../repositories/UsersRepository";

const usersRouter = Router();
const usersRepository = new UsersRepository();

interface RequestDTO {
    id: string;
}

usersRouter.get("/", (request, response) => {
    try {
        const data = request.query;

        const getUser = new GetUserService(usersRepository);
        const getAllUsers = new GetAllUsersService(usersRepository);

        /* 
           Provavelmente nao é assim que faz... mas funcionou
           basicamente ele checa se foi enviado um querry id.
           Se foi, retorna o usuário com o id.
           Se não, retorna tudo.
        */

        if (typeof data.id === "string") {
            return response.json({ user: getUser.execute(data.id) });
        } else {
            return response.json({ users: getAllUsers.execute() });
        }
    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.post("/", (request, response) => {
    try {
        const {
            name,
            birthday,
            CPF,
            phone_number,
            creation_date,
            last_update_date,
        } = request.body;

        const parsedBirthday = parseISO(birthday);
        const parsedCreationDate = parseISO(creation_date);
        const parsedLastUpdateDate = parseISO(last_update_date);

        const createUser = new CreateUserService(usersRepository);

        const user = createUser.execute({
            name,
            birthday: parsedBirthday,
            CPF,
            phone_number,
            creation_date: parsedCreationDate,
            last_update_date: parsedLastUpdateDate,
        });

        return response.json(user);
    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

export default usersRouter;
