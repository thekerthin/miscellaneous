# `@kerthin/microservice`

This package helps you building decouple systems where the projects can scale up from a monolith system to microservice system without any troubles just changing a couple code lines.

## Installation

```sh
$ yarn add @kerthin/microservice
# or
$ npm i @kerthin/microservice
```

## Usage

_**Note:** So far this package is only available for [nest.js](https://nestjs.com/) framework but in the future we'll support different frameworks and programing languages_

### Create DTO

```ts
import { TransferDataDto } from '@kerthin/microservice';

class CreateUserDto extends TransferDataDto {

  name: string;

  lastName: string;

  birthday: Date;

  ...
}
```


### Create Command

```ts
import { Command } from '@kerthin/microservice';

class CreateUserDto extends Command<CreateUserDto> {

  public readonly action = 'create';

  public readonly context = 'user';

}
```

### Create Service

```ts
import { Injectable } from '@nestjs/common';
import { Broker } from '@kerthin/microservice';

@Injectable()
export class UserService {

  constructor(private readonly broker: Broker) {}

  create(data: CreateUserDto) {
    return this.broker
      .start()
      .add(new CreateUserDto(data))
      .end();
  }

}
```

### Create Command Handle

```ts
import { CommandHandler, ICommandHandler } from '@kerthin/microservice';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {

  handle(command: CreateUserCommand) {
    // command.data -> compute your logic
  }

}
```
