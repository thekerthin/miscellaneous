import { Injectable, Scope, Logger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class CraftsLogger extends Logger {

  debug(message: any, context?: string): void {
    if (process.env.TEST) {
      return;
    }
    super.debug(message, context);
  }

}