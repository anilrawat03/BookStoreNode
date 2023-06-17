const { apiResponse, HTTP_BAD_REQUEST } = require("./responseAPI");

module.exports.catchError = (res, error) => {
    winston.error(error);
    return apiResponse(res,HTTP_BAD_REQUEST,error);
  };