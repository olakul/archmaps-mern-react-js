const { Schema, model } = require("mongoose");

const landmarkSchema = new Schema({
  address: {
    type: String,
    country: String,
    city: String,
    zipCode: Number,
    street: String,
    houseNumber: String,
  },
  year: Number,
  architect: String,
  description: String
})

const Landmark = model("Landmark", landmarkSchema);
module.exports = Landmark;