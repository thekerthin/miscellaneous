import { DomainEntity } from './domain-entity';
import { DomainEvent, Event } from '../event';

export abstract class AggregateRoot extends DomainEntity {
  private domainEvent: DomainEvent = new DomainEvent();

  protected addDomainEvent(event: Event): void {
    this.domainEvent.addEvent(event);
  }

  public clearDomainEvents(): void {
    this.domainEvent.clearEvents();
  }
}
