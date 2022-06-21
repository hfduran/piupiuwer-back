import { Router } from "express";
import { parseISO } from "date-fns";

import CreateUserService from "../services/CreateUserService";
import UsersRepository from "../repositories/UsersRepository";

const usersRouter = Router();
const usersRepository = new UsersRepository();

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
