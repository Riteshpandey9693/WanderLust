const Listing = require("../models/listing.model.js");
const Review = require("../models/reviews.model.js");
const axios = require("axios");

// Authorization Middlewares
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    req.flash("error", "You must be logged in to perform this action.");
    return res.status(403).json({ error: "You must be logged in to perform this action." });
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(req.user._id)) {
    req.flash("error", "You are not the owner of this listing!");
    return res.redirect(`/listings/${id}`);
  }
  return next();
};

module.exports.isReviewOwner = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author._id.equals(req.user._id)) {
    req.flash("error", "You are not the author of this review!");
    return res.redirect(`/listings/${id}`);
  }
  return next();
};

module.exports.redirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  return next();
};

// useing maptile api for forward Geocoding
module.exports.forwardGedcoding = async (req, res, next) => {
  try {
    if (req.body.listing.location && req.body.listing.country) {
      const key = process.env.MAP_TOKEN; // Use MAP_TOKEN from .env
      const { location, country } = req.body.listing;
      const address = `${location} ${country}`;
      const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(address)}.json?key=${key}`;

      console.log("Geocoding Request URL:", url);

      const result = await axios.get(url);
      console.log("Geocoding API Response:", result.data);

      if (result.data.features.length === 0) {
        return res.status(400).json({ error: "Invalid location provided." });
      }

      // Extract the first feature's geometry
      req.body.listing.geometry = result.data.features[0].geometry;
    }
    next();
  } catch (err) {
    if (err.response) {
      console.error("Geocoding API Error Response:", err.response.data);
      console.error("Geocoding API Status Code:", err.response.status);
    } else {
      console.error("Error in forwardGedcoding middleware:", err.message);
    }

    if (err.response && err.response.status === 403) {
      return res.status(403).json({ error: "Geocoding API returned 403 Forbidden. Check your API token." });
    }

    next(err);
  }
};
