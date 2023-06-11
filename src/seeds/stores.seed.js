const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Store = require('../api/models/store.model');
dotenv.config();

const arraystores = [
    {
      name: 'Store UUEE',
      city: 'California U.S.A',
      stock: 10003,
   
    },
    {
      name: 'SuperMall',
      city: 'Toronto canada',
      stock: 10003,
  
    },
    {
      name: 'Polonia Store',
      city: 'Polonia',
      stock: 10003,
      
    },
    {
      name: 'Senegal Store',
      city: 'Oporto',
      stock: 10003,
      
    },
    {
      name: 'Superated Store',
      city: 'Florida uuee',
      stock: 10003,
      
    },
    {
      name: '5000M Store',
      city: 'Pereira Colombia',
      stock: 10003,
    
    },
  ];

mongoose.connect(process.env.DB_URL)
.then(async () => {
    const allStores = await Store.find();
    if(allStores.length > 0){
        await Store.collection.drop()
        console.log("stores borrados")
    }
})
.catch((error) => console.log(`error borrando stores: ${error}`))
.then(async() => {
    const storesMap = arraystores.map(store => new Store(store));
    await Store.insertMany(storesMap);
    console.log("stores insertados")
})
.catch((error) => console.log(`error insertando stores: ${error}`))
.finally(()=>mongoose.disconnect());