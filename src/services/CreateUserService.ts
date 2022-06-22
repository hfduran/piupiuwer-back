import User from "../models/User";
import { isValid } from "date-fns";
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
        if (
            !(
                !!CPF &&
                isValid(birthday) &&
                isValid(creation_date) &&
                isValid(last_update_date) &&
                !!name &&
                !!phone_number
            )
        )
            throw Error("Some user info might be missing");

        if (this.usersRepository.checkCPF(CPF))
            throw Error("CPF already registered");

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
