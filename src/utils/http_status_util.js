const HttpStatus = {
    // Success Responses
    OK: 200,
    CREATED: 201,
    // ACCEPTED: 202,
    NO_CONTENT: 204,

    // Client Errors
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,

    // Server Errors
    INTERNAL_SERVER_ERROR: 500,
    // SERVICE_UNAVAILABLE: 503,
};

module.exports = HttpStatus;