const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinary");


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'AaradhyaPhotos',
      format: async (req, file) => 'jpeg', // ✅ fix: param should be `(req, file)`
      public_id: (req, file) => Date.now() + '-' + file.originalname // ✅ fix: use `file.originalname`
    }
  });
  
  const upload = multer({ storage: storage }) // Accept up to 10 files


  module.exports = upload