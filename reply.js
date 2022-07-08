const { makePayment } = require("./helpers")

const replyMessage = async (body) =>{
    let response = ""
    let regex = /[A-Z]{3}\s\d{3}\S$/g
        try {
            if (message =="Hi"){
                response= "Please enter your Number Plate"
            }else if (regex(body.text.body)){
                response= "Your amout is 300"
            }
            else if (message == "Pay"){
                makePayment(
                    {
                        "Amount": 300,
                        "PhoneNumber": body.from,
                        "NotificationCallBackUrl": "http://5f6a-41-139-133-17.ngrok.io/payment-callback ",
                        "AccountReference": "Test" 
                    }
                )
            }
        }catch(e){
            console.log(e)
        }
    
}
module.exports = replyMessage