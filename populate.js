const vehicles= require("./data.json")
const { connectDatabase } = require("./config/db")
const vehicleModel= require("./Models/vehicle")
require("dotenv").config()
const mongoDbUri = process.env.MONGO_DB_URL;

const start = async ()=>{

try{
    await connectDatabase(mongoDbUri)
    await vehicleModel.deleteMany()
    await vehicleModel.create(vehicles)

    console.log("vehicles added")

    process.exit(0)// exited succesfully

}
catch(error){

console.error(error)
process.exit(1)
}
}
start()