import { Event } from './event';

export class DomainEvent {
  private events: Array<Event> = [];

  public addEvent(event: Event): void {
    this.events.push(event);
  }

  public getEvents(): Array<Event> {
    return this.events;
  }

  public clearEvents(): void {
    this.events = [];
  }

  public dispatch(): void {
    console.log('emit all events!');
    this.clearEvents();
  }

}
