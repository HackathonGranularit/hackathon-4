const mongoose = require("mongoose")

const connectDatabase = (dbUrl) => {
  mongoose.connect(
    dbUrl,
  ).then(
    () => {
      console.log("mongo db connected")
    }
  )
  setTimeout(() => console.log('database load complete database'), 3000)
}


module.exports = {
  connectDatabase
}
