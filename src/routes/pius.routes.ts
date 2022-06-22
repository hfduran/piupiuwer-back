import { Router } from "express";
import { parseISO } from "date-fns";

import PiusRepository from "../repositories/PiusRepository";
import PostPiuService from "../services/PostPiuService";
import { piusRepository, usersRepository } from ".";

const piusRouter = Router();

piusRouter.post("/", (request, response) => {
    try {
        const { user_id, text, creation_date, last_update_date } = request.body;
        const parsedCreationDate = parseISO(creation_date);
        const parsedLastUpdateDate = parseISO(last_update_date);

        const postPiu = new PostPiuService(piusRepository, usersRepository);

        const piu = postPiu.execute({
            user_id,
            text,
            creation_date: parsedCreationDate,
            last_update_date: parsedLastUpdateDate,
        });
        return response.json(piu);
    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

export default piusRouter;
