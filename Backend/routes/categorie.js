//create RESTfull APIs using Express JS Routes
const express = require('express');
const Categorie = require('../models/categorie.model');
const router= express.Router();

//Create categorie
router.post("/create", (req,res,next) => {
    const categorie = new Categorie({
        title: req.body.title,
        content: req.body.content
    });
    categorie.save().
    then(createdResult => {
        console.log(createdResult);
        if (createdResult) {
          res.status(201).json({
            code: 0,
            messaggio: "Categorie added succesfully ",
            categorie: createdResult  //categorieId: createdResult._id            
          });
        }
    }).catch(e => {
        console.log(e);
    });
});
/*
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
*/
//Read categorie
router.get("/list",(req, res,next) => {
    Categorie.find().then(categorie => {
        if(categorie){
            res.status(200).json({
                code:0,
                message:"Categorie fetched successfully",
                data: categorie
            })
        }
    }).catch(e => {
        console.log(e);
    });
});

//update categorie
router.put("/update/:id", (req,res,next) => {
    const categorie = new Categorie({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Categorie.updateOne({_id: req.params.id} , categorie).then(result => {
        if(result){
            res.status(200).json({message:"Update successfully !"});
        }else{
            res.status(500).json({message:"Error updating categorie "});
        }
    }).catch(e => {
        console.log(e);
    });
});

//delete categorie
router.delete("/delete/:id", (req,res,next) => {
    Categorie.deleteOne({_id: req.params.id}).then(result => {
        if(result){
            res.status(200).json({message:"Deleting successfully !"});
        }else{
            res.status(401).json({message: "Not authorized!"});
        }
    });
});

module.exports = router;