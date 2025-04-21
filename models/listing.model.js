const mongoose = require("mongoose");
const { Schema } = mongoose;
const { filters } = require("../utils/filters.js");
const categoryList = filters.map((filter) => filter.filterName);

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { url: { type: String }, filename: { type: String } },
  price: { type: Number },
  location: { type: String },
  country: { type: String },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  category: { type: String, enum: categoryList },
  geometry: {
    type: { type: String, enum: ["Point"], default: "Point", required: true },
    coordinates: { type: [Number], required: true },
  },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Listing", listingSchema);
