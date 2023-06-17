const books  = require("../database/DBModel/bookModel");
const httpresponse = require("../common/responseAPI");
const { toObjectId } = require("../common/common");
exports.addbook=(async (req,res)=>{

   const book = await books.create({
     name: req.body.name,
     description: req.body.description,
     type: req.body.type,
     autherid: req.body.autherid,
     createdBy:req.user.id,
   });
        
     return httpresponse.apiResponse(
    res,
    httpresponse.HTTP_OK,
    "Book has been added."
  );
});
exports.updatebook = async (req, res) => 
{
  const book = await books.findById(req.body.id);
  if(!book)
   return httpresponse.apiResponse(
     res,
     httpresponse.HTTP_BAD_REQUEST,
     "Book does't exist."
   );
   book.name = req.body.name;
   book.description = req.body.description;
   book.type = req.body.type;
   book.autherid = req.body.autherid;
   book.save();
  return httpresponse.apiResponse(
    res,
    httpresponse.HTTP_OK,
    "Book has been added.",
    book
  );
};
exports.getAllbooks=(async (req,res)=>
{
  const pipeline = [];
  pipeline.push({
    $lookup: {
      from: "authers",
      localField: "autherid",
      foreignField: "_id",
      as: "auther",
    },
  });
  pipeline.push({
    $lookup: {
      from: "users",
      localField: "createdBy",
      foreignField: "_id",
      as: "user",
    },
  });

  pipeline.push({ $unwind: "$auther" });
   pipeline.push({ $unwind: "$user" });
  pipeline.push({
    $project: {
      _id: 1,
      name: 1,
      description: 1,
      type: 1,
      "auther._id": 1,
      "auther.name": 1,
      "auther.age": 1,
      "user._id": 1,
      "user.name": 1,
    },
  });
//  pipeline.push({
//    $match: { "auther.age": { $gte: 32 } },
//  });
 
  const allbooks = await books.aggregate(pipeline);
  res.json({ message: "data fecthed", data: allbooks });
});

exports.getbook=(async (req,res)=>
{
  const pipeline = [];
  pipeline.push({$match: { _id: toObjectId(req.query.id) }});
    pipeline.push({ $match: { type:2 } });
  pipeline.push({
    $lookup: {
      from: "authers",
      localField: "autherid",
      foreignField: "_id",
      as: "auther",
    },
  });
  pipeline.push({
    $lookup: {
      from: "users",
      localField: "createdBy",
      foreignField: "_id",
      as: "user",
    },
  });

  pipeline.push({ $unwind: "$auther" });
  pipeline.push({ $unwind: "$user" });
  pipeline.push({
    $project: {
      _id: 1,
      name: 1,
      description: 1,
      type: 1,
      "auther._id": 1,
      "auther.name": 1,
      "auther.age": 1,
      "user._id": 1,
      "user.name": 1,
    },
  });
  //  pipeline.push({
  //    $match: { "auther.age": { $gte: 32 } },
  //  });

  const book = await books.aggregate(pipeline);
    res.json({message:"data fecthed",data:book});
 });

 

