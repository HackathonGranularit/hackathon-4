const vehicleModel= require("../Models/vehicle")


const getAllPlates= async (req, res)=>{


    try{
      const plates=  await vehicleModel.find({})

      res.status(200).json({message:plates})

    }
    catch(error){
        res.status(500).send("there was an error")

    }
}
module.exports= getAllPlates