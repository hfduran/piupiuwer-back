import Piu from "../models/Piu";
import PiusRepository from "../repositories/PiusRepository";

class GetPiuService {
    private piusRepository: PiusRepository;

    constructor(piusRepository: PiusRepository) {
        this.piusRepository = piusRepository;
    }

    public execute(id: string): Piu {
        if (id) {
            const piu = this.piusRepository.getById(id);
            if (piu === undefined) throw Error("Piu id not found");
            return piu;
        }
        throw Error("Piu id is empty");
    }
}

export default GetPiuService;
