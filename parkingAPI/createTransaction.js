const mongoose= require('mongoose')
const transactionModel= require("../Models/Transactions")

const createTransaction= async (req, res)=>{

try{

  

 const transaction=await transactionModel.create(req.body)
 return res.status(201).json({message:transaction})

}
catch(error){
   return res.status(500).send(error +"there was an error")

}

}
module.exports= createTransaction