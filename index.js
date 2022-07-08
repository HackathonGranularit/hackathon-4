const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const app = express()
const { sendMessage, makePayment } = require('./helpers')
// connect to the database
const { connectDatabase } = require("./config/db")
const mongoose = require("mongoose");
const replyMessage = require("./reply")
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
  async (req, res) => {
    console.log(req.body)
    let message = replyMessage(req.body.text.body)
    console.log(message)
    try {
      sendMessage({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": req.body.from,
        "type": "text",
        "text": { // the text object
          "preview_url": false,
          "body": message
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



app.post('/payment-callback',
  async (req, res) => {
    result = req.body.ResultCode
    if (result == 0){
      try {
        sendMessage({
          "messaging_product": "whatsapp",
          "recipient_type": "individual",
          "to": req.body.PhoneNumber,
          "type": "text",
          "text": { // the text object
            "preview_url": false,
            "body": `Payment has been received`
          }
        })
        
      } catch (error) {
        sendMessage({
          "messaging_product": "whatsapp",
          "recipient_type": "individual",
          "to": req.body.PhoneNumber,
          "type": "text",
          "text": { // the text object
            "preview_url": false,
            "body": `Payment of not succesful`
          }
        })
        
      }

    }
    else {

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

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

module.exports = app
