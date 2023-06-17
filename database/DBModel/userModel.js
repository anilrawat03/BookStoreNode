const { default: mongoose } = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password:{
    type:String,
    required:[true,"Password is required"]
  },
  dob: {
    type: Date,
    required: [true, "dob is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
exports.users = mongoose.model("users", userSchema);