import { Subject } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { IBusAdapter } from "../interfaces/bus/bus-adapter.interface";
import { ITransferData } from "../interfaces/transfer-data";
import { TransferDataDto } from "../interfaces/transfer-data-dto.interface";
import { IOnInit } from "../interfaces";
import { CraftsLogger } from "../logger/services/logger.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalBusAdapter implements IBusAdapter, IOnInit {
  static instance: LocalBusAdapter;

  private bus: Subject<ITransferData<TransferDataDto>>;

  constructor(private readonly logger: CraftsLogger) {
    if (!LocalBusAdapter.instance) {
      LocalBusAdapter.instance = this;
      this.bus = new Subject();
    }
    return LocalBusAdapter.instance;
  }

  onInit(): void | Promise<void> {
    this.logger.setContext(LocalBusAdapter.name);
  }

  publish(data: ITransferData<TransferDataDto>): void {
    this.logger.debug({ ...data, sendData: true }, data.context);
    this.bus.next(data);
  }

  subscribe(handle: Function, data: ITransferData<TransferDataDto>): void {
    const internalHandle = async (msg: ITransferData<TransferDataDto>) => {
      try {
        await handle(msg);
        this.logger.debug({ ...msg, receivedData: true }, msg.context);
      } catch (error) {
        this.logger.error(
          { message: error.message, msg },
          LocalBusAdapter.name,
          msg.context
        );
      }
    };
    this.bus
      .asObservable()
      .pipe(
        filter(
          (filter) =>
            filter.action === data.action && filter.context === data.context
        ),
        tap(internalHandle)
      )
      .subscribe();
  }

  close() {
    this.bus.complete();
  }
}
