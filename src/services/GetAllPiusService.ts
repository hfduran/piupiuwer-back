import PiusRepository from "../repositories/PiusRepository";
import Piu from "../models/Piu";

class GetAllPiusService {
    private piusRepository;

    constructor(piusRepository: PiusRepository) {
        this.piusRepository = piusRepository;
    }

    public execute(): Piu[] {
        const pius = this.piusRepository.getPius();
        return pius;
    }
}

export default GetAllPiusService
