/* global require, module */
const express = require("express");
const router = express.Router();
var multer = require("multer");
var sharp = require("sharp");
const checkAuth = require("../middleware/check-auth");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage }).single("productImage");

router.post("/", checkAuth, upload, function (req, res, next) {
  const height = 50;
  const width = 50;
  sharp(req.file.path)
    .resize(height, width)
    .toFile("uploads/thumb_" + req.file.originalname, (err)=>{
      if(err)
      {
        res.status(500).json({
          error: err
        });
      }
      else
      {
        res.status(201).json({
          message: "Uploaded Image successfully",
          createdProduct: {
              productImage: req.file.path.replace("\\", "/")
          }
        });
      }
    });
});
module.exports = router;
