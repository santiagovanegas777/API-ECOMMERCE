const express = require('express');
const {getProducts, getProductsId, getTipe, getColor, getTemporate, sewNewProduct, updateProduct, deleteProduct,sewNewProductMultiImage} = require('../controllers/product.controller');
const router = express.Router();
const upload = require('../../middlewares/upload.file');
router.get("/", getProducts)

router.get("/id/:id", getProductsId)

router.get("/tipo/:tipo", getTipe)

router.get("/color/:color",getColor)

router.get("/temporate/:temporada",getTemporate)

router.post("/",upload.single("image"),sewNewProduct)

router.post("/multiImage",upload.fields([{name: 'image'}, {name: 'image2'}]),sewNewProductMultiImage)

router.put("/:id",updateProduct)

router.delete("/:id",deleteProduct)


module.exports = router;