import * as chai from 'chai';
import * as sinon from 'sinon';
import { InitializeAdapterBus } from '../../src/services/initialize-adapter-bus.service';
import { MicroserviceOptions, IBusAdapter, ISetOptions, IOnInit } from '../../src/interfaces';
import { ITransferData } from '../../src/interfaces/transfer-data';
import { TransferDataDto } from '../../src/interfaces/transfer-data-dto.interface';
import { BusConfigException } from '../../src/exceptions';
<<<<<<< HEAD
import { ModuleRef } from '@nestjs/core';
import { Class } from '../../src/types';
import { CraftsLoggerMock } from '../mocks/crafts-logger.mock';
=======
>>>>>>> master


describe('Initialize Adapter Bus Service', () => {

  it('should initialize adapter correctly without call life cycle methods', async () => {
    class TestBusAdapter implements IBusAdapter {
      async publish(data: ITransferData<TransferDataDto>, options?: any): Promise<void> { }
      async subscribe(handle: Function, data: ITransferData<TransferDataDto>, options?: any): Promise<void> { }
      close(): void | Promise<void> { }
    }

<<<<<<< HEAD
    class TestModuleRef {
      resolve(type: Class<any>) {
        return new type(new CraftsLoggerMock());
      }
    }

=======
>>>>>>> master
    const initializeAdapterBusOptions: MicroserviceOptions = {
      adapter: { adapterPrototype: TestBusAdapter, adapterConfig: {} },
    }

<<<<<<< HEAD
    const initializeAdapterBusInstance = new InitializeAdapterBus(initializeAdapterBusOptions, new TestModuleRef() as ModuleRef);
=======
    const initializeAdapterBusInstance = new InitializeAdapterBus(initializeAdapterBusOptions);
>>>>>>> master

    const adapterInstance = await initializeAdapterBusInstance.init();
    chai.expect(adapterInstance instanceof TestBusAdapter).to.be.true;
  });

  it('should initialize adapter correctly calling SetOptions life cycle', async () => {
    class TestBusAdapter implements IBusAdapter, ISetOptions {
      async publish(data: ITransferData<TransferDataDto>, options?: any): Promise<void> { }
      async subscribe(handle: Function, data: ITransferData<TransferDataDto>, options?: any): Promise<void> { }
      close(): void | Promise<void> { }
      setOptions(options: any): void { }
    }

<<<<<<< HEAD
    class TestModuleRef {
      resolve(type: Class<any>) {
        return new type(new CraftsLoggerMock());
      }
    }

=======
>>>>>>> master
    sinon.stub(TestBusAdapter.prototype, 'setOptions');

    const initializeAdapterBusOptions: MicroserviceOptions = {
      adapter: { adapterPrototype: TestBusAdapter, adapterConfig: {} },
    }

    const adapterConfig = initializeAdapterBusOptions.adapter.adapterConfig;
<<<<<<< HEAD
    const initializeAdapterBusInstance = new InitializeAdapterBus(initializeAdapterBusOptions, new TestModuleRef() as ModuleRef);
=======
    const initializeAdapterBusInstance = new InitializeAdapterBus(initializeAdapterBusOptions);
>>>>>>> master

    const adapterInstance = await initializeAdapterBusInstance.init(adapterConfig);
    chai.expect(adapterInstance instanceof TestBusAdapter).to.be.true;
    chai.expect(adapterInstance['setOptions'].calledOnce).to.be.true;

    adapterInstance['setOptions'].restore();
  });

  it('should initialize adapter correctly calling OnInit life cycle', async () => {
    class TestBusAdapter implements IBusAdapter, IOnInit {
      async publish(data: ITransferData<TransferDataDto>, options?: any): Promise<void> { }
      async subscribe(handle: Function, data: ITransferData<TransferDataDto>, options?: any): Promise<void> { }
      close(): void | Promise<void> { }
      onInit(): void | Promise<void> { }
    }

<<<<<<< HEAD
    class TestModuleRef {
      resolve(type: Class<any>) {
        return new type(new CraftsLoggerMock());
      }
    }

=======
>>>>>>> master
    sinon.stub(TestBusAdapter.prototype, 'onInit');

    const initializeAdapterBusOptions: MicroserviceOptions = {
      adapter: { adapterPrototype: TestBusAdapter, adapterConfig: {} },
    }

<<<<<<< HEAD
    const initializeAdapterBusInstance = new InitializeAdapterBus(initializeAdapterBusOptions, new TestModuleRef() as ModuleRef);
=======
    const initializeAdapterBusInstance = new InitializeAdapterBus(initializeAdapterBusOptions);
>>>>>>> master

    const adapterInstance = await initializeAdapterBusInstance.init();
    chai.expect(adapterInstance instanceof TestBusAdapter).to.be.true;
    chai.expect(adapterInstance['onInit'].calledOnce).to.be.true;

    adapterInstance['onInit'].restore();
  });

  it('should initialize adapter correctly calling all life cycles', async () => {
    class TestBusAdapter implements IBusAdapter, ISetOptions, IOnInit {
      async publish(data: ITransferData<TransferDataDto>, options?: any): Promise<void> { }
      async subscribe(handle: Function, data: ITransferData<TransferDataDto>, options?: any): Promise<void> { }
      close(): void | Promise<void> { }
      setOptions(options: any): void { }
      onInit(): void | Promise<void> { }
    }

<<<<<<< HEAD
    class TestModuleRef {
      resolve(type: Class<any>) {
        return new type(new CraftsLoggerMock());
      }
    }

=======
>>>>>>> master
    sinon.stub(TestBusAdapter.prototype, 'setOptions');
    sinon.stub(TestBusAdapter.prototype, 'onInit');

    const initializeAdapterBusOptions: MicroserviceOptions = {
      adapter: { adapterPrototype: TestBusAdapter, adapterConfig: {} },
    }

    const adapterConfig = initializeAdapterBusOptions.adapter.adapterConfig;
<<<<<<< HEAD
    const initializeAdapterBusInstance = new InitializeAdapterBus(initializeAdapterBusOptions, new TestModuleRef() as ModuleRef);
=======
    const initializeAdapterBusInstance = new InitializeAdapterBus(initializeAdapterBusOptions);
>>>>>>> master

    const adapterInstance = await initializeAdapterBusInstance.init(adapterConfig);
    chai.expect(adapterInstance instanceof TestBusAdapter).to.be.true;
    chai.expect(adapterInstance['setOptions'].calledOnce).to.be.true;
    chai.expect(adapterInstance['onInit'].calledOnce).to.be.true;

    adapterInstance['setOptions'].restore();
    adapterInstance['onInit'].restore();
  });

  it('should throw BusConfigException by adapter config', async () => {
<<<<<<< HEAD
    class TestModuleRef {
      resolve(type: Class<any>) {
        return new type(new CraftsLoggerMock());
      }
    }
    const initializeAdapterBusInstance = new InitializeAdapterBus(<any>{}, new TestModuleRef() as ModuleRef);
=======
    const initializeAdapterBusInstance = new InitializeAdapterBus(<any>{});
>>>>>>> master

    await initializeAdapterBusInstance.init()
      .catch((error) => {
        chai.expect(error instanceof BusConfigException).to.be.true;
        chai.expect(error.message).to.be.equal('The Bus Adapter was not configured.');
      });
  });

  it('should throw BusConfigException by adapter', async () => {
<<<<<<< HEAD
    class TestModuleRef {
      resolve(type: Class<any>) {
        return new type(new CraftsLoggerMock());
      }
    }
=======
>>>>>>> master
    const initializeAdapterBusOptions: MicroserviceOptions = {
      adapter: { adapterPrototype: null, adapterConfig: {} },
    }

<<<<<<< HEAD
    const initializeAdapterBusInstance = new InitializeAdapterBus(initializeAdapterBusOptions, new TestModuleRef() as ModuleRef);
=======
    const initializeAdapterBusInstance = new InitializeAdapterBus(initializeAdapterBusOptions);
>>>>>>> master

    await initializeAdapterBusInstance.init()
      .catch((error) => {
        chai.expect(error instanceof BusConfigException).to.be.true;
        chai.expect(error.message).to.be.equal('The Bus Adapter Prototype was not configured.');
      });
  });

});
