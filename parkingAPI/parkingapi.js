const vehicleModel = require("../Models/vehicle");

const checkPlate = async (plateNo) => {
  try {
    const plate = await vehicleModel.findOne({
      plateNo,
    });
    if (!plate) {
      throw "plate number does not exist"
    }
    return Promise(plate);
  } catch (error) {
    console.error(error);
    return []
  }
};

module.exports = {
  checkPlate,
};
