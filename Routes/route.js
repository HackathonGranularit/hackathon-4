
const  {checkPlate}= require("../parkingAPI/parkingapi")
const express= require("express")

const router= express.Router()

router.post("/",checkPlate )
module.exports= router