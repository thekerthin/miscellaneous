// import { IClientPublishOptions } from "@nestjs/common/interfaces/external/mqtt-options.interface";
import { fromEvent, merge } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { IBusAdapter } from '../interfaces/bus/bus-adapter.interface';
import { IOnInit } from '../interfaces/lifecycles';
import { ISetOptions } from '../interfaces/set-options.interface';
import { ITransferData } from '../interfaces/transfer-data';
import { TransferDataDto } from '../interfaces/transfer-data-dto.interface';
import { loadPackage } from '../utils/load-package.util';
import { CraftsLogger } from '../logger/services/logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MqttBusAdapter implements IBusAdapter, IOnInit, ISetOptions {
  mqttPackage: any = {};

  client: any;

  options: {
    brokerUrl: string;
    clientOptions: any;
  };

  private handles: Map<string, Function[]>;

  constructor(private readonly logger: CraftsLogger) {
    this.handles = new Map();
    logger.setContext(MqttBusAdapter.name);
    this.mqttPackage = loadPackage('mqtt', MqttBusAdapter.name);
  }

  setOptions(options: { brokerUrl: string; clientOptions?: any }): void {
    this.options = options || <any>{};
  }

  async onInit(): Promise<void> {
    this.client = this.mqttPackage.connect(
      this.options.brokerUrl,
      this.options.clientOptions
    );
    const onConnect = fromEvent<Function>(this.client, 'connect');
    const onError = fromEvent<Function>(this.client, 'error').pipe(
      map((error) => {
        throw error;
      })
    );
    await merge(onConnect, onError).pipe(first()).toPromise();
    this.listenMessages();
  }

  private listenMessages() {
    this.client.on('message', async (topic, payload) => {
      const msg = <ITransferData<TransferDataDto>>(
        JSON.parse(payload.toString())
      );
      try {
        const handles = this.handles.get(topic);
        handles.forEach(async (handle) => await handle(msg));
        this.logger.debug({ ...msg, receivedData: true }, msg.context);
      } catch (error) {
        this.logger.error(
          { message: error.message, msg },
          MqttBusAdapter.name,
          msg.context
        );
      }
    });
  }

  async publish(
    data: ITransferData<TransferDataDto>,
    // options: IClientPublishOptions
    options: any
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const topic = `${data.context}-${data.action}`;
      this.client.publish(
        topic,
        JSON.stringify(data),
        // options || <IClientPublishOptions>{},
        options || <any>{},
        (error) => {
          if (error) {
            reject(error);
            return;
          }
          this.logger.debug({ ...data, sendData: true }, data.context);
          resolve();
        }
      );
    });
  }

  async subscribe(
    handle: Function,
    data: ITransferData<TransferDataDto>,
    // options: IClientPublishOptions
    options: any
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const topic = `${data.context}-${data.action}`;
      const handles = this.handles.get(topic) || [];
      this.handles.set(topic, [...handles, handle]);
      this.client.subscribe(
        topic,
        // options || <IClientPublishOptions>{},
        options || <any>{},
        (error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        }
      );
    });
  }

  async close(): Promise<void> {
    return new Promise((resolve) => {
      this.client.end(true, {}, () => {
        resolve();
      });
    });
  }
}
