const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    link: { type: String, default: "" },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    bio: { type: String, default: "" },
    contact: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    socialLinks: {
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      portfolio: { type: String, default: "" },
    },
    profileImage: { type: String, default: "" },
    resume: { type: String, default: "" },
    skills: [{ type: String }],
    projects: [projectSchema],
    education: [{ type: String }],
    experience: [{ type: String }],
    certifications: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
