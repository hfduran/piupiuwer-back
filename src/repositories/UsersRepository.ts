import User from "../models/User";

interface CreateUserDTO {
    name: string;
    birthday: Date;
    CPF: string;
    phone_number: string;
    creation_date: Date;
    last_update_date: Date;
}

class UsersRepository {
    private users: User[];

    constructor() {
        this.users = [];
    }

    public create({
        name,
        birthday,
        CPF,
        creation_date,
        last_update_date,
        phone_number,
    }: CreateUserDTO): User {
        const user = new User({
            name,
            birthday,
            CPF,
            creation_date,
            last_update_date,
            phone_number,
        });

        this.users.push(user);

        return user;
    }

    public checkCPF(cpf: string): boolean {
        const foundCPF = this.users.find((user) => user.CPF == cpf);
        return !!foundCPF;
    }

    public getById(id: string): User | undefined {
        const resp = this.users.find((user) => user.id === id);
        return resp;
    }

    public getUsers(): User[] {
        return this.users;
    }
    
}

export default UsersRepository;
