const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const storesSchema = new Schema(
    {
        name:{type:String, required:true},
        city:{type:String, required:true},
        stock:{type:Number, required:true},
      

    },
    {
        collection:"store",
    }
);

const Store = mongoose.model('store',storesSchema);
module.exports = Store;