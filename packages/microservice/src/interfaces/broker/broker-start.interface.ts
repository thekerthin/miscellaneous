import { IBrokerAdd } from './broker-add.interface';
import { ITransferData } from '../transfer-data';
import { TransferDataDto } from '../transfer-data-dto.interface';

export interface IBrokerStart {
    add(data: ITransferData<TransferDataDto>): IBrokerAdd;
}
