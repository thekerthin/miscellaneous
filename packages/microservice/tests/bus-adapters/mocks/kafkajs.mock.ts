class Producer {
    sendCb: any;

    constructor({ sendCb }) {
        this.sendCb = sendCb;
    }

    async connect() {
        return Promise.resolve();
    }

    async send({ topic, messages }) {
        this.sendCb({ topic, messages });
    }

    async disconnect() {
        return Promise.resolve();
    }
}

class Consumer {
    groupId: string;
    eachMessage: any;
    subscribeCb: any;

    constructor({ groupId, subscribeCb }) {
        this.groupId = groupId;
        this.subscribeCb = subscribeCb;
    }

    getGroupId() {
        return this.groupId;
    }

    async connect() {
        return Promise.resolve();
    }

    async subscribe({ topic }) {
        this.subscribeCb(topic, this);
    }

    async run({ eachMessage }) {
        this.eachMessage = eachMessage;
    }

    stop() {
        return Promise.resolve();
    }

    async disconnect() {
        return Promise.resolve();
    }
}

export class Kafka {
    brokers: any;
    clientId: any;
    topics: any;

    constructor(config) {
        this.brokers = config.brokers;
        this.clientId = config.clientId;
        this.topics = {};
    }

    _subscribeCb(topic, consumer) {
        this.topics[topic] = this.topics[topic] || {};
        const topicObj = this.topics[topic];
        topicObj[consumer.getGroupId()] = topicObj[consumer.getGroupId()] || [];
        topicObj[consumer.getGroupId()].push(consumer);
    }

    _sendCb({ topic, messages }) {
        messages.forEach((message) => {
            Object.values(this.topics[topic]).forEach((consumers: any) => {
                const consumerToGetMessage = Math.floor(Math.random() * consumers.length);
                consumers[consumerToGetMessage].eachMessage({
                    message,
                    topic,
                });
            });
        });
    }

    producer() {
        return new Producer({
            sendCb: this._sendCb.bind(this),
        });
    }

    consumer({ groupId }) {
        return new Consumer({
            groupId,
            subscribeCb: this._subscribeCb.bind(this),
        });
    }
};