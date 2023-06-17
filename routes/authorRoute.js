const express= require("express");
const { addAuther, getAuthers, getAuther } = require("../controller/autherController");
const { authorization } = require("../middlewares/auth");
const autherrouter=express();
autherrouter.route("/auther/add-auther").post(authorization, addAuther);
autherrouter.route("/auther/all-authers").get(authorization, getAuthers);
autherrouter.route("/auther/autherdetail").get(authorization, getAuther);
module.exports=autherrouter;