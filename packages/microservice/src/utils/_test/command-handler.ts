import { CommandHandler, ICommandHandler } from '../../';
import { TestCommand } from './command';

@CommandHandler(TestCommand)
export class TestCommandHandler implements ICommandHandler<TestCommand> {
  handle(command: TestCommand): void { }
}
