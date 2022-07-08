const {checkPlate} = require ("../parkingAPI/parkingapi");
let plateOptions;
let plates = [];

const generatePlateOptions = (max) =>{
    for (let i = 1; i < max.length+1; i++) {
        plates.push(i);       
    }
}
checkPlate()
    .then(res => { plateOptions = generatePlateOptions(res.length)})
    .catch(err => {console.log(err)})
    
    
const getReply = (message) => {
  switch (message) {
    case "Hello":
      return "Hello \n Select a number plate to pay";
    case checkPlate.plate:
      return `Your Amount Due is KES.${checkPlate.amount} and stay duration is ${checkPlate.duration}
            \n Select a number you would like to use to pay \n Enter new number`;
    default:
      break;
  }
};

module.exports = {
  getReply,
}
