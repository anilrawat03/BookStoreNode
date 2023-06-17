const express = require("express");
const { signup, login, userprofile, updateProfile } = require("../controller/userController");
const { authorization } = require("../middlewares/auth");
const userRouter=express();
userRouter.route("/user/singup").post(signup);
userRouter.route("/user/login").post(login);
userRouter.route("/user/my-profile").get(authorization,userprofile);
userRouter.route("/user/update-profile").post(authorization, updateProfile);
module.exports = userRouter;