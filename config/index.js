const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const config = {
  mongoUrl:
    process.env.NODE_ENV !== "production"
      ? process.env.ATLASDB_URL
      : process.env.ATLASDB_URL, // Use the same for now

  googleCallbackUrl:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3000/auth/google/callback"
      : "https://wanderlust-6nid.onrender.com/auth/google/callback",
};

module.exports = config;
