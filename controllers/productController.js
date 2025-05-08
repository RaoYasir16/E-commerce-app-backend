const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const path = require('path');
const fs = require('fs');

//Add Porduct against  Category
const AddPorduct = async(req, res)=>{
    try { 
        const category = await Category.findById(req.params.id);
        if(!category){
            return res.status(403).json({
                message:"Category Not Exist. First add category"
            })
        }
        const {product_name,price,description,} = req.body
        const image_path = `${process.env.HOST_URL}/uploads/${req.file.filename}`;
        

        if(!product_name |!price |!description |!image_path){
            return res.status(400).json({
                message:"All fields are require"
            })
        }

        const product = await Product.create({
            category_id:category._id,
            product_name,
            price,
            description,
            image_path
        });

        return res.status(200).json({
            message:"Product add successfully",
            product
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

//Get All Products against Category
const getAllProducts = async(req,res)=>{
   try {
    const categoryId = req.params.id

    const existingCategory = await Category.findById(categoryId);
    if(!existingCategory){
        return res.status(403).json({
            message:"Category Not Exist. First Add Category"
        });
    }

    const products = await Product.find({category_id:existingCategory._id});
    if(products.length === 0){
        return res.status(402).json({
            message:"No product found related to This category"
        })
    }

    return res.status(200).json({
        message:"Product Fetch successfully",
        products
    })
   } catch (error) {
    return res.status(500).json({
        message:error.message
    })
   }
}

//Single Porduct fatch
const getSingleProduct = async(req,res)=>{
    try {
        const productId = req.params.id
        const product = await Product.findById(productId);
        if(!product){
            return res.status(400).json({
                message:"Product not Found"
            });
        }

        return res.status(200).json({
            message:"product fetch successfully",
            product
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}
//Get all Porducts
const getProducts = async(req,res)=>{
    try {
        const allPorducts = await Product.find();
        if(allPorducts.length == 0){
            return res.status(401).json({
                message:"No Products Found. First add your Products"
            });
        }

        return res.status(200).json({
            message:"All Porducts fetch successfully",
            allPorducts
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

//Update Product 
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (req.file) {
            if (product.image_path) {
                    const imageFileName = product.image_path.split('/uploads/')[1];
                    const oldImagePath = path.join(__dirname, '..', 'uploads', imageFileName);
                
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath); 
                    }
            }

            updateData.image_path = `${process.env.HOST_URL}/uploads/${req.file.filename}`;
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

        return res.status(200).json({
            message: "Product Updated Successfully",
            product: updatedProduct
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


//Delete Product
const deleteProduct = async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                message:"Product Not Find"
            });
        }

        if(product.image_path){
            const imageFileName = product.image_path.split('/uploads/')[1];
            const imagePath = path.join(__dirname,"",'uploads',imageFileName);

            if(fs.existsSync(imagePath)){
                fs.unlinkSync(imagePath)
            }
        }

        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message:"Product deleted successfully",
            product
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}
module.exports ={AddPorduct,getAllProducts,getSingleProduct,getProducts,updateProduct,deleteProduct}