import {
  HttpGetParams,
  HttpPostParams,
  HttpPutParams,
  HttpPatchParams,
  HttpDeleteParams,
} from './interfaces';

export interface HttpAdapter {
  get<T = any>(options: HttpGetParams): Promise<T | void>;
  post<T = any>(options: HttpPostParams): Promise<T | void>;
  put<T = any>(options: HttpPutParams): Promise<T | void>;
  patch<T = any>(options: HttpPatchParams): Promise<T | void>;
  delete<T = any>(options: HttpDeleteParams): Promise<T | void>;
}
