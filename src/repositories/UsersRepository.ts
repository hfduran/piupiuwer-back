import User from "../models/User";

interface CreateUserDTO {
    name: string;
    birthday: Date;
    CPF: string;
    phone_number: string;
}

interface UpdateUserDTO {
    id: string;
    name: string;
    birthday: Date;
    CPF: string;
    phone_number: string;
}

class UsersRepository {
    private users: User[];

    constructor() {
        this.users = [];
    }

    public create({ name, birthday, CPF, phone_number }: CreateUserDTO): User {
        const user = new User({
            name,
            birthday,
            CPF,
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

    private getIndexById(id: string): number {
        const resp = this.users.findIndex((user) => user.id == id);
        return resp;
    }

    public getUsers(): User[] {
        return this.users;
    }

    public update({ id, CPF, birthday, name, phone_number }: UpdateUserDTO) {
        const index = this.getIndexById(id);
        this.users[index] = {
            id,
            CPF,
            birthday,
            name,
            phone_number,
            creation_date: this.users[index].creation_date,
            last_update_date: new Date(),
        };
        return this.users[index];
    }

    public delete(id: string) {
        if (!this.getById(id)) throw Error("There is no user with this id");
        
        const index = this.getIndexById(id);
        this.users.splice(index, 1);
        return;
    }
}

export default UsersRepository;
