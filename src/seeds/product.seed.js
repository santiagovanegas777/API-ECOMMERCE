const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../api/models/product.models');
dotenv.config();

const arrayproducts = [
    {
      tipo: 'Camisa',
      color: 'Rosa',
      stock: 199,
      temporada: 'Verano',
    },
    {
      tipo: 'Pantalon',
      color: 'Negro',
      stock: 200,
      temporada: 'Otoño',
    },
    {
      tipo: 'Sudadera',
      color: 'Blando',
      stock: 203,
      temporada: 'Invierno',
    },
    {
      tipo: 'Zapato',
      color: 'Amarillo',
      stock: 206,
      temporada: 'Verano',
    },
    {
      tipo: 'Zapatilla',
      color: 'Gris',
      stock: 214,
      temporada: 'Invierno',
    },
    {
      tipo: 'Gorro',
      color: 'Morado',
      stock: 24,
      temporada: 'Primavera',
    },
  ];

mongoose.connect(process.env.DB_URL)
.then(async () => {
    const allProducts = await Product.find();
    if(allProducts.length > 0){
        await Product.collection.drop()
        console.log("Products borrados")
    }
})
.catch((error) => console.log(`error borrando Products: ${error}`))
.then(async() => {
    const productsMap = arrayproducts.map(product => new Product(product));
    await Product.insertMany(productsMap);
    console.log("Products insertados")
})
.catch((error) => console.log(`error insertando Products: ${error}`))
.finally(()=>mongoose.disconnect());