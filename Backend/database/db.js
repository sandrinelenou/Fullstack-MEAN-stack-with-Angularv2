const mongoose= require('mongoose');

const url = "mongodb://127.0.0.1:27017/admin";

let mong = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(!err){
        console.log('MongoDB connection Succeeded');
    }else{
        console.log('Error in DB connection: ' + err);
    }
});