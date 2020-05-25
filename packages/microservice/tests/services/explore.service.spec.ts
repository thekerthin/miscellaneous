import * as chai from 'chai';
import * as sinon from 'sinon';
import { Test, TestingModule } from '@nestjs/testing';
import { ModulesContainer } from '@nestjs/core';
import { head } from 'ramda';
import { ExplorerService } from '../../src/services/explore.service';
import { CommandHandler } from '../../src/decorators/command-handler.decorator';
import { EventHandler } from '../../src/decorators/event-handler.decorator';
import { QueryHandler } from '../../src/decorators/query-handler.decorator';
import { Command } from '../../src/command';
import { Event } from '../../src/event';
import { Query } from '../../src/query';
import { COMMAND_HANDLER_METADATA } from '../../src/config';

describe('Explore Service', () => {

  let module: TestingModule;
  let explorerServiceInstance: ExplorerService;
  let modulesContainerInstance: ModulesContainer;

  class TestCommand extends Command<any> {
    context: string; action: string; data: any = {};
  }

  class TestEvent extends Event<any> {
    context: string; action: string; data: any = {};
  }

  class TestQuery extends Query<any> {
    context: string; action: string; data: any = {};
  }

  @CommandHandler(TestCommand)
  class TestCommandHandler { }

  @EventHandler(TestEvent)
  class TestEventHandler { }

  @QueryHandler(TestQuery)
  class TestQueryHandler { }


  before(async () => {
    module = await Test.createTestingModule({
      providers: [
        TestCommandHandler, TestEventHandler,
        TestQueryHandler, ExplorerService,
      ],
    }).compile();

    explorerServiceInstance = module.get<ExplorerService>(ExplorerService);
    modulesContainerInstance = module.get<ModulesContainer>(ModulesContainer);
  });

  it('should get command handler prototypes', () => {
    const handlers = explorerServiceInstance.getCommandHandlers();
    const handler = head(handlers);

    chai.expect(Array.isArray(handlers)).to.be.true;
    chai.expect(handler.name).to.be.equal(TestCommandHandler.name);
  });

  it('should get event handler prototypes', () => {
    const handlers = explorerServiceInstance.getEventHandlers();
    const handler = head(handlers);

    chai.expect(Array.isArray(handlers)).to.be.true;
    chai.expect(handler.name).to.be.equal(TestEventHandler.name);
  });

  it('should get query handler prototypes', () => {
    const handlers = explorerServiceInstance.getQueryHandlers();
    const handler = head(handlers);

    chai.expect(Array.isArray(handlers)).to.be.true;
    chai.expect(handler.name).to.be.equal(TestQueryHandler.name);
  });

  it('should get command prototypes', () => {
    const commands = explorerServiceInstance.getCommands();
    const command = head(commands);

    chai.expect(Array.isArray(commands)).to.be.true;
    chai.expect(command.name).to.be.equal(TestCommand.name);
  });

  it('should get event prototypes', () => {
    const events = explorerServiceInstance.getEvents();
    const event = head(events);

    chai.expect(Array.isArray(events)).to.be.true;
    chai.expect(event.name).to.be.equal(TestEvent.name);
  });

  it('should get query prototypes', () => {
    const queries = explorerServiceInstance.getQueries();
    const query = head(queries);

    chai.expect(Array.isArray(queries)).to.be.true;
    chai.expect(query.name).to.be.equal(TestQuery.name);
  });

  it('should flat handler prototypes', () => {
    const modules = [...modulesContainerInstance.values()];
    const spy = sinon.spy();

    const prototypes = explorerServiceInstance.flatMap(modules, spy);

    chai.expect(spy.called).to.be.true;
    chai.expect(Array.isArray(prototypes)).to.be.true;
  });

  it('should extract prototype', () => {
    const handlerInstance = module.get(TestCommandHandler);
    const Prototype = explorerServiceInstance.extractMetadata(
      handlerInstance, COMMAND_HANDLER_METADATA);

    chai.expect(handlerInstance instanceof Prototype).to.be.true;
  });

});