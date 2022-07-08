const mongoose = require("mongoose")

const Payment = mongoose.Schema({
    userName: {
    type: number,
    required: true,
  },
  Amount:{
      type:[String],
      required: true,
  },
  Outcome:{
      type:Date,
      required: true,
  }

})