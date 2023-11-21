const express = require('express');
const uploadRouter = express.Router();
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const destinationPath = path.join(__dirname, '../images');
        cb(null, destinationPath);
    },
    filename: function (req,file,cb){

        cb(null,new Date().toISOString().replace(/:/g,"-") + file.originalname);
    }
});

const upload = multer({storage: storage});
 

uploadRouter.post("/", upload.single("image"), (req, res, next) => {
    if (req.file) {
      res.status(200).json({ message: "Image uploaded" });
    } else {
        res.status(500).json({ message: "Upload failed" });
    }
  });




module.exports = uploadRouter;
