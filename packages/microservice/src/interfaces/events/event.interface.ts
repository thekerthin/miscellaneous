import { IEventDto } from './event-dto.interface';
import { ITransferData } from '../transfer-data';

export interface IEvent<T extends IEventDto> extends ITransferData<T> {
    context: string;
    action: string;
    data: T;
    cid?: string;
}
