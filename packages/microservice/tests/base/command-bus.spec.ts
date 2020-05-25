import * as chai from 'chai';
import * as sinon from 'sinon';
import { Test, TestingModule } from '@nestjs/testing';

import { CommandBus } from '../../src/command-bus';
import { Command } from '../../src/command';
import { CommandHandler } from '../../src/decorators/command-handler.decorator';
import { ExplorerService } from '../../src/services/explore.service';
import { MICROSERVICE_CONFIG_PROVIDER } from '../../src/config/constants.config';
import { IBusAdapter, ICommandHandler } from '../../src/interfaces';
import { ITransferData } from '../../src/interfaces/transfer-data';
import { TransferDataDto } from '../../src/interfaces/transfer-data-dto.interface';
<<<<<<< HEAD
import { ModuleRef } from '@nestjs/core';
import { Type } from '@nestjs/common';
import { Class } from '../../src/types';
import { CraftsLogger } from '../../src/logger/services/logger.service';
import { CraftsLoggerMock } from '../mocks/crafts-logger.mock';
=======
>>>>>>> master

describe('Command  Bus', () => {
  const sandbox = sinon.createSandbox();

  let module: TestingModule;
  let commandBus: CommandBus;

  class TestBusAdapter implements IBusAdapter {
    async publish(data: ITransferData<TransferDataDto>, options?: any): Promise<void> { }
    async subscribe(handle: Function, data: ITransferData<TransferDataDto>, options?: any): Promise<void> { }
    close(): void | Promise<void> { }
  }

  class TestCommand extends Command<any> {
    context: string; action: string; data: any = {};
  }

  @CommandHandler(TestCommand)
  class TestCommandHandler implements ICommandHandler<TestCommand> {
    handle(event: TestCommand): void { }
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
      providers: [CommandBus, TestCommandHandler, ExplorerService, configProvider, TestBusAdapter, { provide: 'CraftsLogger', useClass: CraftsLoggerMock }],
=======
      providers: [CommandBus, TestCommandHandler, ExplorerService, configProvider],
>>>>>>> master
    }).compile();

    commandBus = module.get<CommandBus>(CommandBus);
    await commandBus.onInit();
  });

  afterEach(async () => {
    sandbox.restore();
    await module.close();
  });

  it('should register all command handlers', () => {
    const getCommandHandlers = sandbox.spy(module.get(ExplorerService), 'getCommandHandlers');
    const registerHandler = sandbox.spy(module.get<any>(CommandBus), 'registerHandler');

    commandBus['registerHandlers']();

    chai.expect(getCommandHandlers.calledOnce).to.be.true;
    chai.expect(registerHandler.called).to.be.true;
  });

  it('should get command handler metadata', () => {
    const Target = commandBus['reflectName'](TestCommandHandler);
    chai.expect(new Target() instanceof TestCommand).to.be.true;
  });

  it('should publish a command', () => {
    const publish = sandbox.spy(module.get<any>(CommandBus)['adapter'], 'publish');

    const command = new TestCommand({ id: '' });
    commandBus.publish(command);

    chai.expect(publish.calledOnce).to.be.true;
    chai.expect(publish.getCall(0).args[0]).deep.equal(command);
  });

  it('should subscribe a command handler', async () => {
    const data = {};
    const handler = module.get<TestCommandHandler>(TestCommandHandler);
    const handle = sandbox.spy(handler, 'handle');
    const publish = sandbox.spy(module.get<any>(CommandBus)['adapter'], 'publish');

    await commandBus['subscribe'](handler)(data);

    chai.expect(handle.calledOnce).to.be.true;
    chai.expect(handle.getCall(0).args[0]).deep.equal(data);
    chai.expect(publish.calledOnce).to.be.true;
<<<<<<< HEAD
=======
    chai.expect(publish.getCall(0).args[0]).deep.equal({
      ...data,
      context: 'addapptables-saga',
      action: 'saga-event',
    });
>>>>>>> master
  });

});

