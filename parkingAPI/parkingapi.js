const vehicleModel= require("../Models/vehicle")

const checkPlate = async  (req, res) => {
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
console.error(error)

}
    
}



module.exports = {
    checkPlate
}