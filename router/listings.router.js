const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.model.js"); // Ensure this is imported
const { validateListing } = require("../middleware/validation.js");
const wrapAsync = require("../utils/WrapAsync.js");
const {
  isLoggedIn,
  isOwner,
  forwardGedcoding,
} = require("../middleware/middlewares.js");
const listingsController = require("../controllers/listingsController.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Show all listings
router.route("/").get(wrapAsync(listingsController.index));

// Create new listing
router
  .route("/listing")
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    forwardGedcoding,
    wrapAsync(listingsController.createNewListing)
  );

// Render new listing form
router.route("/listing/new").get(isLoggedIn, listingsController.renderNewForm);

// Render listing category
router
  .route("/listing/category/:category/:idx")
  .get(wrapAsync(listingsController.category));

// Show, edit, and delete individual listing
router
  .route("/listing/:id")
  .get(wrapAsync(listingsController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    forwardGedcoding,
    wrapAsync(listingsController.editListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingsController.destroyListing));

// Render edit listing form
router.get(
  "/listing/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingsController.renderEditForm)
);

router.post(
  "/listings/:id/review",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    req.flash("success", "Review added successfully!");
    res.redirect(`/listing/${listing._id}`);
  })
);

module.exports = router;
