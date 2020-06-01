import { HttpParamsException } from '../interfaces/http-params-exception.interface';

export class HttpException extends Error {
  public status?: number;
  public statusText?: string;
  public data?: any;

  constructor(params: HttpParamsException) {
    super(params.message);
    this.status = params.status;
    this.statusText = params.statusText;
    this.data = params.data;
  }
}
