export class Broker {

    private static instance: Broker;

    private sagas: Map<string, Function>;

    private constructor() {
        this.sagas = new Map<string, Function>();
    }

    static getInstance() {
        if (!Broker.instance) {
            Broker.instance = new Broker();
        }
        return Broker.instance;
    }

    get(cid: string): Function {
        return this.sagas.get(cid);
    }

    add(cid: string, handle: Function): void {
        this.sagas.set(cid, handle);
    }

    delete(cid: string): void {
        this.sagas.delete(cid);
    }

}