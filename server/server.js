require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./src/routes");
const dbConnect = require("./src/config/dbConfig");
const PORT = process.env.PORT || 3000;
const fileUpload = require("express-fileupload");

// Database Connection
dbConnect();

// Express and Middleware
console.log("Starting server...");
console.log("Environment variables loaded:", Object.keys(process.env));

app.use(express.json()); // req.body থেকে JSON Data পড়ার জন্য ব্যবহৃত হয়।
app.use(express.urlencoded({ extended: true })); // req.body থেকে Form Data পড়ার জন্য ব্যবহৃত হয়।
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://socialweb.devsramen.com"
];

// Safely add env var if it exists
if (process && process.env && process.env.CLIENT_URL) {
  const clientUrl = process.env.CLIENT_URL.replace(/\/$/, "");
  if (!allowedOrigins.includes(clientUrl)) {
    allowedOrigins.push(clientUrl);
  }
}

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// File upload using express file upload
app.use(
  fileUpload({
    useTempFiles: true,
    // tempFileDir: "/tmp/",
  })
);
app.use(router);

app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
