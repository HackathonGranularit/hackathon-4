const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const app = express()
const axios = require('axios').default
const { sendMessage, makePayment } = require('./helpers')

// connect to the database
const { connectDatabase } = require("./config/db")
const mongoose = require("mongoose");

dotenv.config()

const mongoDbUri = process.env.MONGO_DB_URL;


connectDatabase(mongoDbUri)



while (mongoose.connection.closed) {
    console.log("mongoose connection closed")
}

const port = process.env.PORT || 8080

/**
 * MIDDLE WARE
 **/

// add cors middle ware
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(express.json());

/**
 * ROUTES
 */
app.post(
    `/callback`,
    async(req, res) => {
        console.log(req.body)
        let message = req.body.text.body
        let platesArr = []
        let pay = [200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750]
        let check;
        let response;
        if (message === 'Hello' || message === 'hello') {
            if (platesArr.length === 0) {
                response = "Hey there, What's your number plate?"
            } else {
                response = `Hey Welcome Back, Which number plate would you like to use? ${platesArr}`
            }
        } else if (message[0] === 'K') {
            if (platesArr.length != 0) {
                for (let i = 0; i < platesArr.length; i++) {
                    if (platesArr[i] === message) {
                        let price = pay[Math.floor(Math.random() * pay.length)];
                        response = `Your total amount is: Ksh ${price}`
                    }
                }
            } else {
                platesArr.push(message)
                let price = pay[Math.floor(Math.random() * pay.length)];
                response = `Your total amount is: Ksh ${price}.`
            }
        } else if (message === 'Pay' || message === 'pay') {
            let config = {
                headers: {
                    AuthorizationToken: "dessd1S4Ssd3r3rkd2fHdysbd09sddGKtwDBPJ",
                }
            }
            axios.post('https://es9b8fu024.execute-api.eu-west-1.amazonaws.com/naihack/pay', {
                    //phoneNumber: req.body.from
                    phoneNumber: "+254111593999",
                    //amount: price
                    amount: 1,
                    //accountReference:finalPlate
                    accountReference: 'KDH001J',
                    NotificationCallBackUrl: "https://62d4-41-139-133-17.in.ngrok.io"
                }, config)
                .then(function(response) {
                    console.log(response);
                    response = `Successfully Paid`
                    sendMessage({
                        "messaging_product": "whatsapp",
                        "recipient_type": "individual",
                        "to": req.body.from,
                        "type": "text",
                        "text": { // the text object
                            "preview_url": false,
                            "body": response
                        }
                    })
                })
                .catch(function(error) {
                    console.log(error);

                });


        } else if (message === 'thanks') {
            response = "Have a great day"
        } else {
            response = "Sorry I don't understand that"
        }
        try {

            sendMessage({
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": req.body.from,
                "type": "text",
                "text": { // the text object
                    "preview_url": false,
                    "body": response
                }
            })

        } catch (e) {
            throw e;
        }

        res
            .status(200)
            .json({
                success: true,
                message: "Successfully Sent Callback"
            })
    }
)


app.listen(port, () => {
    console.log(`api running on port ${port}`)
})

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
});

module.exports = app