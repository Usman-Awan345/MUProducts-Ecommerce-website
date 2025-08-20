

import {v2 as cloudinary} from 'cloudinary';
import productModel from './../models/productModel.js';

//Fuction for a Add product
const addProduct=async(req, res) => {
    try {
        const{name, description, price, category, subCategory, sizes, popular } = req.body

        //Extracting image if provided
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        const images =[image1, image2,image3,image4].filter((item)=>item !== undefined)

        //upload images to cloudinary or use a default image
         let imageUrl;
         if(images.length > 0) {
            imageUrl = await Promise.all(
                images.map(async(item)=>{
                    const result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
                    return result.secure_url
                })
            )
         }else{
            //Default image url if no image provided
            imageUrl = ["https:via.placeholder.com/150"]
         }

         const productData ={
            name,
            description,
            price:Number(price),
            category,
            subCategory,
            sizes:sizes ? JSON.parse(sizes):[],
            popular:popular === "true" ? true : false,
            image: imageUrl,
            date: Date.now()
         }

         console.log(productData)
         const product= new productModel(productData)

         await product.save()
         res.status(201).json({message: 'Product added successfully'})
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false, message: error.message})
    }
}


//Fuction for a Add product
// Controller function for removing a product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};




//Fuction for a Add product
// Controller function for single product details
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



//Fuction for a Add product
const listProduct = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await productModel.find();

        // If no products found
        if (products.length === 0) {
            return res.status(404).json({ success: false, message: "No products found" });
        }

        // Send the list of products
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export {addProduct, removeProduct, singleProduct, listProduct}