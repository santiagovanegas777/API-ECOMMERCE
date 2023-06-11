const express = require('express');
const dotenv = require('dotenv');
const routerProducts = require('./src/api/routes/product.routes');
const userRoutes = require("./src/api/routes/user.routes");
const userStores = require("./src/api/routes/store.routes");
dotenv.config();
const {connect}  = require('./src/utils/db');

const app = express();
const PORT = process.env.PORT || 5000;
connect();
app.use(express.json());

app.use("/products", routerProducts);
app.use("/users", userRoutes);
app.use("/stores",userStores)

app.listen(PORT, () => console.log('server listening on port', PORT));