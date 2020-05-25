import * as sinon from 'sinon';
import * as chai from 'chai';
import { InitializeMicroservice } from '../../src/services/initialize-microservice.service';
import { EventBus } from '../../src/event-bus';
import { CommandBus } from '../../src/command-bus';
import { BrokerService } from '../../src/services/broker/broker.service';
import { QueryBus } from '../../src/query-bus';

describe('Initialize Microservice Service', () => {

  let initializeMicroserviceInstance;
  const sandbox = sinon.createSandbox();
  let eventBusSpy, commandBusSpy, queryBusSpy, brokerServiceSpy;
  const eventsBus: EventBus = <EventBus>{ onInit: () => { } };
  const commandsBus: CommandBus = <CommandBus>{ onInit: () => { } };
  const queryBus: QueryBus = <QueryBus>{ onInit: () => { } };
  const brokerService: BrokerService = <BrokerService>{ onInit: () => { } };

  before(() => {
    eventBusSpy = sandbox.spy(eventsBus, 'onInit');
    commandBusSpy = sandbox.spy(commandsBus, 'onInit');
    queryBusSpy = sandbox.spy(queryBus, 'onInit');
    brokerServiceSpy = sandbox.spy(brokerService, 'onInit');

    initializeMicroserviceInstance = new InitializeMicroservice(
      eventsBus, commandsBus, queryBus, brokerService
    );
  });

  after(() => {
    sandbox.restore();
  });

  it('should call onInit method from all dependencies', async () => {
    await initializeMicroserviceInstance.init();
    chai.expect(eventBusSpy.calledOnce).to.be.true;
    chai.expect(commandBusSpy.calledOnce).to.be.true;
    chai.expect(queryBusSpy.calledOnce).to.be.true;
    chai.expect(brokerServiceSpy.calledOnce).to.be.true;
  });

});
