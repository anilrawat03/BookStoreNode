const express =require('express');
const { addbook, getAllbooks, getbook, updatebook} =  require('../controller/bookController');
const { authorization } = require('../middlewares/auth');
const bookrouter=express();
 bookrouter.route("/add-book").post(authorization,addbook);
  bookrouter.route("/update-book").post(authorization, updatebook);
 bookrouter.route("/all-books").get(authorization, getAllbooks);
 bookrouter.route("/book").get(authorization, getbook);
 module.exports = bookrouter;