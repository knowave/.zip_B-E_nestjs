import { Error } from '../error';

const BAD_REQUEST_ERROR_STATUS_CODE = 400;

export const BAD_REQUEST_ERROR = {
    ALREADY_EXIST_USER: {
        code: 'ALREADY_EXIST_USER',
        message: 'already exist user.',
        statusCode: BAD_REQUEST_ERROR_STATUS_CODE,
    } as Error,
    ALREADY_EXIST_NICKNAME: {
        code: 'ALREADY_EXIST_NICKNAME',
        message: 'already exist nickname.',
        statusCode: BAD_REQUEST_ERROR_STATUS_CODE,
    } as Error,
    ALREADY_EXIST_REGION: {
        code: 'ALREADY_EXIST_REGION',
        message: 'already exist region.',
        statusCode: BAD_REQUEST_ERROR_STATUS_CODE,
    } as Error,
};
