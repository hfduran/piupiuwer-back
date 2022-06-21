import { uuid } from "uuidv4";

interface UserDTO {
    id: string;
    name: string;
    birthday: Date;
    CPF: string;
    phone_number: string;
    creation_date: Date;
    last_update_date: Date;
}

class User {
    id: string;

    name: string;

    birthday: Date;

    CPF: string;

    phone_number: string;

    creation_date: Date;

    last_update_date: Date;

    constructor({
        name,
        birthday,
        CPF,
        phone_number,
        creation_date,
        last_update_date,
    }: Omit<UserDTO, "id">) {
        this.id = uuid();
        this.name = name;
        this.birthday = birthday;
        this.CPF = CPF;
        this.phone_number = phone_number;
        this.creation_date = creation_date;
        this.last_update_date = last_update_date;
    }
}

export default User;
