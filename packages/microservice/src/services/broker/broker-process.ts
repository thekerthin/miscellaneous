import * as uuid from 'uuid';
import { IBrokerStart } from '../../interfaces/broker/broker-start.interface';
import { IBrokerAdd } from '../../interfaces/broker/broker-add.interface';
import { IBusAdapter } from '../../interfaces';
import { ITransferData } from '../../interfaces/transfer-data';
import { TransferDataDto } from '../../interfaces/transfer-data-dto.interface';
import { Broker } from './broker';

export class BrokerProcess implements IBrokerStart, IBrokerAdd {
  private readonly cid: string;

  private data: ITransferData<TransferDataDto>;

  constructor(private readonly adapter: IBusAdapter) {
    this.cid = uuid.v4();
  }

  add(data: ITransferData<TransferDataDto>): IBrokerAdd {
    this.data = data;
    return this;
  }

  end<T = any>(): Promise<ITransferData<T>> {
    const brokers = Broker.getInstance();
    return new Promise(async (resolve, reject) => {
      brokers.add(this.cid, (data: ITransferData<T>) => {
        // TODO: add logger
        try {
          if (!data.error) {
            return resolve(data);
          }
          reject(data);
        } catch (error) {
          reject(error);
        }
      });

      const data = { ...this.data, cid: this.cid };
      await this.adapter.publish(data);
    });
  }
}
