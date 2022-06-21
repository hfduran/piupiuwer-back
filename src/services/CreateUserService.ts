import User from "../models/User";
import UsersRepository from "../repositories/UsersRepository";

interface RequestDTO {
    name: string;
    birthday: Date;
    CPF: string;
    phone_number: string;
    creation_date: Date;
    last_update_date: Date;
}

class CreateUserService {
    private usersRepository: UsersRepository;

    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    public execute({
        CPF,
        birthday,
        creation_date,
        last_update_date,
        name,
        phone_number,
    }: RequestDTO): User {
        const user = this.usersRepository.create({
            birthday,
            CPF,
            creation_date,
            last_update_date,
            name,
            phone_number,
        });

        return user;
    }
}

export default CreateUserService;
