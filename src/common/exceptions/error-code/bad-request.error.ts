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
    INVALID_SOCIAL_LOGIN_TYPE: {
        code: 'INVALID_SOCIAL_LOGIN_TYPE',
        message: 'invalid social login type.',
        statusCode: BAD_REQUEST_ERROR_STATUS_CODE,
    } as Error,
    INVALID_COMMENT_CONTENT: {
        code: 'INVALID_COMMENT_CONTENT',
        message: 'invalid comment content length',
        statusCode: BAD_REQUEST_ERROR_STATUS_CODE,
    } as Error,
    INVALID_PUBLIC_APARTMENT: {
        code: 'INVALID_PUBLIC_APARTMENT',
        message: 'public apartment id is required when type is PUBLIC_APT',
        statusCode: BAD_REQUEST_ERROR_STATUS_CODE,
    } as Error,
    INVALID_PRIVATE_APARTMENT: {
        code: 'INVALID_PRIVATE_APARTMENT',
        message: 'private apartment id is required when type is PRIVATE_APT',
        statusCode: BAD_REQUEST_ERROR_STATUS_CODE,
    } as Error,
    INVALID_PUBLIC_APARTMENT_API_RESPONSE: {
        code: 'INVALID_PUBLIC_APARTMENT_API_RESPONSE',
        message: 'invalid public apartment api response',
        statusCode: BAD_REQUEST_ERROR_STATUS_CODE,
    } as Error,
    ALREADY_EXIST_EMAIL: {
        code: 'ALREADY_EXIST_EMAIL',
        message: 'already exist email.',
        statusCode: BAD_REQUEST_ERROR_STATUS_CODE,
    } as Error,
};
