import { EventHandler, IEventHandler } from '../../';
import { TestEvent } from './event';

@EventHandler(TestEvent)
export class TestEventHandler implements IEventHandler<TestEvent> {

  handle(event: TestEvent): void { }

}
