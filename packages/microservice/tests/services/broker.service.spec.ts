import * as chai from 'chai';
import * as sinon from 'sinon';
import { BrokerService } from '../../src/services/broker/broker.service';
import { IBusAdapter } from '../../src/interfaces';
import { ITransferData } from '../../src/interfaces/transfer-data';
import { TransferDataDto } from '../../src/interfaces/transfer-data-dto.interface';
import { InitializeAdapterBus } from '../../src/services/initialize-adapter-bus.service';
import { BrokerProcess } from '../../src/services/broker/broker-process';
<<<<<<< HEAD
import { Class } from '../../src/types';
import { ModuleRef } from '@nestjs/core';
import { Type } from '@nestjs/common';
import { CraftsLoggerMock } from '../mocks/crafts-logger.mock';
=======
>>>>>>> master

describe('Broker manager', () => {

  let broker: BrokerService;

  class TestBusAdapter implements IBusAdapter {
    async publish(data: ITransferData<TransferDataDto>, options?: any): Promise<void> { }
    async subscribe(handle: Function, data: ITransferData<TransferDataDto>, options?: any): Promise<void> { }
    close(): void | Promise<void> { }
  }

<<<<<<< HEAD
  class TestModuleRef extends ModuleRef {

    get<TInput = any, TResult = TInput>(typeOrToken: string | symbol | Type<TInput>, options?: { strict: boolean; }): TResult {
      throw new Error('Method not implemented.');
    }

    create<T = any>(type: Type<T>): Promise<T> {
      throw new Error('Method not implemented.');
    }

    resolve(type: Class<any>) {
      return new type(new CraftsLoggerMock());
    }
  }

=======
>>>>>>> master
  const brokerConfig = {
    adapter: {
      adapterPrototype: TestBusAdapter,
      adapterConfig: {}, adapterBrokerConfig: {},
    },
  };

  before(() => {
<<<<<<< HEAD
    broker = new BrokerService(brokerConfig, new TestModuleRef(undefined));
=======
    broker = new BrokerService(brokerConfig);
>>>>>>> master
  });

  describe('should run life-cycle methods correctly', () => {
    const sandbox = sinon.createSandbox();
    let subscribe, close, initializeAdapterBusInitMethod;

    beforeEach(() => {
      subscribe = sandbox.spy();
      close = sandbox.spy();
      initializeAdapterBusInitMethod = sandbox.stub(InitializeAdapterBus.prototype, 'init')
        .returns(<any>{ subscribe, close });
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should initialize broker correctly', async () => {
      await broker.onInit();

      chai.expect(broker['adapterInstance'] instanceof TestBusAdapter);
      chai.expect(initializeAdapterBusInitMethod.calledOnce).to.true;
      chai.expect(subscribe.calledOnce).to.true;
      chai.expect(typeof subscribe.getCall(0).args[0]).to.equal('function');
      chai.expect(subscribe.getCall(0).args[1])
        .deep.equal({ context: 'addapptables-broker', action: 'broker-event', data: null });
      chai.expect(subscribe.getCall(0).args[2]).deep.equal({ service: 'broker' });
    });

    it('should destroy broker connection correctly', async () => {
      await broker.onInit();
      await broker.onModuleDestroy();

      chai.expect(close.calledOnce).to.true;
    });

  });

  it('should start a new broker correctly', async () => {
    const result = await broker.start();
    chai.expect(result instanceof BrokerProcess).to.be.true;
  });

});
