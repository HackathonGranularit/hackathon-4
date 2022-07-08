# Welcome To Nai Hack 2022
In here is a sample application containing boiler place that you will use to buld your whatsapp chat bot.

Below are the environmental variables you need to configure.

## Env Variables


`MONGO_DB_URL` 

* Group One
`mongodb+srv://makinika:LgcP9fFru!56vSR@cluster0.0qe4e.mongodb.net/naihack-one?retryWrites=true&w=majority`

* Group Two
`mongodb+srv://makinika:LgcP9fFru!56vSR@cluster0.0qe4e.mongodb.net/naihack-two?retryWrites=true&w=majority`

* Group Three
`mongodb+srv://makinika:LgcP9fFru!56vSR@cluster0.0qe4e.mongodb.net/naihack-three?retryWrites=true&w=majority`

* Group Four
`mongodb+srv://makinika:LgcP9fFru!56vSR@cluster0.0qe4e.mongodb.net/naihack-four?retryWrites=true&w=majority`

* Group Five
`mongodb+srv://makinika:LgcP9fFru!56vSR@cluster0.0qe4e.mongodb.net/naihack-five?retryWrites=true&w=majority`



### Set Up Testing Phone and CallBack Url

Below are the data objects for each group they are explained in detail below.

```json

{
    "_id": "62c55381a0994cc353004d3a",
    "name": "Group 1",
    "link": "https://9e50-197-232-74-189.ngrok.io/callback",
    "phone": "254XXXXXXXXX",
    "__v": 0
}

{
    "_id": "62c57f9480da8d9593bb49e4",
    "name": "Group 2",
    "link": "https://fce5-197-232-74-189.ngrok.io",
    "phone": "254XXXXXXXXX",
    "__v": 0
}

{
    "_id": "62c57f9c80da8d9593bb49e6",
    "name": "Group 3",
    "link": "https://fce5-197-232-74-189.ngrok.io",
    "phone": "254XXXXXXXXX",
    "__v": 0
}

{
    "_id": "62c57fa280da8d9593bb49e8",
    "name": "Group 4",
    "link": "https://fce5-197-232-74-189.ngrok.io",
    "phone": "254XXXXXXXXX",
    "__v": 0
}

{
    "_id": "62c57fa780da8d9593bb49ea",
    "name": "Group 5",
    "link": "https://fce5-197-232-74-189.ngrok.io",
    "phone": "254XXXXXXXXX",
    "__v": 0
}

```

#### Field Explanation 
* `_id` - The unique identifiere of a group which will be used to update the groups testing phone number and whatsapp callback url if need be

* `name` - The name of the group.

* `link` - The callback url where WhatsApp will send the message that has been sent by your user..

* `phone` - phone number that is being used for testing purposes.


### Update Group Request
If you may want to update your group's callback url or testing phone number, below is a sample curl request.
```
curl --location --request PUT 'https://hackathon-4-proxy.onrender.com/api/v1/groups/62c55381a0994cc353004d3a' \
--header 'Content-Type: application/json' \
--data-raw '{
    "link":"https://9e50-197-232-74-189.ngrok.io/callback",
    "phone":"254797792447"
}'
```

## Expected User Journey
* User starts chat with the Chatbot
* Chatbot asks for their Number plate if there are none in the, and user provides(if they have used the chatbot before, it should provide previously used number plates)
* Chatbot sends the number plate to the parking api, and parking api returns to the chatbot if it exists or not. If it exists, returns with amount due, and duration of stay, and a cta to pay. If not, user is asked to input valid number plate.
* Once user clicks Pay, the chatbot asks them to confirm the number they are paying with(if they have used the chatbot before, it should show previously used numbers)
* Once user selects or inputs the number, the chatbot lets them know to check their phone for an mpesa prompt
* If user pays Successfully; the Chatbot should message the user, letting them know that they have paid successfully, for Number plate x - duration of stay.
* The chatbot should also send a positive trigger to the Parking api, letting it know that number plate x has been paid, and hence approved to be opened.
* If user's payment fails, the chatbot should let the user know that payment has failed, and should also send a negative trigger to the parking api, letting it know number plate x payment failed, hence state to stay unpaid and closed.


## WhatsApp Send Messages Documentation

[WhatsApp Send Messages Documentation](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages)

## Staging Links
* Group One
`https://hackathon-4-team-one.onrender.com`

* Group Two
`https://hackathon-4-team-two.onrender.com`

* Group Three
`https://hackathon-4-team-three.onrender.com`

* Group Four
`https://hackathon-4-team-four.onrender.com`

* Group Five
`https://hackathon-4-team-five.onrender.com`

## MPESA GATEWAY
* MPESA ENDPOINT
`https://es9b8fu024.execute-api.eu-west-1.amazonaws.com/naihack/pay`

-The above endpoint accepts only post requests
-For authorization purposes, include the below header in your request

`AuthorizationToken dessd1S4Ssd3r3rkd2fHdysbd09sddGKtwDBPJ`
 
-Supply the following to initiate a payment. Ideally, account reference will be your vehicle number

`int Amount`

`string PhoneNumber`

`string NotificationCallBackUrl (An endpoint that I can push the mpesa payment notification once user has completed the payment process)`

`string AccountReference`

-See below 

```js
let config = {
  headers: {
    AuthorizationToken: "dessd1S4Ssd3r3rkd2fHdysbd09sddGKtwDBPJ",
  }
}

axios.post(' https://es9b8fu024.execute-api.eu-west-1.amazonaws.com/naihack/pay', {
	phoneNumber: "+2547XXXXXXXX",
    amount: 10,
    accountReference: "KDA377X",
    NotificationCallBackUrl: "https://{your handler url}"
}, config)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```


```js
const axios = require('axios');

const sendMessage = (body) => {
    const url = `https://waba.360dialog.io/v1/messages`
    const headers = {
        'Content-Type': 'application/json',
        'D360-API-KEY': 'FSHBI59lo6uLQBarrtWxAO1mAK'
    }
    axios.post(
        url,
        body,
        {
            headers:headers
        }
    ).catch(
        (e) => {
            console.log(e)
        }
    )
}
module.exports = {
    sendMessage 
}

```
