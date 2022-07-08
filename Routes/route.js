
const  {checkPlate}= require("../parkingAPI/parkingapi")
const createTransaction=require("../parkingAPI/createTransaction")
const express= require("express")

const router= express.Router()

router.post("/",checkPlate )
router.route("/transact").post(createTransaction)
module.exports= router