const axios = require("axios");

const sendMessage = (body) => {
  const url = `https://waba.360dialog.io/v1/messages`;
  const headers = {
    "Content-Type": "application/json",
    "D360-API-KEY": "FSHBI59lo6uLQBarrtWxAO1mAK",
  };
  axios
    .post(url, body, {
      headers: headers,
    })
    .catch((e) => {
      console.log(e);
    });
};
const makePayment = (body) => {
  const url = "https://es9b8fu024.execute-api.eu-west-1.amazonaws.com/naihack/pay"
  const headers ={
      "AuthorizationToken": "dessd1S4Ssd3r3rkd2fHdysbd09sddGKtwDBPJ"
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
  sendMessage,
  makePayment
};
