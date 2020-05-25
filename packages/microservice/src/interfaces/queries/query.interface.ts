import { IQueryDto } from './query-dto-interface';
import { ITransferData } from '../transfer-data';

export interface IQuery<T extends IQueryDto> extends ITransferData<T> {
    context: string;
    action: string;
    data: T;
    cid?: string;
}
