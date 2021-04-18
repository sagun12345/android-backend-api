const mongoose = require("mongoose");

const Shoes = new mongoose.Schema(
    {
        name:{
            type: String,
           
            trim: true
        },
        size:{
            type: Number,
           
        },
        price:{
            type: String,
            
            trim: true
        },
        address:{
            type: String,
          
            trim: true
        },
        company:{
            type: String,
           
            trim: true
        },
        photo: {
            type: String,
            default: "no-photo.jpg",
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
    }
);

module.exports = mongoose.model("Shoes",Shoes);
