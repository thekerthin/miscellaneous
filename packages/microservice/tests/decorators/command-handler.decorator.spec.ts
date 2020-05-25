// import * as chai from 'chai';

// import { CommandHandler } from './command-handler.decorator';
// import { COMMAND_HANDLER_METADATA } from '../config/constants.config';

// describe('command handle decorator', () => {

//   class TestEntity {
//     constructor(public readonly name: string = 'Sebastian') { }
//   }

//   @CommandHandler(TestEntity)
//   class Test { }

//   it('should validate target metadata in handle', () => {
//     const target = Reflect.getMetadata(COMMAND_HANDLER_METADATA, Test);
//     const targetInstance = new target;

//     chai.expect(targetInstance.constructor.name).to.be.equal(TestEntity.name);
//     chai.expect(targetInstance).to.be.deep.equal(new TestEntity());
//   });
// });
