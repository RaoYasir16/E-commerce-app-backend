const Category = require("../models/categoryModel")


//Add Category 
const addCategory = async(req,res)=>{
    try {
        const {category_name} = req.body
        if(!category_name){
            return res.status(403).json({
                message:"Category Name require"
            });
        }

        const existingCategory = await Category.findOne({category_name});
        if(existingCategory){
            return res.status(409).json({
                message:"Category Already Exist"
            });
        }

        const category = await Category.create({
            category_name,
        });

        return res.status(200).json({
            message:"Category Created Successfully",
            category
        });

    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

//Get all Category
const getAllCategory = async(req,res)=>{
    try {
        const allCategory = await Category.find();
        if(allCategory.length == 0){
            return res.status(404).json({
                message:"No category found"
            })
        }
        return res.status(200).json({
            message:"All Category Fatched Successfylly",
            allCategory
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

//Get single Category
const getSingleCategory = async(req,res)=>{
    try {
        const categoryId = req.params.id 
        const category = await Category.findById(categoryId);
        if(!category){
            return res.status(403).json({
                message:"No Category Founds"
            })
        }
        const {_id,category_name} = category

        return res.status(200).json({
            message:"Category Fatched",
            category:{
                _id,
                category_name
            }
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

//Update Category by ID
const updateCategory = async(req,res)=>{
    try {
        const categoryId = req.params.id

        const category = await Category.findById(categoryId);
        if(!category){
            return res.status(403).json({
                message:"Category Not Found"
            });
        }

        const updateCategory = await Category.findByIdAndUpdate(
            categoryId,
            req.body,
            {new:true}
        );

        const {_id, category_name} = updateCategory

        return res.status(200).json({
            message:"Category Updated Successfully",
            updated:{
                _id,
                category_name
            }
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

//Delete Category by ID
const deleteCategory = async(req,res)=>{
    try {
        const categoryId = req.params.id

        const category = await Category.findById(categoryId);
        if(!category){
            return res.status(403).json({
                message:"Category Not Found"
            });
        }

        await Category.findByIdAndDelete(
            categoryId
        );

        return res.status(200).json({
            message:"Category Deleted Successfully",
            category
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}
module.exports = {addCategory,getAllCategory,getSingleCategory,updateCategory,deleteCategory}