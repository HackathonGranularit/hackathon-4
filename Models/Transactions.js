const mongoose= require('mongoose')

const transactionSchema= new mongoose.Schema(

    {
        phoneNumber:{
type:String,
required:true,
trim:true

        },
        status:{

            type:String,
            required:true,
            enum:["open", "closed"],
            default:"open"
        },
        isPaid:{
            type:Boolean,
            required:true,
            default:false
        },
        plateNo:{
            type:String,
             required:true,
        trim:true


        }
    }
)
module.exports= mongoose.model("Transactions", transactionSchema)