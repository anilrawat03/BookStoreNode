const httpresponse = require("../common/responseAPI");
const { authers } = require("../database/DBModel/authorModel");
const { toObjectId } = require("../common/common");
exports.addAuther = async (req, res) => {
  console.log(req.body);
  const data = await authers.create({
    name: req.body.name,
    age: req.body.age,
  });
  return httpresponse.apiResponse(
    res,
    httpresponse.HTTP_OK,
    "Successfully added"
  );
};

exports.getAuthers = async (req, res) => {
  const allauthers = await authers.aggregate([
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "autherid",
        as: "books",
        // pipeline: [
        //   {
        //     $match: {type:2},
        //   },
        // ],
      },
    },

    {
      $project: {
        _id: 1,
        name: 1,
        age: 1,
        numBooks: { $size: "$books" },
      },
    },
  ]);
  return httpresponse.apiResponse(
    res,
    httpresponse.HTTP_OK,
    "data fetched successfully",
    allauthers
  );
};

exports.getAuther = async (req, res) => {
  console.log(req.query);
  //const auther = await authers.findById(req.query.id);
  const auther = await authers.aggregate([
    {
      $limit: 1,
    },
    {
      $match: { _id: toObjectId(req.query.id) },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "autherid",
        as: "books",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        age: 1,
        numBooks: { $size: "$books" },
      },
    },
  ]);
  return httpresponse.apiResponse(
    res,
    httpresponse.HTTP_OK,
    "Successfully fetched",
    auther
  );
};
