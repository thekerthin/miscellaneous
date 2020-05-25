import { ITransferData } from '../transfer-data';

export interface IBrokerAdd {
  end<T = any>(): Promise<ITransferData<T>>;
}
