import { Command, ICommandDto } from '../../';

export class DataCommand implements ICommandDto {
  id: any;
  name: string;
}

export class TestCommand extends Command<DataCommand> {
  public action: string = 'test-command';
  public context: string = 'test';

  constructor(data: DataCommand, cid?: string) {
    super(data, cid);
  }
}