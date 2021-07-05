const mongoose= require('mongoose');

const url = "mongodb://localhost:27017/test";

let mong = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(!err){
        console.log('MongoDB connection Succeeded');
    }else{
        console.log('Error in DB connection: ' + err);
    }
});