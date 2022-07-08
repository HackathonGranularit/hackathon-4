const vehicleModel= require("../Models/vehicle")


const getAllPlates= async ()=>{


    try{
      const plates=  await vehicleModel.find({})

      return {message:plates}

    }
    catch(error){
        res.status(500).send("there was an error")

    }
}
module.exports= getAllPlates