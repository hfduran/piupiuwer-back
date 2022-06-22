import PiusRepository from "../repositories/PiusRepository";

class DeletePiuService {
    private piusRepository;

    constructor(piusRepository: PiusRepository) {
        this.piusRepository = piusRepository;
    }

    public execute(id: string) {
        this.piusRepository.delete(id);
        return;
    }
}

export default DeletePiuService;
