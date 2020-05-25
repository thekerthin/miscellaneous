import { IBusAdapter } from '../interfaces/bus/bus-adapter.interface';
import { ITransferData } from '../interfaces/transfer-data';
import { TransferDataDto } from '../interfaces/transfer-data-dto.interface';
import { loadPackage } from '../utils/load-package.util';
import { IOnInit } from '../interfaces/lifecycles';
import { ISetOptions } from '../interfaces/set-options.interface';
import { CraftsLogger } from '../logger/services/logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisBusAdapter implements IBusAdapter, IOnInit, ISetOptions {
  private readonly redisPackage: any = {};
  private pub;
  private sub;
  private options = {};
  private handles: Map<string, Function[]>;

  constructor(private readonly logger: CraftsLogger) {
    this.handles = new Map();
    logger.setContext(RedisBusAdapter.name);
    this.redisPackage = loadPackage('redis', RedisBusAdapter.name);
  }

  setOptions(options: any): void {
    this.options = options;
  }

  async onInit(): Promise<void> {
    this.pub = this.redisPackage.createClient(this.options);
    this.sub = this.redisPackage.createClient(this.options);
    this.listenMessages();
  }

  private listenMessages() {
    this.sub.on('message', async (topic, message) => {
      const msg = <ITransferData<TransferDataDto>>(
        JSON.parse(message.toString())
      );
      try {
        const handles = this.handles.get(topic);
        handles.forEach(async (handle) => await handle(msg));
        this.logger.debug({ ...msg, receivedData: true }, msg.context);
      } catch (error) {
        this.logger.error(
          { message: error.message, msg },
          RedisBusAdapter.name,
          msg.context
        );
      }
    });
  }

  publish(data: ITransferData<TransferDataDto>): Promise<void> {
    return new Promise((resolve, reject) => {
      const topic = `${data.context}-${data.action}`;
      this.pub.publish(topic, JSON.stringify(data), (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  async subscribe(
    handle: Function,
    data: ITransferData<TransferDataDto>
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const topic = `${data.context}-${data.action}`;
      const handles = this.handles.get(topic) || [];
      this.handles.set(topic, [...handles, handle]);
      this.sub.subscribe(topic, (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  close(): void {
    this.pub.quit();
    this.sub.quit();
  }
}
