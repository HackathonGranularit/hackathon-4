const mongoose = require("mongoose")

const User = mongoose.Schema({
    userName: {
    type: Number,
    required: false,
  },
  numberPlate:{
      type:[String],
      required: false,
  },
  timestamp:{
      type:Date,
      required: false,
  }

})
module.exports = mongoose.model("User", User)