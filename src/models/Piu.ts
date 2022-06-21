import {uuid} from 'uuidv4';

interface PiuDTO {
    id: string;
    user_id: string;
    text: string;
    creation_date: Date;
    last_update_date: Date;
}

class Piu {
    id: string;

    user_id: string;

    text: string;

    creation_date: Date;

    last_update_date: Date;

    constructor({
        user_id,
        text,
        creation_date,
        last_update_date,
    }: Omit<PiuDTO, "id">) {
        this.id = uuid();
        this.user_id = user_id;
        this.text = text;
        this.creation_date = creation_date;
        this.last_update_date = last_update_date;
    }
}

export default Piu;
