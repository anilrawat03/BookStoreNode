const { StatusCodes } = require("http-status-codes");
 const HTTP_CREATED = StatusCodes.CREATED;
const HTTP_OK = StatusCodes.OK;
const HTTP_BAD_REQUEST = StatusCodes.BAD_REQUEST;
const HTTP_UNAUTHORIZED = StatusCodes.UNAUTHORIZED;
const HTTP_FORBIDDEN = StatusCodes.FORBIDDEN;
const HTTP_NOT_FOUND = StatusCodes.NOT_FOUND;
const HTTP_CONFLICT = StatusCodes.CONFLICT;
const HTTP_METHOD_NOT_ALLOWED = StatusCodes.METHOD_NOT_ALLOWED;
const HTTP_UNPROCESSABLE_ENTITY = StatusCodes.UNPROCESSABLE_ENTITY;
const HTTP_INTERNAL_SERVER_ERROR = StatusCodes.INTERNAL_SERVER_ERROR;

const apiResponse = (res, status, message, data = null) => 
{
    let response = {
      message: message,
      data: data,
    };
    return res.status(status).json(response);
  };
 module.exports=
 {
  apiResponse,
    HTTP_CREATED,
    HTTP_OK,
    HTTP_BAD_REQUEST,
    HTTP_UNAUTHORIZED,
    HTTP_FORBIDDEN,
    HTTP_NOT_FOUND,
    HTTP_CONFLICT,
    HTTP_METHOD_NOT_ALLOWED,
    HTTP_UNPROCESSABLE_ENTITY,
    HTTP_INTERNAL_SERVER_ERROR
}