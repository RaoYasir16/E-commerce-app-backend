const Order = require("../models/orderModel");
const Cart = require("../models/addToCartModel");


// Place order
const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { product_id } = req.body;

    
        const cartItem = await Cart.findOne({ user_id: userId, product_id }).populate("product_id");

        if (!cartItem) {
            return res.status(404).json({
                message: "Product not found in your cart"
            });
        }

        const order = await Order.create({
            user_id: userId,
            products: [{
                product_id: cartItem.product_id._id,
                quantity: cartItem.quantity
            }]
        });

        
        await Cart.deleteOne({ user_id: userId, product_id });

        return res.status(200).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


//Get only our orders
const myOrder = async(req,res)=>{
    try {
        const userId = req.user.id

        const order = await Order.find({user_id:userId}).populate("products.product_id");

        if(order.length == 0){
            return res.status(404).json({
                message:"No order found"
            });
        }


        const formattedOrders = order.map(order => ({
            orderId: order._id,
            products: order.products.map(item => ({
                name: item.product_id.product_name,
                price: item.product_id.price,
                quantity: item.quantity,
                image: item.product_id.image_path
            }))
        }));
        return res.status(200).json({
            message:"Order Fatch successfully",
            order:formattedOrders
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
};


//Show all order on admin deashboard
const showAllOrders = async(req,res)=>{
    try {

        let page = Number(req.query.page) || 1
        let limit =Number(req.query.limit) || 5
        let skip = (page - 1)*limit


        const allOrder = await Order.find()
        .skip(skip)
        .limit(limit).populate("user_id")
        .populate("products.product_id");

        if(allOrder.length == 0){
            return res.status(404).json({
                message:"No order found"
            });
        }

        return res.status(200).json({
            message:"All order fatch successfully",
            allOrder
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
};

module.exports = {placeOrder,myOrder,showAllOrders}