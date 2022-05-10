import path from "path";
import fs from "fs-extra";
import multer from "multer";
import asyncHandler from "express-async-handler";
import express from "express";
const router = express.Router();

// To set the storage info (such as destination and file name)
// used in "upload" function
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// To check file type
// used in "upload" function
const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(null, false);
  }
};

// Here file is uploaded
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// @desc    To upload image
// @route   GET api/v1/upload
// @access  Public
router.post(
  "/",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    // After successful upload (send the file path)
    if (!req.file) {
      res.status(400);
      throw new Error(
        "No file received or invalid image file type! Image type must be one of the following (jpg|jpeg|png)"
      );
    }
    res.send(`/${req.file.path.replace("\\", "/")}`);
  })
);

// @desc    To delete uploaded image
// @route   GET api/v1/upload/delete
// @access  Public
router.post(
  "/delete",
  asyncHandler(async (req, res) => {
    try {
      const filePath = req.body.imagePath;

      const file = filePath.substring(
        filePath.lastIndexOf("/") + 1,
        filePath.length
      );

      await fs.remove(`uploads/${file}`);

      res.json("File deleted successfully!");
    } catch (err) {
      throw new Error("Error occured while trying to delete the image!");
    }
  })
);

export default router;
