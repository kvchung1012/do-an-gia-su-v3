const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dbdabvqrg",
  api_key: "755664135723329",
  api_secret: "GTx8dvt0xMp197IS0VbJmcw6Ls0",
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png", "mp3", "mp4", "pdf", "svg"],
  params: {
    folder: "doan_giasu",
    resource_type: "auto",
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
