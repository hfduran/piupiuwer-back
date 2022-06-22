import UsersRepository from "../repositories/UsersRepository";

class DeleteUserService {
    private usersRepository;

    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    public execute(id: string) {
        this.usersRepository.delete(id);
        return;
    }
}

export default DeleteUserService;
