const { Schema, model } = require("mongoose");

const landmarkSchema = new Schema({
  
  coordinates: {
    lat: Number,
    lng: Number
  },
  year: Number,
  architect: String,
  description: String,
  tags: String,
  
})

const Landmark = model("Landmark", landmarkSchema);
module.exports = Landmark;