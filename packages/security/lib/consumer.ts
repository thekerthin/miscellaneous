import {
  RegisterOAuth2ConsumerParams,
  RegisterBasicAuthConsumerParams,
} from './interfaces';

export abstract class Consumer {
  abstract create(username: string, customId?: string): Promise<any>;
  abstract registerOAuth2(params: RegisterOAuth2ConsumerParams): Promise<any>;
  abstract registerBasicAuth(
    params: RegisterBasicAuthConsumerParams,
  ): Promise<any>;
  abstract findOAuth2Token(consumerId: string): Promise<any>;
}
