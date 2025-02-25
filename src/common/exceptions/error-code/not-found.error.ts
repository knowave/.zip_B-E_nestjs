import { Error } from '../error';

const NOT_FOUND_ERROR_STATUS_CODE = 404;

export const NOT_FOUND_ERROR = {
    USER: {
        code: 'USER_NOT_FOUND',
        message: 'not found user',
        statusCode: NOT_FOUND_ERROR_STATUS_CODE,
    } as Error,
    COMMENT: {
        code: 'COMMENT_NOT_FOUND',
        message: 'not found comment',
        statusCode: NOT_FOUND_ERROR_STATUS_CODE,
    } as Error,
    PUBLIC_APARTMENT: {
        code: 'PUBLIC_APARTMENT_NOT_FOUND',
        message: 'not found public apartment',
        statusCode: NOT_FOUND_ERROR_STATUS_CODE,
    },
};
