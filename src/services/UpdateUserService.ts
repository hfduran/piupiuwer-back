import UsersRepository from "../repositories/UsersRepository";
import { isValid } from "date-fns";

interface RequestDTO {
    id: string;
    name: string;
    phone_number: string;
    CPF: string;
    birthday: Date;
}

class UpdateUserService {
    private usersRepository;

    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    public execute({ id, CPF, birthday, name, phone_number }: RequestDTO) {
        if (
            !(
                !!CPF &&
                isValid(birthday) &&
                !!name &&
                !!phone_number
            )
        )
            throw Error("Some user info might be missing");

        const user = this.usersRepository.update({
            id,
            birthday,
            CPF,
            name,
            phone_number,
        });
        return user;
    }
}

export default UpdateUserService;
