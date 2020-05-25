import { Event, IEventDto } from '../../';

export class DataEvent implements IEventDto {
  id: any;
  name: string;
}

export class TestEvent extends Event<DataEvent> {
  public action: string = 'test-event';
  public context: string = 'test';

  constructor(data: DataEvent) {
    super(data);
  }
}
