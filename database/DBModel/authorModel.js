const mongoose = require("mongoose");

const autherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
    },
  ],
});
module.exports.authers=mongoose.model("authers",autherSchema);