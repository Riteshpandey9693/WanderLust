const { reviewSchema, listingSchema, userSchema } = require("../schema.js");
const { cloudinary } = require("../cloudConfig.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.validateListing = async (req, res, next) => {
  try {
    const { error } = listingSchema.validate(req.body);
    if (error) {
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename, {
          invalidate: true,
        });
      }
      console.log("Validation error:", error.message);
      return res.status(400).json({ error: error.message });
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(422, error.message);
  }
  return next();
};

module.exports.validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    throw new ExpressError(422, error.message);
  }
  return next();
};
