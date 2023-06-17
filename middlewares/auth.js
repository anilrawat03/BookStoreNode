const { verifyJWTToken } = require("../common/common");
const { apiResponse, HTTP_UNAUTHORIZED } = require("../common/responseAPI");
exports.authorization = (req, res, next) => {
  let token = req.headers[process.env.TOKEN_HEADER_KEY];
  if (!token) {
    return apiResponse(
      res,
      HTTP_UNAUTHORIZED,
      "Authorization token doesn't exist"
    );
  }
  try {
    token = token.replace("Bearer ", "");
    const decoded = verifyJWTToken(token);
    req.user = decoded;
  } catch (err) {
    return apiResponse(res, HTTP_UNAUTHORIZED, "Invalid token");
  }
  return next();
};
