const mongoose = require("mongoose");

const addToCartSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    product_id:{
        type:mongoose.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{
        type:Number,
        default:1
    }
},
{timestamps:true}
)

module.exports = mongoose.model("Cart",addToCartSchema)