import * as R from 'ramda';
import * as https from 'https';
import { Http } from '@kerthin/utils';

import { ConsumerExistsException } from '../../exceptions';
import { Consumer } from '../../consumer';
import {
  RegisterOAuth2ConsumerParams,
  RegisterBasicAuthConsumerParams,
} from '../../interfaces';

export class KongConsumerAdapter extends Consumer {
  private readonly http: Http;
  private readonly kongHost = process.env.KONG_URL;
  private readonly kongSslHost = process.env.KONG_SSL_URL;

  constructor() {
    super();
    this.http = new Http();
  }

  async create(username: string, customId?: string): Promise<any> {
    try {
      const options = {
        url: `${this.kongHost}/consumers`,
        body: {
          username,
          custom_id: customId,
        },
      };

      return await this.http.post(options);
    } catch (error) {
      if (error.data.code === 5) {
        throw new ConsumerExistsException(
          `The consumer '${username}' already exist`,
        );
      }

      throw error;
    }
  }

  async registerOAuth2(params: RegisterOAuth2ConsumerParams): Promise<any> {
    const options = {
      url: `${this.kongHost}/consumers/${params.consumerId}/oauth2`,
      body: {
        name: params.applicationName || process.env.APP_NAME,
        redirect_uris: [params.redirectUrl || process.env.REDIRECT_URL],
      },
    };

    return this.http.post(options);
  }

  async registerBasicAuth(
    params: RegisterBasicAuthConsumerParams,
  ): Promise<any> {
    const options = {
      url: `${this.kongHost}/consumers/${params.consumerId}/basic-auth`,
      body: {
        username: params.username,
        password: params.password,
      },
    };

    return this.http.post(options);
  }

  async findOAuth2Token(consumerId: string): Promise<any> {
    const credentials = await this.findOAuth2Credentials(consumerId);
    const options = {
      url: `${this.kongSslHost}/security/token/oauth2/token`,
      body: {
        client_id: credentials.clientId,
        client_secret: credentials.clientSecret,
        grant_type: 'password',
        provision_key: process.env.OAUTH2_PROVISION_KEY,
        authenticated_userid: consumerId,
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    };

    return this.http.post(options);
  }

  private async findOAuth2Credentials(consumerId: any): Promise<any> {
    const options = {
      url: `${this.kongHost}/consumers/${consumerId}/oauth2`,
    };

    const getCredentials = R.compose(
      R.applySpec({
        clientId: R.prop('client_id'),
        clientSecret: R.prop('client_secret'),
      }),
      R.head,
      R.prop('data'),
    );

    return this.http.get(options).then(getCredentials);
  }
}
