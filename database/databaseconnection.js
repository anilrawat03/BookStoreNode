const { default: mongoose } = require("mongoose")
 mongoose
   .connect(process.env.MONGO_DATABASEURL)
   .then(() => {
     console.log("Mongo db connected");
   })
   .catch((error) => {
     console.log("Mongo Db error=>" + error);
   });