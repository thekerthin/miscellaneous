import { before } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import { IBusAdapter } from '../../src/interfaces/bus/bus-adapter.interface';
import * as loadPackage from '../../src/utils/load-package.util';
import { MqttBusAdapter } from '../../src/bus-adapters/mqtt-bus.adapter';
import { Mqtt } from './mocks/mqtt.mock';
<<<<<<< HEAD
import { CraftsLoggerMock } from '../mocks/crafts-logger.mock';
=======
>>>>>>> master

describe('mqtt bus adapter', function () {

    let sandbox;

    const testData = {
        action: 'test-action',
        context: 'test-context',
        data: { id: '' },
    };

    let mqttAdapter: IBusAdapter;

    describe('Subscribe', () => {

        before(async () => {
            sandbox = sinon.createSandbox();
            sandbox.stub(loadPackage, 'loadPackage').returns(new Mqtt());
<<<<<<< HEAD
            const adapter = new MqttBusAdapter(new CraftsLoggerMock());
=======
            const adapter = new MqttBusAdapter();
>>>>>>> master
            adapter.setOptions({ brokerUrl: 'mqtt://localhost:1234' });
            await adapter.onInit();
            mqttAdapter = adapter;
        })

        after(async () => {
            await mqttAdapter.close();
            sandbox.restore();
        })

        it('Should be equal to test-context', () => {
            return new Promise(async (resolve, reject) => {
                await mqttAdapter.subscribe(async (result) => {
                    try {
                        chai.expect(result.context).to.be.equal(testData.context);
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                }, testData);
                await mqttAdapter.publish(testData);
            })
        })

        it('Should not execute', (done) => {
            mqttAdapter.subscribe(() => {
                throw 'It should not entry here';
            }, testData);
            mqttAdapter.publish({ ...testData, context: 'other-context' });
            setTimeout(() => {
                done();
            }, 500);
        })

        it('Should throw a exception', (done) => {
            const data = { ...testData, context: 'test-exception' };
            mqttAdapter.subscribe(() => {
                try {
                    throw 'Exception';
                } catch (error) {
                    chai.expect(error).to.be.equal('Exception');
                    done();
                }
            }, data);
            mqttAdapter.publish(data);
        })

        it('Should be called twice', (done) => {
            const data = { ...testData, context: 'twice' };
            let counter = 0;
            mqttAdapter.subscribe(() => {
                counter++;
                if (counter > 1) {
                    done();
                }
            }, data);
            mqttAdapter.subscribe(() => {
                counter++;
                if (counter > 1) {
                    done();
                }
            }, data);
            mqttAdapter.publish(data);
        })
    });
});