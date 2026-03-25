const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (file.fieldname === "profileImage") {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Profile photo must be an image"));
    }
    return cb(null, true);
  }

  if (file.fieldname === "resume") {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Resume must be a PDF"));
    }
    return cb(null, true);
  }

  cb(null, false);
};

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
});
