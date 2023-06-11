const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const routerProducts = require('./src/api/routes/product.routes');
const userRoutes = require("./src/api/routes/user.routes");
const userStores = require("./src/api/routes/store.routes");
const {connect}  = require('./src/utils/db');
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,

});


const app = express();
const PORT = process.env.PORT || 5000;
connect();
app.use(cors());
app.use(express.json());

app.use("/products", routerProducts);
app.use("/users", userRoutes);
app.use("/stores",userStores)

app.listen(PORT, () => console.log('server listening on port', PORT));