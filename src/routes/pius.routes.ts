import { response, Router } from "express";
import { parseISO } from "date-fns";

import PostPiuService from "../services/PostPiuService";
import GetPiuService from "../services/GetPiuService";
import GetAllPiusService from "../services/GetAllPiusService";
import UpdatePiuService from "../services/UpdatePiuService";
import DeletePiuService from "../services/DeletePiuService";
import { piusRepository, usersRepository } from ".";

const piusRouter = Router();

piusRouter.get("/", (request, response) => {
    try {
        const getPius = new GetAllPiusService(piusRepository);
        const pius = getPius.execute();

        return response.json({ pius });
    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

piusRouter.get("/:id", (request, response) => {
    try {
        const { id } = request.params;

        const getPiu = new GetPiuService(piusRepository);

        return response.json({ piu: getPiu.execute(id) });
    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

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

piusRouter.delete("/:id", (request, response) => {
    try {
        const { id } = request.params;

        const deleteUser = new DeletePiuService(piusRepository);
        deleteUser.execute(id);
        return response.json({ message: "piu deleted" });
    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

piusRouter.patch("/", (request, response) => {
    try {
        const { id, text } = request.body;
        
        const updatePiu = new UpdatePiuService(piusRepository);
        const piu = updatePiu.execute({ id, text });

        return response.json(piu);
    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

export default piusRouter;
