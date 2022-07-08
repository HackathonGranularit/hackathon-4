const mongoose = require("mongoose")

const User = mongoose.Schema({
    userName: {
    type: number,
    required: true,
  },
  numberPlate:{
      type:[String],
      required: true,
  },
  timestamp:{
      type:Date,
      required: true,
  }

})

