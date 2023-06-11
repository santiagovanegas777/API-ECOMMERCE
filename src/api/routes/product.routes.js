const express = require('express');
const {getProducts, getProductsId, getTipe, getColor, getTemporate, sewNewProduct, updateProduct, deleteProduct} = require('../controllers/product.controller');
const router = express.Router();

router.get("/", getProducts)

router.get("/id/:id", getProductsId)

router.get("/tipo/:tipo", getTipe)

router.get("/color/:color",getColor)

router.get("/temporate/:temporada",getTemporate)

router.post("/",sewNewProduct)

router.put("/:id",updateProduct)

router.delete("/:id",deleteProduct)


module.exports = router;