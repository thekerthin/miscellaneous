import * as chai from 'chai';
import * as sinon from 'sinon';
import { loadPackage } from '../../src/utils/load-package.util';

describe('loadPackage', function () {

  let sandbox: sinon.SinonSandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  })

  after(async () => {
    sandbox.restore();
  })

  it('Should be load a package', () => {
    const loadPackageFn = () => { }
    const loadPackageSpy = sinon.spy(loadPackageFn);
    loadPackage('test', 'loadPackage', loadPackageSpy);
    chai.expect(loadPackageSpy.calledOnce).to.be.true;
  })

  it('Should be equal a exception package', () => {
    const exitFunc = sandbox.stub(process, 'exit');
    const loadPackageFn = () => { throw 'test' }
    const loadPackageSpy = sinon.spy(loadPackageFn);
    loadPackage('test', 'loadPackage', loadPackageSpy);
    chai.expect(loadPackageSpy.calledOnce).to.be.true;
    chai.expect(exitFunc.calledOnce).to.be.true;
  })
});
