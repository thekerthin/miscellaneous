import { IEvent } from './event.interface';
import { IEventDto } from './event-dto.interface';
import { IHandler } from '../handler.interface';

export interface IEventHandler<T extends IEvent<IEventDto>> extends IHandler<T> {
  handle(event: T): void;
}
