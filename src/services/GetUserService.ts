import User from "../models/User";
import UsersRepository from "../repositories/UsersRepository";

class GetUserService {
    private usersRepository: UsersRepository;

    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    public execute(id: string): User {
        if (id) {
            const user = this.usersRepository.getById(id);
            if (user === undefined) throw Error("User id not found");
            return user;
        }
        throw Error("User id is empty");
    }
}

export default GetUserService;
