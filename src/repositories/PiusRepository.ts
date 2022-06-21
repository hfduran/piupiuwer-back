import Piu from "../models/Piu";

interface CreatePiuDTO {
    user_id: string;
    text: string;
    creation_date: Date;
    last_update_date: Date;
}

class PiusRepository {
    private pius: Piu[];

    constructor() {
        this.pius = [];
    }

    public create({
        creation_date,
        last_update_date,
        text,
        user_id,
    }: CreatePiuDTO): Piu {
        const piu = new Piu({
            text,
            user_id,
            last_update_date,
            creation_date,
        });

        this.pius.push(piu);

        return piu;
    }
}

export default PiusRepository;
