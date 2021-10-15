import { expect } from 'chai';
import { DomainEntity } from '../lib';
import { ExampleAggregate } from './fixtures/example.aggregate';
import { ExampleAggregate2 } from './fixtures/example2.aggregate';
import { Name } from './fixtures/name.value-object';
import { Email } from './fixtures/email.value-object';
import { Info } from './fixtures/info.value-object';

describe('AggregateRoot', () => {

  // it('should create an aggregate-root with value objects only', () => {
  //   const data = {
  //     name: 'Evaluna',
  //     email: 'evaluna@email.com',
  //     info: ['info1', 'info2']
  //   };

  //   const aggregate = ExampleAggregate.create(data);

  //   expect(aggregate.name).to.be.instanceOf(Name);
  //   expect(aggregate.email).to.be.instanceOf(Email);
  //   expect(Array.isArray(aggregate.info)).to.be.true;
  //   expect(aggregate.info[0]).to.be.instanceOf(Info);
  // });

  // it('should create an aggregate-root with an entity', () => {
  //   const data = {
  //     name: 'Evaluna',
  //     info: ['info1', 'info2'],
  //     example: {
  //       name: 'Sub Name',
  //       email: 'sub-email@email.com'
  //     }
  //   };

  //   const aggregate = ExampleAggregate2.create(data);

  //   expect(aggregate.name).to.be.instanceOf(Name);
  //   expect(Array.isArray(aggregate.info)).to.be.true;
  //   expect(aggregate.info[0]).to.be.instanceOf(Info);
  //   expect(aggregate.example).to.be.instanceOf(DomainEntity);
  //   expect(aggregate.example.name).to.be.instanceOf(Name);
  //   expect(aggregate.example.email).to.be.instanceOf(Email);
  // });

  // it('should fail creating an aggregate-root', () => {
  //   const data = {
  //     name: 'Evaluna',
  //     info: 'info1',
  //     example: { name: 'Sub Name', email: 'sub-email@email.com' }
  //   };

  //   try {
  //     ExampleAggregate2.create(data);
  //   } catch (error) {
  //     expect(error.message).to.be.equal('The value object \'info\' must be an Array.');
  //   }
  // });

  // it('should fail creating an aggregate-root by value object validation', () => {
  //   const data = {
  //     name: '',
  //     email: '',
  //     info: ['', '']
  //   };

  //   try {
  //     ExampleAggregate.create(data).validate();
  //   } catch (error) {
  //     console.log('error', error.getDictException());
  //   }
  // });

  it.only('should fail creating an aggregate-root by entity validation', () => {
    const data = {
      name: '',
      info: ['Example', 'Tatiana'],
      example: {
        name: 'Example',
        email: 'email@email.com'
      }
    };

    try {
      ExampleAggregate2.create(data).validate();
    } catch (error) {
      console.log('error', error.exceptions);
    }
  });

});
