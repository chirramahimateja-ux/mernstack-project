require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/github", require("./routes/githubRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use((err, _req, res, _next) => {
  if (err) {
    return res.status(400).json({ message: err.message || "Request failed" });
  }
  return res.status(500).json({ message: "Unexpected server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
