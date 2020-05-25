import * as chai from 'chai';
import { LocalBusAdapter } from '../../src/bus-adapters/local-bus.adapter';
<<<<<<< HEAD
import { CraftsLogger } from '../../src/logger/services/logger.service';
import { CraftsLoggerMock } from '../mocks/crafts-logger.mock';
=======
import { IBusAdapter } from '../../src/interfaces/bus/bus-adapter.interface';
>>>>>>> master

describe('local bus adapter', () => {

    const testData = {
        action: 'test-action',
        context: 'test-context',
        data: { id: '' },
    };

<<<<<<< HEAD
    let localAdapter: LocalBusAdapter;

    before(() => {
        localAdapter = new LocalBusAdapter(new CraftsLoggerMock());
        localAdapter.onInit();
    })

    after(() => {
=======
    let localAdapter: IBusAdapter;

    beforeEach(() => {
        localAdapter = new LocalBusAdapter();
    })

    afterEach(() => {
>>>>>>> master
        localAdapter.close();
    })

    describe('Subscribe', () => {
        it('Should be equal to test-context', (done) => {
            localAdapter.subscribe((result) => {
                chai.expect(result.context).to.be.equal(testData.context);
                done();
            }, testData);
            localAdapter.publish(testData);
        })

        it('Should not execute', (done) => {
            localAdapter.subscribe(() => {
                throw 'It should not entry here';
            }, testData);
            localAdapter.publish({ ...testData, context: 'other-context' });
            setTimeout(() => {
                done();
            }, 500);
        })

        it('Should throw a exception', (done) => {
            const data = { ...testData, context: 'test-exception' };
            localAdapter.subscribe(() => {
                try {
                    throw 'Exception';
                } catch (error) {
                    chai.expect(error).to.be.equal('Exception');
                    done();
                }
            }, data);
            localAdapter.publish(data);
        })

        it('Should be called twice', (done) => {
            const data = { ...testData, context: 'twice' };
            let counter = 0;
            localAdapter.subscribe(() => {
                counter++;
                if (counter > 1) {
                    done();
                }
            }, data);
            localAdapter.subscribe(() => {
                counter++;
                if (counter > 1) {
                    done();
                }
            }, data);
            localAdapter.publish(data);
        })
    })
});