import Piu from "../models/Piu";

interface CreatePiuDTO {
    user_id: string;
    text: string;
    creation_date: Date;
    last_update_date: Date;
}
interface UpdatePiuDTO {
    id: string;
    text: string;
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

    public getById(id: string): Piu | undefined {
        const resp = this.pius.find((piu) => piu.id === id);
        return resp;
    }

    public getPius() {
        return this.pius;
    }

    private getIndexById(id: string): number {
        const resp = this.pius.findIndex((piu) => piu.id == id);
        return resp;
    }

    public update({ id, text }: UpdatePiuDTO): Piu {
        if (!this.getById(id)) throw Error("There is no piu with this id");

        const index = this.getIndexById(id);
        const piu = this.pius[index];
        piu.text = text;
        piu.last_update_date = new Date();
        return piu;
    }

    public delete(id: string) {
        if (!this.getById(id)) throw Error("There is no piu with this id");

        const index = this.getIndexById(id);
        this.pius.splice(index, 1);
        return;
    }
}

export default PiusRepository;
