const express = require('express');

const router = express.Router();

const Video = require('../models/video.model');

//get all videos
router.get("/list", (req, res, next) => {  
  Video.find({})
    .exec(function (err, videos) {
      if (err) {
        res.json({         
          message: 'error retrieving videos',
          code: 1
        });       
      } else {
        res.json({
          items: videos,
          message: 'Video get success',
          code: 0
        });
      }
    });
});

//get single video
router.get("/:id", (req, res, next) => {
  console.log("Get request for a single video");
  Video.findById(req.params.id)
    .exec(function (err, video) {
      if (err) {
        res.send("error retrieving video");
      } else {
        res.json(video);
      }
    });
});

//create video
router.post("/create", (req, res, next) => {
  console.log("Post a video");
  var newVideo = new Video({
    title: req.body.title,
    url: req.body.url,
    description: req.body.description
  });
  newVideo.save(function (err, insertedVideo) {    
    if (err) {
      res.send("error saving videos");
    } else {
      res.json(insertedVideo);
    }
  });
});

//update video
router.put("/update/:id", function (req, res) {  
  Video.findByIdAndUpdate(req.params.id,
    {
      $set: { title: req.body.title, url: req.body.url, description: req.body.description }
    },
    { new: true },
    function (err, updatedVideo) {
      if (err) {
        res.send("Error updating video");
      } else {
        res.json(updatedVideo);
      }
    }
  );
});

//delete video
router.delete("/delete/:id", function (req, res) {
  console.log("Deleting a video");
  Video.findByIdAndRemove(req.params.id, function (err, deleteVideo) {
    if (err) {
      res.send("Error deleting video");
    } else {
      res.json(deleteVideo);
    }
  }
  );
});

module.exports = router;           
