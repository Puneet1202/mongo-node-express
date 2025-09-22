const express = require('express');
const router = express.Router();
const fileUpload = require('../models/files.model');
const authMiddleware = require('../middlewares/authe');
const mongoose = require('mongoose');



const upload = require("../config/multer.config"); // yaha multer
const { supabaseAdmin, bucketName } = require("../config/supabase.config"); // yaha supabase


router.get('/',authMiddleware,(req,res)=>{
    res.render('home');
});


router.post('/upload-file', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No file uploaded");

    if (!req.user || !req.user.userId) {
      return res.status(400).send("User not found in request");
    }

    const fileName = `uploads/${Date.now()}-${req.file.originalname}`;

    // Supabase upload
    const { data, error } = await supabaseAdmin.storage
      .from(bucketName)
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true
      });

    if (error) {
      console.log("Supabase upload error:", error);
      throw error;
    }

    // Save file info to MongoDB 
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const newFile = new fileUpload({
      path: fileName,
      originalName: req.file.originalname,
      user: userId
    });

    await newFile.save();
    console.log("File saved to database:", newFile);

    // Public URL
    const { data: publicData } = supabaseAdmin.storage
      .from(bucketName)
      .getPublicUrl(fileName);
    console.log("Public URL:", publicData.publicUrl);

    res.json({ message: "File uploaded successfully", url: publicData.publicUrl });

  } catch (err) {
    console.error(err);
    res.status(500).send("Upload failed");
  }
});





module.exports = router;