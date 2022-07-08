
const { connectDatabase } = require("./config/db")
const User = require("./config/models/User")
const { makePayment } = require("./helpers")

const replyMessage = (message) => {
    let response = ""
    let regex = /[A-Z]{3}\s\d{3}\S$/g
    try {
        if (message.text.body == "Hi") {
            const userExist = User.findOne({ userName: message.from });
            if (userExist) {
                // userExist.plates.forEach(element => res.status(200).send(element))
                response = "Parking fee is 300 , Reply with Pay to make a payment"

            } else {

                response = "Reply with Parking to enter your Number plate"
                const user = new User({
                    "userName": message.from,
                    "numberPlate": noPlate,
                    "timestamp": Date.now()
                })
                const saveUser = user.save()
            }

        } else if (message.text.body == "Pay") {
            makePayment(
                {
                    "Amount": 300,
                    "PhoneNumber": message.from,
                    "NotificationCallBackUrl": "http://5f6a-41-139-133-17.ngrok.io/payment-callback ",
                    "AccountReference": "Test"
                }
            )
            response = "Wait for stk push from Mpesa"
        } else if (message.text.body == "Parking") {
            response = "Enter Your car plate number"
            let noPlate = regex.test(message.text.body)
        }

        return response

    } catch (e) {
        console.log('Reply Error', e)
    }
}


module.exports = replyMessage