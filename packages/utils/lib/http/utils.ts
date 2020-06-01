import * as R from 'ramda';
import { HttpParamsException } from './interfaces';
import { HttpException } from './exceptions/http.exception';

const getResponse = R.prop('response');
export const getData = R.prop('data');
export const getStatus = R.compose(R.prop('status'), getResponse);
export const getStatusText = R.compose(R.prop('statusText'), getResponse);
export const getDataResponse = R.compose(R.prop('data'), getResponse);
export const getMessage = R.compose(R.path(['data', 'message']), getResponse);

export const getError = R.applySpec<HttpParamsException>({
  status: getStatus,
  statusText: getStatusText,
  data: getDataResponse,
  message: getMessage,
});

export const throwException = (error: Error): void => {
  throw new HttpException(getError(error));
};
