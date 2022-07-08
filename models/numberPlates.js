const mongoose = requre("mongoose");
const Schema = mongoose.Schemas;

const platesSchema = new Schema({
    numberPlate: "array",
    phoneNumber: "array"
})

const Plates = mongoose.model("Plates", platesSchema);
module.exports = Plates;