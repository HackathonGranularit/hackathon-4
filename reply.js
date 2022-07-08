
const User = require("./config/models/User")
const { makePayment } = require("./helpers")

const replyMessage = (message) =>{
    let response = ""
    let regex = /[A-Z]{3}\s\d{3}\S$/g
    try {
        if (message ==="Hi"){
            const userExist = await User.findOne({username:req.body.from});
            if(userExist){
                userExist.plates.forEach( element => res.status(200).send(element))
                response = "Your amount is 50"

                if(message === "Pay"){
                    makePayment(
                        {
                            "Amount": 300,
                            "PhoneNumber": body.from,
                            "NotificationCallBackUrl": "http://5f6a-41-139-133-17.ngrok.io/payment-callback ",
                            "AccountReference": "Test" 
                        }
                    )
                }
            }else{
    
                response= "Please enter your Number Plate"
                let noPlate = regex(req.body.text.body)
                const user = new User({
                    "username": req.body.from,
                    "plate": noPlate
                })
                const saveUser = user.save()
                response = "Your amount is 50"

                if(message === "Pay"){
                    makePayment(
                        {
                            "Amount": 300,
                            "PhoneNumber": body.from,
                            "NotificationCallBackUrl": "http://5f6a-41-139-133-17.ngrok.io/payment-callback ",
                            "AccountReference": "Test" 
                        }
                    )
                }
            }
            
        }
    }catch(e){
        throw e
    }
}


module.exports = replyMessage