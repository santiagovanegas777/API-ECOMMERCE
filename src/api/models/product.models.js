const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        tipo: {type: String, required: true},
        color: {type: String, required: false},
        stock: {type: Number, required: false},
      temporada: {type: String, required: false}
    },{
        
        collection: "product"
    }
)

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;
