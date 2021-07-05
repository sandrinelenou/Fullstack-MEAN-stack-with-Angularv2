//create RESTfull APIs using Express JS Routes
const express = require('express');
const Product = require('../models/product.model');
const router= express.Router();


//create product good
router.post("/create", (req,res,next) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });
    product.save().
    then(product => {
        if(product){
            res.status(201).json({
                code: 0 ,
                message: "Product added succesfully",
                product: product                  //{...product, id: product._id }
            })
        }
    }).
    catch(err =>  {
        console.log(e);
    });
});

//read all product good
router.get("/list", (req,res,next) => {
    Product.find().then(product => {
        if(product){
            res.status(200).json({
                code:0 ,
                message: "Products fectched successfully",
                products: product
            });
        }
    })
    .catch(e => {
        console.log(e);
    });
 });


 
//get a single product good
router.get("/:id", (req, res, next) => {  
    try {
      Product.findById(req.params.id)
        .exec(function (err, product) {
          if (err) {
            res.status(200).json({
              code: 1,
              message: 'Error retrieving product'
            });         
          } else {
            res.status(200).json({
              code: 0,
              message: 'Data retrived',
              data: product
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
  });

 //update product good
 router.put("/update/:id", (req,res,next) => {
     const product = new Product({
         _id: req.params.id,
         name: req.body.name,
         description: req.body.description,
         price: req.body.price
     });
     Product.updateOne({ _id: req.params.id}, product).
     then(result => {
         if(result){
            res.status(200).json({
                code: 0,
                message: "Update successfully" ,
                 data: product
            });
         }else{
             res.status(500).json({
                 code:1,
                 message: "Error updating product"
             });
         }         
     });
 });


 //delete post good
 router.delete("/delete/:id", (req,res,next) => {
     Product.deleteOne({ _id: req.params.id }).then(result => {
        if (!result) {
            res.status(200).json({
              code: 1,
              message: "Product was not deleted!"
            });
          }
          res.status(200).json({
            code:0 ,
            message: "Product deleted!"
          });
        });
     //});
 });

 module.exports = router; 