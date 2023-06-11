const express = require('express');
const router= express.Router();

const {getAllStores, updateStore, deleteStore , newStore} = require("../controllers/store.controller");

 
router.get("/",getAllStores);

router.post("/",newStore);
router.put("/:id",updateStore);
router.delete("/:id", deleteStore);


module.exports = router;