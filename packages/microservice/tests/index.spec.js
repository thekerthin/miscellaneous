require('ts-node/register');

const chai = require('chai')
  // .use(require('chai-as-promised'))
  .use(require('chai-uuid'));

// Chai
global.chai = chai;
global.expect = chai.expect;
global.should = chai.should;

should();