const vehicleModel = require("../Models/vehicle");

const checkPlate = async (req, res) => {
  try {
    const { plateNo } = req.body;
    const plate = vehicleModel.findOne({
      plateNo: plateNo,
    });
    if (!plateExists) {
      res.status(404).json({ message: "plate number does not exist" });
    }
    res.status(204).json(plate);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  checkPlate,
};
