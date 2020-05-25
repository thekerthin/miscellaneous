import { fromEvent, merge } from "rxjs";
import { map, first } from "rxjs/operators";
import { IBusAdapter } from "../interfaces/bus/bus-adapter.interface";
import { IOnInit } from "../interfaces/lifecycles";
import { ISetOptions } from "../interfaces/set-options.interface";
import { ITransferData } from "../interfaces/transfer-data";
import { TransferDataDto } from "../interfaces/transfer-data-dto.interface";
import { loadPackage } from "../utils/load-package.util";
import { CraftsLogger } from "../logger/services/logger.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NatsBusAdapter implements IBusAdapter, IOnInit, ISetOptions {
  private readonly natsPackage: any = {};
  private options: any = {};
  private nats: any;

  constructor(private readonly logger: CraftsLogger) {
    logger.setContext(NatsBusAdapter.name);
    this.natsPackage = loadPackage("nats", NatsBusAdapter.name);
  }

  setOptions(options: any): void {
    this.options = options;
  }

  async onInit(): Promise<void> {
    this.nats = this.natsPackage.connect(this.options);
    const onConnect = fromEvent<Function>(this.nats, "connect");
    const onError = fromEvent<Function>(this.nats, "error").pipe(
      map((error) => {
        throw error;
      })
    );
    await merge(onConnect, onError).pipe(first()).toPromise();
  }

  publish(data: ITransferData<TransferDataDto>): void {
    const topic = `${data.context}-${data.action}`;
    this.nats.publish(topic, JSON.stringify(data));
    this.logger.debug({ ...data, sendData: true }, data.context);
  }

  async subscribe(
    handle: Function,
    data: ITransferData<TransferDataDto>
  ): Promise<void> {
    const topic = `${data.context}-${data.action}`;
    const internalHandler = async (message) => {
      const msg = <ITransferData<TransferDataDto>>(
        JSON.parse(message.toString())
      );
      try {
        await handle(msg);
        this.logger.debug({ ...msg, receivedData: true }, msg.context);
      } catch (error) {
        this.logger.error(
          { message: error.message, msg },
          NatsBusAdapter.name,
          msg.context
        );
      }
    };
    this.nats.subscribe(topic, internalHandler);
  }

  async close() {
    this.nats.close();
  }
}
