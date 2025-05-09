const Cart = require("../models/addToCartModel");
const  Product = require("../models/productModel")


//Add to Cart
const addToCart = async(req,res)=>{
    try {
        const {product_id, quantity} = req.body;
        const userId = req.user.id;
        
        const product = await Product.findById(product_id);
        if(!product){
            return res.status(404).json({
                message:"Product not found"
            });
        }

        let cartItem = await Cart.findOne({ user_id: userId, product_id });

        if(cartItem){
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await Cart.create({
                user_id: userId,
                product_id,
                quantity
            });
        }

        return res.status(200).json({
            message: "Product added to your cart",
            cartItem
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//View all carts
const viewAllCart = async(req,res)=>{
    try {
        const userId = req.user.id
        const allCarts = await Cart.find({user_id:userId}).populate("user_id").populate("product_id");
        if(allCarts.length == 0){
            return res.status(403).json({
                message:"No item find in your cart"
            });
        }

        return res.status(200).json({
            message:"Your Cart Products",
            allCarts
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

// Remove form carts
const removeCart = async(req,res)=>{
    try {
        const userId = req.user.id
        const cartId = req.params.id

        const cartItem = await Cart.findOne({user_id:userId, _id:cartId});
        if(!cartItem){
            return res.status(404).json({
                message:"Cart Iteam not found"
            });
        }

        await Cart.findByIdAndDelete(
            cartItem
        )

        return res.status(200).json({
            message:"Cart item delete Successfully",
            cartItem
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


//Show All carts on admin deashboard with user & product details
const showAllCart = async(req,res)=>{
    try {
        
        const allCarts = await Cart.find().populate("user_id").populate("product_id");

        if(allCarts.length == 0){
            return res.status(404).json({
                message:"No cart found"
            });
        }

        return res.status(200).json({
            message:"All Cart fatched successfully",
            allCarts
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}
module.exports = {addToCart,viewAllCart,removeCart,showAllCart}