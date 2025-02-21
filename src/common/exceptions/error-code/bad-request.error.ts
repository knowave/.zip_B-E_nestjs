import { Error } from '../error';

const BAD_REQUEST_ERROR_STATUS_CODE = 400;

export const BAD_REQUEST_ERROR = {
  ALREADY_EXIST_USER: {
    code: 'ALREADY_EXIST_USER',
    message: 'already exist user.',
    statusCode: BAD_REQUEST_ERROR_STATUS_CODE,
  } as Error,
};
