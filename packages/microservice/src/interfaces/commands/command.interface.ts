import { ICommandDto } from './command-dto-interface';
import { ITransferData } from '../transfer-data';

export interface ICommand<T extends ICommandDto> extends ITransferData<T> {
    context: string;
    action: string;
    data: T;
    cid?: string;
}
