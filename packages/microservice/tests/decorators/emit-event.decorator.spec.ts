// import * as chai from 'chai';

// import { EmitEvent } from './emit-event.decorator';
// import { EmitEventDecoratorException } from '../exceptions/emit-event.decorator.exception';
// import { EventBus } from '../event-bus';

// describe('emit event decorator', () => {

//   it('should validate params decorator', () => {
//     try {

//       class Foo {
//         @EmitEvent({ context: null, action: null })
//         foo() { }
//       }

//     } catch (error) {

//       chai.expect(error.constructor.name).to.be.equal(EmitEventDecoratorException.name);
//       chai.expect(error.type).to.be.equal('params');

//     }
//   });

//   it('should validate EventBus dependency', async () => {
//     try {

//       class Foo {
//         @EmitEvent({ context: 'test', action: 'eventCreated' })
//         bar() { }
//       }

//       await (new Foo().bar());

//     } catch (error) {

//       chai.expect(error.constructor.name).to.be.equal(EmitEventDecoratorException.name);
//       chai.expect(error.type).to.be.equal('event bus');

//     }
//   });

//   it('should decorator work fine', async () => {
//     const fakeData = { name: 'Sebastian' };

//     class FakeEventBus extends EventBus {
//       constructor() { super({} as any); }
//       publish({ data }) {
//         chai.expect(data).to.be.equal(fakeData);
//       }
//     }

//     class Foo {
//       constructor(private readonly eventBus: EventBus) { }
//       @EmitEvent({ context: 'test', action: 'eventCreated' })
//       bar(data) { }
//     }

//     const eventBus = new FakeEventBus();
//     await (new Foo(eventBus).bar(fakeData));
//   });
// });
