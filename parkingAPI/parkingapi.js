const vehicleModel= require("../Models/vehicle")
const transactionModel= require("../Models/Transactions")

/*const checkPlate = async  (req, res) => {
try{

    const {plateNo}=req.body
 const plate=   await  vehicleModel.findOne({
plateNo:plateNo
 })
 if(!plate){
return res.status(404).json({message:"plate number does not exist"})
 }
  return res.status(200).json(plate)
}
catch(error){
return

}
    
}*/

//

const completeTransaction=async  (plateNo,PhoneNumber,is_paid,status)=>{

try{
 const transaction=   await transactionModel.findOne({PhoneNumber:PhoneNumber, plateNo})
await transactionModel.findOneAndUpdate(transaction,{...transaction,is_paid, status})

}
catch(err){
    return

}


}


const checkPlate = async (plateNo) => {
  try {
    const plate = await vehicleModel.findOne({
      plateNo,
    });
    if (!plate) {
      throw "plate number does not exist"
    }
    return Promise(plate);
  } catch (error) {
    console.error(error);
    return []
  }
};

module.exports = {
  checkPlate,
};
