import { TransferDataDto } from './transfer-data-dto.interface';

export interface ITransferData<T extends TransferDataDto> {
  context: string;
  action: string;
  data: T;
  cid?: string;
  error?: string;
  code?: number;
}
