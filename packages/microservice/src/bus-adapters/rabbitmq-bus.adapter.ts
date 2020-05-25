import * as R from 'ramda';
import { IBusAdapter } from '../interfaces/bus/bus-adapter.interface';
import { IOnInit } from '../interfaces/lifecycles';
import { ITransferData } from '../interfaces/transfer-data';
import { TransferDataDto } from '../interfaces/transfer-data-dto.interface';
import { ISetOptions } from '../interfaces/set-options.interface';
import { loadPackage } from '../utils/load-package.util';
import { CraftsLogger } from '../logger/services/logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitMQBusAdapter implements IBusAdapter, IOnInit, ISetOptions {
  private options: any = {};
  private readonly rabbitmqPackage: any;
  private rabbitmq: any;
  private pubChannel: any;
  private subChannel: any;

  constructor(private readonly logger: CraftsLogger) {
    logger.setContext(RabbitMQBusAdapter.name);
    this.rabbitmqPackage = loadPackage('amqplib', RabbitMQBusAdapter.name);
  }

  async onInit(): Promise<void> {
    this.rabbitmq = await this.rabbitmqPackage.connection(this.options.host);
    this.subChannel = await this.rabbitmq.createChannel();
    this.pubChannel = await this.rabbitmq.createChannel();
  }

  async publish(
    data: ITransferData<TransferDataDto>,
    options?: any
  ): Promise<void> {
    options = options || {};
    const { action, context } = data;
    const exchange = R.or(context, this.options.exchange);
    const type = R.or(this.options.type, 'topic');

    await this.pubChannel
      .assertExchange(
        exchange,
        type,
        this.exchangeDefault(options.exchange || {})
      )
      .then(() =>
        this.pubChannel.publish(
          exchange,
          action,
          Buffer.from(JSON.stringify(data)),
          this.publishDefault(options.publish || {})
        )
      );
  }

  async subscribe(
    handle: Function,
    data: ITransferData<TransferDataDto>,
    options?: any
  ): Promise<void> {
    options = options || {};
    const { action, context } = data;
    const exchange = R.or(context, this.options.exchange);
    const service = R.or(options.service, this.options.service);
    const queue = `${service}.${exchange}.${action}`;
    const type = R.or(this.options.type, 'topic');
    const prefetch = 1;

    this.subChannel.prefetch(R.or(options.prefetch, prefetch));

    await this.subChannel
      .assertExchange(
        exchange,
        type,
        this.exchangeDefault(options.exchange || {})
      )
      .then(() =>
        this.subChannel.assertQueue(
          queue,
          this.queueDefault(options.queue || {})
        )
      )
      .then(() => this.subChannel.bindQueue(queue, exchange, action))
      .then(() =>
        this.subChannel.consume(
          queue,
          this.subscribeHandle(handle),
          this.subscribeDefault(options.subscribe || {})
        )
      );
  }

  private subscribeHandle = (handle: Function) => async (message) => {
    try {
      await handle(JSON.parse(message.content.toString()));
      this.subChannel.ack(message);
    } catch (error) {
      this.logger.error('subscribe handle:', error);
      this.subChannel.nack(message);
    }
  };

  setOptions(options: any): void {
    this.options = options;
  }

  async close(): Promise<void> {
    await this.rabbitmq.close();
  }

  private queueDefault = R.mergeDeepRight({
    durable: true,
    autoDelete: false,
    exclusive: false,
  });

  private subscribeDefault = R.mergeDeepRight({
    noAck: false,
    exclusive: false,
  });

  private exchangeDefault = R.mergeDeepRight({
    durable: true,
    autoDelete: false,
  });

  private publishDefault = R.mergeDeepRight({
    persistent: true,
  });
}
