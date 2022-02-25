import { expect } from 'chai';
import { DomainEntity, ValidationArrayException, ValidationDictException } from '../lib';
import { ExampleAggregate } from './fixtures/example.aggregate';
import { ExampleAggregate2 } from './fixtures/example2.aggregate';
import { Name } from './fixtures/name.value-object';
import { Email } from './fixtures/email.value-object';
import { Info } from './fixtures/info.value-object';
import { ExampleAggregate3 } from './fixtures/example3.aggregate';

describe('AggregateRoot', () => {

  it('should create an aggregate-root with value objects only', () => {
    const data = {
      name: 'Evaluna',
      email: 'evaluna@email.com',
      info: ['info1', 'info2']
    };

    const aggregate = ExampleAggregate.create(data);

    expect(aggregate.name).to.be.instanceOf(Name);
    expect(aggregate.email).to.be.instanceOf(Email);
    expect(Array.isArray(aggregate.info)).to.be.true;
    expect(aggregate.info[0]).to.be.instanceOf(Info);
  });

  it('should create an aggregate-root with an entity', () => {
    const data = {
      name: 'Evaluna',
      info: ['info1', 'info2'],
      example: {
        name: 'Sub Name',
        email: 'sub-email@email.com'
      },
      example2: []
    };

    const aggregate = ExampleAggregate2.create(data);

    expect(aggregate.name).to.be.instanceOf(Name);
    expect(Array.isArray(aggregate.info)).to.be.true;
    expect(aggregate.info[0]).to.be.instanceOf(Info);
    expect(aggregate.example).to.be.instanceOf(DomainEntity);
    expect(aggregate.example.name).to.be.instanceOf(Name);
    expect(aggregate.example.email).to.be.instanceOf(Email);
  });

  it('should fail creating an aggregate-root', () => {
    const data = {
      name: 'Evaluna',
      info: 'info1',
      example: { name: 'Sub Name', email: 'sub-email@email.com' }
    };

    try {
      ExampleAggregate2.create(data);
    } catch (error) {
      expect(error.message).to.be.equal('The value object \'info\' must be an Array.');
    }
  });

  it('should fail creating an aggregate-root by value object validation', () => {
    const data = {
      name: '',
      email: '',
      info: ['', 'foo', '']
    };

    try {
      ExampleAggregate.create(data).validate();
    } catch (error) {
      expect(error).to.be.instanceOf(ValidationDictException);
      expect(error.exceptions.name).to.be.instanceOf(ValidationArrayException);
      expect(error.exceptions.email).to.be.instanceOf(ValidationArrayException);
      expect(error.exceptions.info).to.be.an('array').lengthOf(3);
      expect(error.exceptions.info[0]).to.be.instanceOf(ValidationArrayException);
      expect(error.exceptions.info[1]).to.be.null;
      expect(error.exceptions.info[2]).to.be.instanceOf(ValidationArrayException);
    }
  });

  it.only('should fail creating an aggregate-root by entity validation', () => {
    const data = {
      name: '',
      info: [],
      example: {
        name: '',
        email: 'email@email.com'
      },
      example2: [
        {
          name: '',
          email: 'email@email.com'
        },
        {
          name: '',
          email: ''
        }
      ]
    };

    try {
      const result = ExampleAggregate2.create(data).validate();
      console.log('result', JSON.stringify(result));

    } catch (error) {
      console.log('error', error);
      // expect(error).to.be.instanceOf(ValidationDictException);
      // expect(error.exceptions.name).to.be.instanceOf(ValidationArrayException);
      // expect(error.exceptions.info).to.be.an('array').lengthOf(2);
      // expect(error.exceptions.info[0]).to.be.null;
      // expect(error.exceptions.info[1]).to.be.instanceOf(ValidationArrayException);
      // expect(error.exceptions.example).to.be.instanceOf(ValidationDictException);
      // expect(error.exceptions.example.exceptions.name).to.be.instanceOf(ValidationArrayException);
    }
  });

  it('should fail creating an aggregate-root by entity array validation', () => {
    const data = {
      name: 'Example',
      example: [
        {
          name: '',
          email: 'email@email.com'
        },
        {
          name: 'test',
          email: 'email@email.com'
        }
      ]
    };

    try {
      ExampleAggregate3.create(data).validate();
    } catch (error) {
      expect(error).to.be.instanceOf(ValidationDictException);
      expect(error.exceptions.example).to.be.an('array').lengthOf(2);
      expect(error.exceptions.example[0]).to.be.instanceOf(ValidationDictException);
      expect(error.exceptions.example[0].exceptions.name).to.be.instanceOf(ValidationArrayException);
      expect(error.exceptions.example[1]).to.be.null;
    }
  });

  it('should get raw data', () => {
    const data = {
      name: 'Example',
      info: ['Example'],
      example: {
        name: 'Example',
        email: 'email@email.com'
      },
      example2: [
        {
          name: 'Example',
          email: 'email@email.com'
        }
      ]
    };

    ExampleAggregate2.create(data).toRaw();
    // expect(raw).deep.equal({ id: example.id.toString(), data });
  });

});
