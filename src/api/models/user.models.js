const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {type:String, requied: true},
    password:{type:String, required: true},
    role:{type:String, default: "user", enum:["admin","user","consult"]},
    products : [{type: Schema.Types.ObjectId, ref:'product'}],
},{
    collection: "users"
})

const User = mongoose.model("users", UserSchema);
module.exports = User;