import { EventEmitter } from 'events';

export class Redis extends EventEmitter {

    redis: Redis;

    createClient() {
        if (this.redis) {
            return this.redis;
        }
        this.redis = new Redis();
        return this.redis;
    }

    publish(topic: string, data: string, callback) {
        const payload = data;
        this.emit('message', topic, payload);
        callback();
    }

    subscribe(topic: string, callback) {
        callback();
    }

    quit() { }

}
