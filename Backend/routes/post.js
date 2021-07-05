//create RESTfull APIs using Express JS Routes
const express = require('express');
const router= express.Router();
const Post = require("../models/post.model");

//create post good
router.post("/create", (req,res,next) => {
    const post = new Post({
        title: req.body.title,
        content:req.body.content,
    });
    post.save().
    then(post => {
        if(post){
            res.status(201).json({
                code: 0 ,
                message: "Post added succesfully",
                post: post                  //{...post, id: post._id }
            })
        }
    }).
    catch(err =>  {
        console.log(e);
    });
});

//read all post good
router.get("/list", (req,res,next) => {
    Post.find().then(post => {
        if(post){
            res.status(200).json({
                code:0 ,
                message: "Posts fectched successfully",
                posts :post
            });
        }
    })
    .catch(e => {
        console.log(e);
    });
 });

 
//get a single post good
router.get("/:id", (req, res, next) => {  
    try {
      Post.findById(req.params.id)
        .exec(function (err, post) {
          if (err) {
            res.status(200).json({
              code: 1,
              message: 'Error retrieving post--'
            });         
          } else {
            res.status(200).json({
              code: 0,
              message: 'Data retrived',
              data: post
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
  });

 //update post good
 router.put("/update/:id", (req,res,next) => {
     const post = new Post({
         _id: req.params.id,
         title: req.body.title,
         content: req.body.content
     });
     Post.updateOne({ _id: req.params.id}, post).
     then(result => {
         if(result){
            res.status(200).json({
                code: 0,
                message: "Update successfully" ,
                 data: post
            });
         }else{
             res.status(500).json({
                 code:1,
                 message: "Error updating Post"
             });
         }         
     });
 });


 //delete post good
 router.delete("/delete/:id", (req,res,next) => {
     Post.deleteOne({ _id: req.params.id }).then(result => {
        if (!result) {
            res.status(200).json({
              code: 1,
              message: "Post was not deleted!"
            });
          }
          res.status(200).json({
            code:0 ,
            message: "Post deleted!"
          });
        });
     //});
 });

 module.exports = router; 