const mongoose = require("mongoose");

const addToCartSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    product_id:{
        type:mongoose.Types.ObjectId
    }
})

module.exports = mongoose.model("Cart",addToCartSchema)