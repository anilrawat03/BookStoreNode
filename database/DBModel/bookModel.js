const mongoose= require("mongoose");
const bookschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  type: {
    type: Number,
    required: [true, "Type is required"],
  },
  autherid: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Autherid is required"],
    ref: "authers",
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    required:[true,"Created by id is required"],
    ref:"users"
  }
});

module.exports=mongoose.model("books",bookschema);