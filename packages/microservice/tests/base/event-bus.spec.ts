import * as chai from 'chai';
import * as sinon from 'sinon';
import { Test, TestingModule } from '@nestjs/testing';

import { EventBus } from '../../src/event-bus';
import { Event } from '../../src/event';
import { EventHandler } from '../../src/decorators/event-handler.decorator';
import { ExplorerService } from '../../src/services/explore.service';
import { MICROSERVICE_CONFIG_PROVIDER } from '../../src/config/constants.config';
import { IBusAdapter, IEventHandler } from '../../src/interfaces';
import { ITransferData } from '../../src/interfaces/transfer-data';
import { TransferDataDto } from '../../src/interfaces/transfer-data-dto.interface';
<<<<<<< HEAD
import { CraftsLoggerMock } from '../mocks/crafts-logger.mock';
=======
>>>>>>> master

describe('Event Bus', () => {
  const sandbox = sinon.createSandbox();

  let module: TestingModule;
  let eventBus: EventBus;

  class TestBusAdapter implements IBusAdapter {
    async publish(data: ITransferData<TransferDataDto>, options?: any): Promise<void> { }
    async subscribe(handle: Function, data: ITransferData<TransferDataDto>, options?: any): Promise<void> { }
    close(): void | Promise<void> { }
  }

  class TestEvent extends Event<any> {
    context: string; action: string; data: any = {};
  }

  @EventHandler(TestEvent)
  class TestEventHandler implements IEventHandler<TestEvent> {
    handle(event: TestEvent): void { }
  }

  const configProvider = {
    provide: MICROSERVICE_CONFIG_PROVIDER,
    useValue: {
      adapter: {
        adapterPrototype: TestBusAdapter, adapterConfig: {},
      },
    },
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
<<<<<<< HEAD
      providers: [EventBus, TestEventHandler, ExplorerService, configProvider, TestBusAdapter, { provide: 'CraftsLogger', useClass: CraftsLoggerMock }],
=======
      providers: [EventBus, TestEventHandler, ExplorerService, configProvider],
>>>>>>> master
    }).compile();

    eventBus = module.get<EventBus>(EventBus);
    await eventBus.onInit();
  });

  afterEach(async () => {
    sandbox.restore();
    await module.close();
  });

  it('should register all event handlers', () => {
    const getEventHandlers = sandbox.spy(module.get(ExplorerService), 'getEventHandlers');
    const registerHandler = sandbox.spy(module.get<any>(EventBus), 'registerHandler');

    eventBus['registerHandlers']();

    chai.expect(getEventHandlers.calledOnce).to.be.true;
    chai.expect(registerHandler.called).to.be.true;
  });

  it('should get event handler metadata', () => {
    const Target = eventBus['reflectName'](TestEventHandler);
    chai.expect(new Target() instanceof TestEvent).to.be.true;
  });

  it('should publish a event', () => {
    const publish = sandbox.spy(module.get<any>(EventBus)['adapter'], 'publish');

    const event = new TestEvent({ id: '' });
    eventBus.publish(event);

    chai.expect(publish.calledOnce).to.be.true;
    chai.expect(publish.getCall(0).args[0]).deep.equal(event);
  });

  it('should subscribe a event handler', async () => {
    const data = {};
    const handler = module.get<TestEventHandler>(TestEventHandler);
    const handle = sandbox.spy(handler, 'handle');

    await eventBus['subscribe'](handler)(data);

    chai.expect(handle.calledOnce).to.be.true;
    chai.expect(handle.getCall(0).args[0]).deep.equal(data);
  });

});

