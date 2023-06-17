const mongoose = require("mongoose");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
exports.toObjectId=(ids)=> {
  if (ids.constructor === Array) {
    return ids.map(new mongoose.Types.ObjectId);
  }
  return new mongoose.Types.ObjectId(ids);
}
exports.passwordHashing = async (password) => {
return await bcrypt.hashSync(password, 10);
};

exports.comparePassword =async (req_password,userpassword) => {

  bcrypt.compare(req_password, userpassword).then(x=>{
    console.log(x);
  });
  return await bcrypt.compare(req_password, userpassword);
};
exports.generateJWTToken = (data) => {
  return jwt.sign(data, process.env.JWT_KEY, { expiresIn: "30 days" });
};
exports.verifyJWTToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY);
};



