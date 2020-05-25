import * as chai from 'chai';
import * as sinon from 'sinon';
import { Test, TestingModule } from '@nestjs/testing';

import { QueryBus } from '../../src/query-bus';
import { Query } from '../../src/query';
import { QueryHandler } from '../../src/decorators/query-handler.decorator';
import { ExplorerService } from '../../src/services/explore.service';
import { MICROSERVICE_CONFIG_PROVIDER } from '../../src/config/constants.config';
import { IBusAdapter, IQueryHandler } from '../../src/interfaces';
import { ITransferData } from '../../src/interfaces/transfer-data';
import { TransferDataDto } from '../../src/interfaces/transfer-data-dto.interface';
<<<<<<< HEAD
import { CraftsLoggerMock } from '../mocks/crafts-logger.mock';
=======
>>>>>>> master

describe('Query  Bus', () => {
  const sandbox = sinon.createSandbox();

  let module: TestingModule;
  let queryBus: QueryBus;

  class TestBusAdapter implements IBusAdapter {
    async publish(data: ITransferData<TransferDataDto>, options?: any): Promise<void> { }
    async subscribe(handle: Function, data: ITransferData<TransferDataDto>, options?: any): Promise<void> { }
    close(): void | Promise<void> { }
  }

  class TestQuery extends Query<any> {
    context: string; action: string; data: any = {};
  }

  @QueryHandler(TestQuery)
  class TestQueryHandler implements IQueryHandler<TestQuery> {
    handle(event: TestQuery): void { }
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
      providers: [QueryBus, TestQueryHandler, ExplorerService, configProvider, TestBusAdapter, { provide: 'CraftsLogger', useClass: CraftsLoggerMock }],
=======
      providers: [QueryBus, TestQueryHandler, ExplorerService, configProvider],
>>>>>>> master
    }).compile();

    queryBus = module.get<QueryBus>(QueryBus);
    await queryBus.onInit();
  });

  afterEach(async () => {
    sandbox.restore();
    await module.close();
  });

  it('should register all query handlers', () => {
    const getQueryHandlers = sandbox.spy(module.get(ExplorerService), 'getQueryHandlers');
    const registerHandler = sandbox.spy(module.get<any>(QueryBus), 'registerHandler');

    queryBus['registerHandlers']();

    chai.expect(getQueryHandlers.calledOnce).to.be.true;
    chai.expect(registerHandler.called).to.be.true;
  });

  it('should get query handler metadata', () => {
    const Target = queryBus['reflectName'](TestQueryHandler);
    chai.expect(new Target() instanceof TestQuery).to.be.true;
  });

  it('should publish a query', () => {
    const publish = sandbox.spy(module.get<any>(QueryBus)['adapter'], 'publish');

    const query = new TestQuery({ id: '' });
    queryBus.publish(query);

    chai.expect(publish.calledOnce).to.be.true;
    chai.expect(publish.getCall(0).args[0]).deep.equal(query);
  });

  it('should subscribe a query handler', async () => {
    const data = {};
    const handler = module.get<TestQueryHandler>(TestQueryHandler);
    const handle = sandbox.spy(handler, 'handle');
    const publish = sandbox.spy(module.get<any>(QueryBus)['adapter'], 'publish');

    await queryBus['subscribe'](handler)(data);

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

