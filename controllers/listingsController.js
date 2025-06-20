const Listing = require("../models/listing.model.js");
const { cloudinary } = require("../cloudConfig.js");

module.exports.index = async (req, res) => {
  let listings = await Listing.find();
  let sliderIdx = 0;
  res.render("./listings/index.ejs", {
    listings,
    sliderIdx,
    category: "undefiend",
  });
};

module.exports.renderNewForm = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.createNewListing = async (req, res) => {
  let { path: url, filename } = req.file;
  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    console.log("if triggring here.");
    return res.redirect("/listing");
  }
  res.render("./listings/show.ejs", { listing });
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exists.");
    return res.redirect("/listing");
  }
  res.render("./listings/edit.ejs", { listing });
};
module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  if (req.file) {
    let { path: url, filename } = req.file;
    req.body.listing.image = { url, filename };
    let listing = await Listing.findById(id);
    await cloudinary.uploader.destroy(listing.image.filename, {
      invalidate: true,
    });
  }
  let listing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    new: true,
    runValidators: true,
  });
  req.flash("success", "Listing Updated!");
  res.redirect(`/listing/${id}`);
};

module.exports.category = async (req, res) => {
  let { category = "undefiend", idx: sliderIdx } = req.params;
  let listings = await Listing.find({ category: category });
  res.render("./listings/index.ejs", {
    listings,
    sliderIdx,
    category,
  });
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndDelete(id);
  await cloudinary.uploader.destroy(listing.image.filename, {
    invalidate: true,
  });
  req.flash("success", "Listing Deleted!");
  res.redirect(`/`);
};