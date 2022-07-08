const User = require("./config/models/User")

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

                    }
                }
                
            }
        }catch(e){
            console.log(e)
        }
    
}
module.exports = replyMessage