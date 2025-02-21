export const UNAUTHORIZED_ERROR_STATUS_CODE = 401;

export const UNAUTHORIZED_ERROR = {
  COMMON: {
    code: 'UNAUTHORIZED',
    message: 'unauthorized',
    statusCode: UNAUTHORIZED_ERROR_STATUS_CODE,
  },
} as const;
