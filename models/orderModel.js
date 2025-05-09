const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[
      {  
        product_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        quantity:{
            type:Number
    }
}
    ]
});

module.exports = mongoose.model("Order",orderSchema)