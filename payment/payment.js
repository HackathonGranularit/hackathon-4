const axios = require("axios");
const { completeTransaction } = require('../parkingAPI/parkingapi')
const url =
  "https://es9b8fu024.execute-api.eu-west-1.amazonaws.com/naihack/pay";
const NotificationCallBackUrl =
  "https://1803-41-139-133-17.ngrok.io/mpesa_callback";

const makePayment = (amount, phoneNumber, accountReference) => {
  if (typeof amount != "number") {
    throw Error("Amount should be a number");
  }
  if (typeof phoneNumber != "string") {
    throw Error("Phone Number should be a string");
  }
  if (typeof accountReference != "string") {
    throw Error("Template number should be a string");
  }
  const body = {
    amount,
    phoneNumber,
    NotificationCallBackUrl,
    accountReference,
  };
  const headers = {
    "Content-Type": "application/json",
    AuthorizationToken: `${process.env.TOKEN}`,
  };
  return axios.post(url, body, {
    headers: headers,
  });
};

const processPayment = (body) => {
  const PhoneNumber = body.PhoneNumber;
  const plate_number = body.AccountReference;
  const is_paid = body.ResultCode === "0" ? true : false;
  completeTransaction(plate_number,PhoneNumber,is_paid);

};

module.exports = {
  makePayment,
};
