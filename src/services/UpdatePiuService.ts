import PiusRepository from "../repositories/PiusRepository";

interface RequestDTO {
    id: string;
    text: string;
}

class UpdatePiuService {
    private piusRepository;

    constructor(piusRepository: PiusRepository) {
        this.piusRepository = piusRepository;
    }

    public execute({ id, text }: RequestDTO) {
        if (!this.piusRepository.getById(id))
            throw Error("There is no piu with this id");
        if (!text) throw Error("text is empty");
        if (text.length > 140)
            throw Error("text exceeds the 140 characters limit");

        const piu = this.piusRepository.update({ id, text });
        return piu;
    }
}

export default UpdatePiuService;
