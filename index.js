const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const app = express()
const { getReply }  = require('./reply/reply')
const payment = require("./payment/payment")
const {sendMessage} = require("./helpers")
// connect to the database
const { connectDatabase } = require("./config/db")
const mongoose = require("mongoose");

dotenv.config()

const mongoDbUri = process.env.MONGO_DB_URL;

let activeUser;


connectDatabase("mongodb+srv://makinika:LgcP9fFru!56vSR@cluster0.0qe4e.mongodb.net/naihack-three?retryWrites=true&w=majority")


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
    console.log('message',req.body.text.body);
    activeUser = req.body.from;
    try {
      const response = getReply(req);
      sendMessage({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to":  req.body.from,
        "type": "text",
        "text": { // the text object
            "preview_url": false,
            "body": response
          }
    });
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

app.post('/mpesa_callback',(req,res) => {
  console.log("======== MPESA RESPONSE =========");
  console.log(res);
  payment.processPayment(res.body).then(response => {
    const msg = res.body.ResultCode === "0"?'Payment successful':'Payment not successful.Try Again'
    sendMessage({
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": activeUser,
      "type": "text",
      "text": { // the text object
        "preview_url": false,
        "body": msg
      }
    })
  })
});



app.listen(port, () => {
  console.log(`api running on port ${port}`)
})

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

module.exports = app
