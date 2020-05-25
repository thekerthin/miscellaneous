import * as chai from 'chai';
import * as sinon from 'sinon';
import { RabbitMQBusAdapter } from '../../src/bus-adapters/rabbitmq-bus.adapter';
import * as loadPackage from '../../src/utils/load-package.util';
import { ITransferData } from '../../src/interfaces/transfer-data';
<<<<<<< HEAD
import { CraftsLoggerMock } from '../mocks/crafts-logger.mock';
=======
>>>>>>> master

describe('RabbitMQ Bus Adapter', () => {
  const sandbox = sinon.createSandbox();
  let rabbitMQBusAdapter: RabbitMQBusAdapter;
  let connection, createChannel, assertExchange, publish,
    prefetch, assertQueue, bindQueue, consume, ack, close;

  beforeEach(() => {
    assertExchange = sandbox.stub().returns(Promise.resolve());
    publish = sandbox.stub();
    prefetch = sandbox.stub();
    assertQueue = sandbox.stub();
    bindQueue = sandbox.stub();
    consume = sandbox.stub();
    ack = sandbox.stub();
    close = sandbox.stub();
    createChannel = sandbox.stub().returns({
      assertExchange, publish, prefetch,
      assertQueue, bindQueue, consume, ack,
    });
    connection = sandbox.stub().returns({ createChannel, close });

    sandbox.stub(loadPackage, 'loadPackage').returns({ connection });

<<<<<<< HEAD
    rabbitMQBusAdapter = new RabbitMQBusAdapter(new CraftsLoggerMock());
=======
    rabbitMQBusAdapter = new RabbitMQBusAdapter();
>>>>>>> master
  });

  afterEach(() => {
    sandbox.restore();
    rabbitMQBusAdapter = null;
  });

  it('should initialize the adapter correctly', async () => {
    await rabbitMQBusAdapter.onInit();
    chai.expect(connection.calledOnce).to.be.true;
    chai.expect(createChannel.calledTwice).to.be.true;
  });

  it('should publish a message', async () => {
    class DataTest implements ITransferData<any> {
      context = 'test'; action = 'createTest'; data = { id: '' };
    }

    await rabbitMQBusAdapter.onInit();
    await rabbitMQBusAdapter.publish(new DataTest());

    chai.expect(assertExchange.calledOnce).to.be.true;
    chai.expect(publish.calledOnce).to.be.true;
    chai.expect(assertExchange.getCall(0).args[0]).to.be.equal('test');
    chai.expect(assertExchange.getCall(0).args[1]).to.be.equal('topic');
    chai.expect(assertExchange.getCall(0).args[2]).deep.equals({ durable: true, autoDelete: false });
    chai.expect(publish.getCall(0).args[0]).to.be.equal('test');
    chai.expect(publish.getCall(0).args[1]).to.be.equal('createTest');
    chai.expect(publish.getCall(0).args[2] instanceof Buffer).to.be.true;
    chai.expect(publish.getCall(0).args[3]).deep.equals({ persistent: true });
  });

  it('should subscribe to message', async () => {
    class DataTest implements ITransferData<any> {
      context = 'test'; action = 'createTest'; data = { id: '' };
    }

    rabbitMQBusAdapter.setOptions({ service: 'test-service' })
    await rabbitMQBusAdapter.onInit();
    await rabbitMQBusAdapter.subscribe((data: any) => { }, new DataTest());

    chai.expect(prefetch.calledOnce).to.be.true;
    chai.expect(assertExchange.calledOnce).to.be.true;
    chai.expect(assertQueue.calledOnce).to.be.true;
    chai.expect(bindQueue.calledOnce).to.be.true;
    chai.expect(consume.calledOnce).to.be.true;

    chai.expect(prefetch.getCall(0).args[0]).to.be.equal(1);

    chai.expect(assertExchange.getCall(0).args[0]).to.be.equal('test');
    chai.expect(assertExchange.getCall(0).args[1]).to.be.equal('topic');
    chai.expect(assertExchange.getCall(0).args[2]).deep.equals({ durable: true, autoDelete: false });

    chai.expect(assertQueue.getCall(0).args[0]).to.be.equal('test-service.test.createTest');
    chai.expect(assertQueue.getCall(0).args[1]).deep.equals({
      durable: true, autoDelete: false, exclusive: false,
    });

    chai.expect(bindQueue.getCall(0).args[0]).to.be.equal('test-service.test.createTest');
    chai.expect(bindQueue.getCall(0).args[1]).to.be.equal('test');
    chai.expect(bindQueue.getCall(0).args[2]).to.be.equal('createTest');

    chai.expect(consume.getCall(0).args[0]).to.be.equal('test-service.test.createTest');
    chai.expect(typeof consume.getCall(0).args[1]).to.be.equal('function');
    chai.expect(consume.getCall(0).args[2]).deep.equal({ noAck: false, exclusive: false });
  });

  it('should set options correctly', () => {
    const options = { service: 'test-service' };
    rabbitMQBusAdapter.setOptions(options);
    chai.expect(rabbitMQBusAdapter['options']).to.be.equal(options);
  });

  it('should close the bus connection', async () => {
    await rabbitMQBusAdapter.onInit();
    await rabbitMQBusAdapter.close();
    chai.expect(close.calledOnce).to.be.true;
  });

});
