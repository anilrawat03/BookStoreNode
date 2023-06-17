const express = require("express");
const bodyParser =require('body-parser');
const book = require("./routes/bookroute");
const auther=require('./routes/authorRoute');
const userRouter  = require("./routes/userRoute");
const errorMiddleware=require("./middlewares/error");
const PORT = 3000;
require('dotenv').config({ path: '.env' });
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

// process.on("uncaughtException", function (err) {
//   console.error(new Date().toUTCString() + " uncaughtException:", err.message);
//   console.error(err.stack);
//   process.exit(1);
// });

require("./database/databaseconnection");
const baseroute='/api/v1';
app.use(baseroute,book);
app.use(baseroute,auther);
app.use(baseroute, userRouter);
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log("server started on " + PORT);
    console.log(`Server Running on http://localhost:${PORT}`);
});