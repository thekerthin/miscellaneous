import { before } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import { IBusAdapter } from '../../src/interfaces/bus/bus-adapter.interface';
import * as loadPackage from '../../src/utils/load-package.util';
import { RedisBusAdapter } from '../../src/bus-adapters/redis-bus.adapter';
import { Redis } from './mocks/redis.mock';
<<<<<<< HEAD
import { CraftsLoggerMock } from '../mocks/crafts-logger.mock';
=======
>>>>>>> master

describe('redis bus adapter', function () {

    let sandbox;

    const testData = {
        action: 'test-action',
        context: 'test-context',
        data: { id: '' },
    };

    let redisAdapter: IBusAdapter;

    describe('Subscribe', () => {

        before(async () => {
            sandbox = sinon.createSandbox();
            sandbox.stub(loadPackage, 'loadPackage').returns(new Redis());
<<<<<<< HEAD
            const adapter = new RedisBusAdapter(new CraftsLoggerMock());
=======
            const adapter = new RedisBusAdapter();
>>>>>>> master
            adapter.setOptions({ url: 'redis://localhost:6379' });
            await adapter.onInit();
            redisAdapter = adapter;
        })

        after(async () => {
            await redisAdapter.close();
            sandbox.restore();
        })

        it('Should be equal to test-context', () => {
            return new Promise(async (resolve, reject) => {
                await redisAdapter.subscribe(async (result) => {
                    try {
                        chai.expect(result.context).to.be.equal(testData.context);
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                }, testData);
                await redisAdapter.publish(testData);
            })
        })

        it('Should not execute', (done) => {
            redisAdapter.subscribe(() => {
                throw 'It should not entry here';
            }, testData);
            redisAdapter.publish({ ...testData, context: 'other-context' });
            setTimeout(() => {
                done();
            }, 500);
        })

        it('Should throw a exception', (done) => {
            const data = { ...testData, context: 'test-exception' };
            redisAdapter.subscribe(() => {
                try {
                    throw 'Exception';
                } catch (error) {
                    chai.expect(error).to.be.equal('Exception');
                    done();
                }
            }, data);
            redisAdapter.publish(data);
        })

        it('Should be called twice', (done) => {
            const data = { ...testData, context: 'twice' };
            let counter = 0;
            redisAdapter.subscribe(() => {
                counter++;
                if (counter > 1) {
                    done();
                }
            }, data);
            redisAdapter.subscribe(() => {
                counter++;
                if (counter > 1) {
                    done();
                }
            }, data);
            redisAdapter.publish(data);
        })
    });
});