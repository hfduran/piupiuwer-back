import User from "../models/User";
import UsersRepository from "../repositories/UsersRepository";

class GetAllUsersService {
    private usersRepository: UsersRepository;

    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    public execute(): User[] {
        const users = this.usersRepository.getUsers();
        return users;
    }
}
export default GetAllUsersService;
