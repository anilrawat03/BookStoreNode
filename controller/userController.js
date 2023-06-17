const {
  passwordHashing,
  comparePassword,
  generateJWTToken,
} = require("../common/common");
const {
  apiResponse,
  HTTP_OK,
  HTTP_BAD_REQUEST,
  HTTP_UNAUTHORIZED,
} = require("../common/responseAPI");
const { users } = require("../database/DBModel/userModel");
const { catchAsync } = require("../middlewares/catchAsync");
const { userloginmodel } = require("../models/usermodels");

exports.signup = async (req, res) => {
  const { password, name, dob, email } = req.body;
  console.log(req.body);
  if (!password)
    return apiResponse(res, HTTP_BAD_REQUEST, "Password is required");
  if (!name) return apiResponse(res, HTTP_BAD_REQUEST, "name is required");
  if (!dob) return apiResponse(res, HTTP_BAD_REQUEST, "dob is required");
  if (!email) return apiResponse(res, HTTP_BAD_REQUEST, "email is required");
  let newpassword = await passwordHashing(password);
  const user = await users.create({
    name: name,
    dob: dob,
    email: email,
    password: newpassword,
  });

   let token = generateJWTToken({
     name: user.name,
     email: user.email,
     id: user._id,
   });
  return apiResponse(res, HTTP_OK, "Signup successfully", {
    user: user,
    token: token,
  });
};

exports.login = catchAsync(async (req, res) => {

const { error, value } = userloginmodel.validate(req.body);
if (error) {
  // Invalid data
  return  apiResponse(res,HTTP_BAD_REQUEST,error.details[0].message);
}

console.log(value);
  // let { email, password } = req.body;
  let user = await users.findOne({ email: value.email });
  if (user) {
    var isvalid = await comparePassword(value.password, user.password);
    if (isvalid) {
      let token = generateJWTToken({
        name: user.name,
        email: user.email,
        id: user._id,
      });
      return apiResponse(res, HTTP_OK, "Signup successfully", {
        user: user,
        token: token,
      });
    } else
      return apiResponse(res, HTTP_BAD_REQUEST, "Email Password didn't match");
  } else return apiResponse(res, HTTP_BAD_REQUEST, "Email doesn't exist");
});

exports.userprofile = async (req, res) => {
  let user = await users.find({ _id: req.user.id }).select("name email dob");
  if (user)
    return apiResponse(res, HTTP_OK, "profile details has been fetched", user);
  else return apiResponse(res, HTTP_UNAUTHORIZED, "user doesn't exist.");
};

exports.updateProfile = async (req, res) => {
  const { name, email, dob } = req.body;
 if (!name) return apiResponse(res, HTTP_BAD_REQUEST, "name is required");
 if (!dob) return apiResponse(res, HTTP_BAD_REQUEST, "dob is required");
 if (!email) return apiResponse(res, HTTP_BAD_REQUEST, "email is required");

  const user = await users.findById(req.user.id);
  user.name = name;
  user.email = email;
  user.dob = dob;
 await user.save();
  return apiResponse(res, HTTP_OK, "Profile details has been updated.", user);
};
