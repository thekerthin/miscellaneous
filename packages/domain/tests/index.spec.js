require('ts-node/register');
require('reflect-metadata');

const chai = require('chai')
  // .use(require('chai-as-promised'))
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  .use(require('chai-uuid'));

// Chai
global.chai = chai;
global.expect = chai.expect;
global.should = chai.should;

// should();
