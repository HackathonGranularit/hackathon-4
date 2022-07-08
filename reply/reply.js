const { checkPlate } = require("../parkingAPI/parkingapi");
const getAllPlates = require("../parkingAPI/getAllPlates");
let plateOptions = ["1", "2", "3"];
const payment = require('../payment/payment')
const plates = [
  {
    plateNo: "KBC402d",
    duration: 30,
    amount: 20,
  },

  {
    plateNo: "KBA897j",
    duration: 45,
    amount: 30,
  },
  {
    plateNo: "KBV739p",
    duration: 45,
    amount: 30,
  },
];
let plateSelected;

const getReply = (req) => {
  const message = req.body.text.body;
  console.log(message === "Hello");
  switch (true) {
    case (message === "Hello") :
      const body = `Hello, Welcome to Parking Checkout, Please Select your vehicle number plate : (1)${plates[0].plateNo} , (2)${plates[1].plateNo}, (2)${plates[2].plateNo}`;
      return body;
    case (message === "1"):
      plateSelected = plates[0];
      return `Your Amount Due is KES.${plateSelected.amount} and stay duration is ${plateSelected.duration}
            \n Enter phone number to pay with`;
    case (message ==="2"):
      plateSelected = plates[1];
      return `Your Amount Due is KES.${plateSelected.amount} and stay duration is ${plateSelected.duration}
                    \n Enter phone number to pay with`;
    case (message ==="3"):
      plateSelected = plates[2];
      return `Your Amount Due is KES.${plateSelected.amount} and stay duration is ${plateSelected.duration}
                            \n Enter phone number to pay with`;
    case (message.includes("07")):
      const phoneNumber = message;
      return payment.makePayment(plateSelected.amount, phoneNumber, plateSelected.plateNo);
    default:
      const text = "Please select an option";
      return text;
  }
};

module.exports = {
  getReply,
};
