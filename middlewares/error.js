const { apiResponse } = require("../common/responseAPI");
module.exports = (err, req, res, next) =>
 {

       console.log("Error fetched");
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // mongodb id error
    if (err.name === "CastError") {
        const message = `Resource Not Found. Invalid: ${err.path}`;
        err ={message:message,statusCode:400};
    }

    // mongoose duplicate key error
    if (err.code === 11000) {
        const message = `${Object.keys(err.keyValue)} already exists`;
         err = { message: message, statusCode: 400 };
    }

    // wrong jwt error
    if (err.code === "JsonWebTokenError") {
        const message = 'JWT Error';
        err = { message: message, statusCode: 400 };
    }

    // jwt expire error
    if (err.code === "JsonWebTokenError") {
        const message = 'JWT is Expired';
          err = { message: message, statusCode: 400 };
    }

    // res.status(err.statusCode).json({
    //     success: false,
    //     message: err.message,
    // });

apiResponse(res, err.statusCode, err.message);
}
