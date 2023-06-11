const Product = require('../models/product.models');



const getProducts = async(req, res) => {
   try {
        const allProducts = await Product.find()
        return res.status(200).json(allProducts)
   } catch (error) {
        return res.status(500).json(error) 
   }
};

const getProductsId = async(req, res) => {
    try {
      const {id} = req.params
    //   const movieId = await Movie.findById({id})
    //   return res.status(200).json(movieId)
    const product = await Product.findById(id);
    if (product) {
        return res.status(200).json(product);
    } else {
        return res.status(404).json('No product found by this id');
    }
    } catch (error) {
        return res.status(500).json(error)
    }
};

const getTipe = async(req, res) => {
    
      
      try {
        const {tipo} = req.params
		const productByTipo = await Product.find({ tipo });
		return res.status(200).json(productByTipo);
	} catch (err) {
		return res.status(500).json(err);
	}
};
   
const getColor = async(req, res) =>{

    try {
        const {color} = req.params
        const productColor = await Product.find({color});
        return res.status(200).json(productColor);
        
    } catch (error) {
        return res.status(500).json(err);
    }
};

const getTemporate = async (req, res) =>{
try {
    const {temporada} = req.params
    const productsTemporate = await Product.find({temporada});
    return res.status(200).json(productsTemporate);
} catch (error) {
    return res.status(500).json(err);
}
};

const sewNewProduct = async (req, res)=>{
    try {
        
        console.log(req.file.path);
        const newProduct = new Product(req.body);

        if(req.file.path){
            newProduct.image= req.file.path;
        }
        const createProduct = await newProduct.save();
        return res.status(200).json(createProduct);
    } catch (error) {
        return res.status(500).json(err);
    }
};

const  sewNewProductMultiImage = async (req, res)=>{
    try {
        console.log(req.files);
        const newProduct = new Product(req.body);
        
        if(req.files.image){
           newProduct.image= req.files.image[0].path;
        }
        if(req.files.image2){
            newProduct.image2= req.files.image2[0].path;
        }
        const createProduct = await newProduct.save();
        return res.status(200).json(createProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const updateProduct = async (req, res) =>{
     try {
        const {id} = req.params;
        const putProduct = new Product(req.body);
        putProduct._id = id;
        const updateProduct = await Product.findByIdAndUpdate(id,putProduct,{
            new:true,
        });
        return res.status(200).json(updateProduct);
     } catch (error) {
        return res.status(500).json(err);
     }
};

const  deleteProduct =  async (req,res)=>{
    try {
        const {id} = req.params;
        const deleteProducts = await Product.findByIdAndDelete(id);
        if(!deleteProducts){
            return res.status(404).json({message:'Producto no encontrado'});
        }
        return res.status(200).json(deleteProducts);
    } catch (error) {
        return res.status(500).json(err);
    }
}


module.exports = {getProducts, getProductsId, getTipe, getColor, getTemporate, sewNewProduct,sewNewProductMultiImage, updateProduct, deleteProduct};