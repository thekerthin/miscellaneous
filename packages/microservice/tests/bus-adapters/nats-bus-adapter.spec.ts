import * as chai from 'chai';
import * as sinon from 'sinon';
import { IBusAdapter } from '../../src/interfaces/bus/bus-adapter.interface';
import { NatsBusAdapter } from '../../src/bus-adapters/nats-bus.adapter';
import * as loadPackage from '../../src/utils/load-package.util';
import { Nats } from './mocks/nats.mock';
<<<<<<< HEAD
import { CraftsLoggerMock } from '../mocks/crafts-logger.mock';
=======
>>>>>>> master

describe('nats bus adapter', () => {

    let sandbox;

    const testData = {
        action: 'test-action',
        context: 'test-context',
        data: { id: '' },
    };

    let natsAdapter: IBusAdapter;

    before(async () => {
        sandbox = sinon.createSandbox();
        sandbox.stub(loadPackage, 'loadPackage').returns(new Nats());
<<<<<<< HEAD
        const adapter = new NatsBusAdapter(new CraftsLoggerMock());
=======
        const adapter = new NatsBusAdapter();
>>>>>>> master
        adapter.setOptions({ url: 'nats://localhost:4222' });
        await adapter.onInit();
        natsAdapter = adapter;
    })

    after(() => {
        natsAdapter.close();
        sandbox.restore();
    })

    describe('Subscribe', () => {
        it('Should be equal to test-context', (done) => {
            natsAdapter.subscribe((result) => {
                chai.expect(result.context).to.be.equal(testData.context);
                done();
            }, testData);
            natsAdapter.publish(testData);
        })

        it('Should not execute', (done) => {
            natsAdapter.subscribe(() => {
                throw 'It should not entry here';
            }, testData);
            natsAdapter.publish({ ...testData, context: 'other-context' });
            setTimeout(() => {
                done();
            }, 500);
        })

        it('Should throw a exception', (done) => {
            const data = { ...testData, context: 'test-exception' };
            natsAdapter.subscribe(() => {
                try {
                    throw 'Exception';
                } catch (error) {
                    chai.expect(error).to.be.equal('Exception');
                    done();
                }
            }, data);
            natsAdapter.publish(data);
        })

        it('Should be called twice', (done) => {
            const data = { ...testData, context: 'twice' };
            let counter = 0;
            natsAdapter.subscribe(() => {
                counter++;
                if (counter > 1) {
                    done();
                }
            }, data);
            natsAdapter.subscribe(() => {
                counter++;
                if (counter > 1) {
                    done();
                }
            }, data);
            natsAdapter.publish(data);
        })
    })
});