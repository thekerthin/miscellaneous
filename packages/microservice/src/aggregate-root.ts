import { IEvent } from './interfaces/events/event.interface';
import { IEventDto } from './interfaces/events/event-dto.interface';

export abstract class AggregateRoot {
  private readonly events: IEvent<IEventDto>[] = [];

  getUncommittedEvents(): IEvent<IEventDto>[] {
    return this.events;
  }

  loadFromHistory(history: IEvent<IEventDto>[]): void {
    history.forEach(event => this.apply(event, true));
  }

  apply(event: IEvent<IEventDto>, isFromHistory = false): void {
    !isFromHistory && this.events.push(event);
    const handler = this.getEventHandler(event);
    handler && handler.call(this, event);
  }

  private getEventHandler(event: IEvent<IEventDto>): Function | undefined {
    const handler = `on${this.getEventName(event)}`;
    return this[handler];
  }

  private getEventName(event): string {
    const { constructor } = Object.getPrototypeOf(event);
    return constructor.name as string;
  }
}
