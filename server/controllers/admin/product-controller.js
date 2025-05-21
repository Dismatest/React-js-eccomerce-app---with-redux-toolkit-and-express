const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");


const handleImageUpload = async (req, res) => {
    try{

        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = `data:${req.file.mimetype};base64,${b64}`;
        const result = await imageUploadUtil(url);

        res.json({
            success: true,
            message: 'Image uploaded successfully',
            result
        })
    }catch(error){
        res.json({
            success: false,
            message: 'Something went wrong'
        })
    }
}


//add a new product

const addProduct = async (req, res) => {
    try{

        const {image, title, description, category, brand, price, salePrice, totalStock} = req.body;

        const newProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock
        })

        await newProduct.save();
        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            data: newProduct
        })
        
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

//fetch all products

const fetchAllProducts = async (req, res) => {
        const listAllProducts = await Product.find({});
        res.status(200).json({
            success: true,
            message: 'All products fetched successfully',
            data: listAllProducts
        })
    try{

    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

//edit products

const editProduct = async (req, res) => {
    try{
        const {id} = req.params;
        const {image, title, description, category, brand, price, salePrice, totalStock} = req.body;

        const findProduct = await Product.findById(id);
        if(!findProduct) return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
        findProduct.image = image || findProduct.image;
        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price === '' ? 0 : price || findProduct.price;
        findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;

        await findProduct.save();
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: findProduct
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

//delete products

const deleteProduct = async (req, res) => {
    try{

        const {id} = req.params;
        const findProduct = await Product.findById(id);
        if(!findProduct) return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
        await findProduct.deleteOne();
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            data: findProduct
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}
module.exports = {
    handleImageUpload,
    addProduct,
    fetchAllProducts,
    editProduct,
    deleteProduct
}