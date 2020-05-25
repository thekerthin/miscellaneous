import * as chai from 'chai';
import * as sinon from 'sinon';
import { head } from 'ramda';
import { BrokerProcess } from '../../src/services/broker/broker-process';
import { Broker } from '../../src/services/broker/broker';
import { IBusAdapter } from '../../src/interfaces';

describe('Broker process', () => {

  let brokerProcess: BrokerProcess;
  let adapter = {};

  beforeEach(() => {
    adapter = { publish(data: any, options?: any) { } }
    brokerProcess = new BrokerProcess(<IBusAdapter>adapter);
  });

  it('should the broker process be initialized correctly', () => {
    brokerProcess['getCid'] = function () { return this.cid; }
    const cid = brokerProcess['getCid']();
    cid.should.be.a.uuid('v4');
    brokerProcess['getCid'] = null;
  });

  it('should start the process adding data inside broker process', () => {
    const data = {
      context: 'test', action: 'createTest', data: { id: '1f558dcd-e8f4-400c-bc3d-71f7107d8fbb' },
    };
    brokerProcess['getData'] = function () { return this.data; }

    const process = brokerProcess.add(data);
    chai.expect(process instanceof BrokerProcess).to.be.true;
    chai.expect(brokerProcess['getData']()).to.be.equal(data);

    brokerProcess['getData'] = null;
  });

  it('should finish broker process publishing message', async () => {
    const sandbox = sinon.createSandbox();
    const data = { context: 'test', action: 'createTest', data: { id: '' } };
    const cid = brokerProcess['cid'];
    brokerProcess['data'] = data;

    const add = sandbox.spy(Broker.getInstance(), 'add');
    const publish = sandbox.stub(<any>adapter, 'publish').callsFake(async (data) => {
      const callback = Broker.getInstance().get(cid);
      await callback(data);
    });

    await brokerProcess.end();

    chai.expect(add.getCall(0).args[0]).to.be.equal(cid);
    chai.expect(typeof add.getCall(0).args[1]).to.be.equal('function');
    chai.expect(add.calledOnce).to.be.true;
    chai.expect(publish.calledOnce).to.be.true;
    chai.expect(head(publish.getCall(0).args)).deep.equals({ ...data, cid });

    sandbox.restore();

    const instance = Broker.getInstance();
    instance['brokers'] = undefined;
    Broker['instance'] = undefined;
  });

});
