const mongoose= require("mongoose")
const vehicleSchema= new mongoose.Schema(

{
    plateNo:
    {
        type:String,
        required:true,
        trim:true
    },
     duration:
    {
        type:Number,
        required:true,
        trim:true,

    },
    amount:
    {
        type:Number,
        required:true,
        trim:true,

    }
}


)

module.exports= mongoose.model("Vehicles",vehicleSchema )