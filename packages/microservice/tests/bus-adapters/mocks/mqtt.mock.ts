import { EventEmitter } from 'events';

export class Mqtt extends EventEmitter {

    mqtt: Mqtt;

    connect() {
        setTimeout(() => {
            this.emit('connect');
        }, 100);
        return this;
    }

    publish(topic: string, data: string, options, callback) {
        const payload = data;
        this.emit('message', topic, payload);
        callback();
    }

    subscribe(topic: string, options, callback) {
        callback();
    }

    end(force, options, callback) {
        callback();
    }

}