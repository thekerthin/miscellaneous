// import * as chai from 'chai';

// import { EventHandler } from './event-handler.decorator';
// import { EVENT_HANDLER_METADATA } from '../config/constants.config';

// describe('event handle decorator', () => {

//   class TestEntity {
//     constructor(public readonly name: string = 'Sebastian') { }
//   }

//   @EventHandler(TestEntity)
//   class Test { }

//   it('should validate target metadata in handle', () => {
//     const target = Reflect.getMetadata(EVENT_HANDLER_METADATA, Test);
//     const targetInstance = new target;

//     chai.expect(targetInstance.constructor.name).to.be.equal(TestEntity.name);
//     chai.expect(targetInstance).to.be.deep.equal(new TestEntity());
//   });
// });
