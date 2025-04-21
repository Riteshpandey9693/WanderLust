const Listing = require("../models/listing.model.js");
const { cloudinary } = require("../cloudConfig.js");

module.exports.index = async (req, res) => {
  try {
    const listings = await Listing.find();
    const sliderIdx = 0;
    res.render("./listings/index.ejs", {
      listings,
      sliderIdx,
      category: "undefined",
    });
  } catch (err) {
    console.error("Error in index method:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.renderNewForm = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.createNewListing = async (req, res) => {
  try {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    if (req.file) {
      const { path: url, filename } = req.file;
      newListing.image = { url, filename };
    }

    console.log("New listing with image:", newListing); // Debug log for new listing

    await newListing.save();
    req.flash("success", "Listing created successfully!");
    res.redirect(`/listing/${newListing._id}`);
  } catch (err) {
    console.error("Error creating listing:", err.message);
    req.flash("error", "Failed to create listing.");
    res.redirect("/listing/new");
  }
};

module.exports.showListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate("owner")
      .populate({
        path: "reviews",
        populate: { path: "author" },
      });

    if (!listing) {
      req.flash("error", "Listing not found.");
      return res.redirect("/listing");
    }

    res.render("./listings/show.ejs", { listing });
  } catch (err) {
    console.error("Error fetching listing:", err.message);
    req.flash("error", "Failed to fetch listing.");
    res.redirect("/listing");
  }
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested does not exist.");
    return res.redirect("/listing");
  }

  res.render("./listings/edit.ejs", { listing });
};

module.exports.editListing = async (req, res) => {
  const { id } = req.params;

  if (req.file) {
    const { path: url, filename } = req.file;
    req.body.listing.image = { url, filename };

    const listing = await Listing.findById(id);
    if (listing.image && listing.image.filename) {
      await cloudinary.uploader.destroy(listing.image.filename, {
        invalidate: true,
      });
    }
  }

  const listing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    new: true,
    runValidators: true,
  });

  req.flash("success", "Listing Updated!");
  res.redirect(`/listing/${id}`);
};

module.exports.category = async (req, res) => {
  const { category = "undefined", idx: sliderIdx } = req.params;
  const listings = await Listing.find({ category });

  res.render("./listings/index.ejs", {
    listings,
    sliderIdx,
    category,
  });
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndDelete(id);

  if (listing.image && listing.image.filename) {
    await cloudinary.uploader.destroy(listing.image.filename, {
      invalidate: true,
    });
  }

  req.flash("success", "Listing Deleted!");
  res.redirect(`/`);
};
