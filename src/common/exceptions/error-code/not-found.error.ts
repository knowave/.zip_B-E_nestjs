import { Error } from '../error';

const NOT_FOUND_ERROR_STATUS_CODE = 404;

export const NOT_FOUND_ERROR = {
    USER: {
        code: 'USER_NOT_FOUND',
        message: 'not found user',
        statusCode: NOT_FOUND_ERROR_STATUS_CODE,
    } as Error,
};
