const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const app = express()
const { sendMessage } = require('./helpers')

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
  async (req, res) => {
    console.log(req.body)
    try {
      sendMessage({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": req.body.from,
        "type": "text",
        "text": { // the text object
          "preview_url": false,
          "body": "Provide your Number plate"
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

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

module.exports = app
