module.exports.catchAsync = errorFunction => (req, res, next) => 
{
    console.log("Error got");
    Promise.resolve(errorFunction(req, res, next)).catch(next);
}