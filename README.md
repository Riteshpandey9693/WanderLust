# 🏡 Wanderlust – Full-Stack Web Application Inspired by Airbnb

**Wanderlust** is a full-featured, full-stack travel listing web application inspired by Airbnb. It offers users the ability to explore, create, and manage property listings with a seamless authentication system, interactive maps, and rich UI — all built using the **MERN stack**, **EJS**, and third-party integrations.

🔗 **Live Demo:** [https://wanderlust-1-cg2z.onrender.com/](https://wanderlust-1-cg2z.onrender.com/)

---

## 🌐 Tech Stack & Tools

### 🔧 Backend
- **Node.js** – JavaScript runtime for building scalable network applications
- **Express.js** – Web framework for handling routing and middleware
- **MongoDB** – NoSQL database for storing user and listing data
- **Mongoose** – ODM for MongoDB and Node.js

### 🔐 Authentication & Security
- **Passport.js** – Authentication middleware (local, Google, Facebook)
- **Passport-Local-Mongoose** – Simplified local strategy integration with Mongoose
- **OAuth2.0** – Secure social login via Google & Facebook
- **Dotenv** – Manage environment variables securely
- **Cookie-Parser** – Parse cookies for session management

### 📦 Other Dependencies
- **Cloudinary** – Image upload and cloud storage
- **Multer** – Middleware for file upload handling
- **Mapbox** – Interactive maps for location tagging
- **Connect-Flash** – Display flash messages for feedback
- **Connect-Mongo** – MongoDB session storage for Express
- **Joi** – Schema validation for user inputs

### 🎨 Frontend
- **EJS** – Embedded JavaScript templating for dynamic UI rendering

---

## ✨ Key Features

- 🔐 **User Authentication**: Register, Login, Logout
- ✍️ **CRUD Listings**: Add, edit, and delete property listings
- 💬 **Review System**: Add and delete reviews for listings
- 👤 **User Profiles**: View and manage profile, account info, and password
- 🔒 **Data Security**: Password hashing and environment-level protection
- 🗺️ **Interactive Maps**: Integrated with Mapbox for geolocation
- 🔁 **Social Logins**: Login with Google or Facebook
- 📧 **Email Login Support**: Standard email/password authentication
- 🖼️ **Cloud Storage**: Securely upload and store images via Cloudinary

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/akashdeep023/Airbnb_Project.git
cd Airbnb_Project
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following keys:

```env
# Cloudinary
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Mapbox
MAP_TOKEN=your_mapbox_access_token

# MongoDB Atlas
ATLASDB_URL=your_mongodb_connection_string

# Session Secret
SECRET=your_random_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8080/auth/google/callback

# Facebook OAuth
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
FACEBOOK_CALLBACK_URL=http://localhost:8080/auth/facebook/callback
```

> Replace the placeholder values with your actual API credentials and tokens.

### 4. Run the Server

```bash
node app.js
```

### 5. Visit the App

Open [http://localhost:8080/listings](http://localhost:8080/listings) in your browser to start using the app.

---

## 🚧 Challenges Faced

Building Wanderlust came with its own set of challenges, including:

* Handling session-based authentication across multiple strategies
* Validating and sanitizing user input securely
* Ensuring consistent data storage and file handling
* Managing environment-specific credentials for third-party services

Each of these was addressed with modular design and robust middleware to ensure security, scalability, and performance.

---

## 🙏 Special Thanks

A heartfelt thank you to **Shradha Khapra** didi and **Aman Dhattarwal** bhaiya from **Apna College** for their unwavering support, mentorship, and encouragement. Your guidance has played a pivotal role in shaping this project.

---

## 👨‍💻 Author

**Ritesh Kumar Pandey**
📧 Email: [pandeyritesh9693@gmail.com](mailto:pandeyritesh9693@gmail.com)
🔗 LinkedIn: [ritesh-kumar-pandey](https://www.linkedin.com/in/riteshkumarpandey9693/)

---

## 💬 Feedback

Thanks for visiting **Wanderlust**!
If you have suggestions, ideas, or spot any issues, feel free to [open an issue](https://github.com/akashdeep023/Airbnb_Project/issues) or connect with me directly.

---

**Built with ❤️ by Ritesh using MongoDB, Express, Node.js,and EJS.**
