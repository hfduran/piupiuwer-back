import Piu from "../models/Piu";
import PiusRepository from "../repositories/PiusRepository";
import UsersRepository from "../repositories/UsersRepository";

interface RequestDTO {
    user_id: string;
    text: string;
    creation_date: Date;
    last_update_date: Date;
}

class PostPiuService {
    private piusRepository: PiusRepository;
    private usersRepository: UsersRepository;

    constructor(
        piusRepository: PiusRepository,
        usersRepository: UsersRepository
    ) {
        this.piusRepository = piusRepository;
        this.usersRepository = usersRepository;
    }

    public execute({
        user_id,
        creation_date,
        last_update_date,
        text,
    }: RequestDTO): Piu {
        if (!text) throw Error("Piu text is empty");
        if (text.length > 140)
            throw Error("Text exceeds the 140 characters limit");
        if (!this.usersRepository.getById(user_id))
            throw Error("User id does not exist");

        const piu = this.piusRepository.create({
            creation_date,
            last_update_date,
            text,
            user_id,
        });
        return piu;
    }
}
export default PostPiuService;
