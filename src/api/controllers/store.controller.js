const Store = require("../models/store.model");

const getAllStores = async (req, res) =>{
    try {
        const allStores = await Store.find();
        return res.status(200).json(allStores);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const newStore = async (req, res) =>{
    try {
        const newStore = new Store(req.body);
        const createdStore = await newStore.save();
        return res.status(200).json(createdStore);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const updateStore = async (req, res) =>{
    try {
        const {id} = req.params;
        const putStore = new Store(req.body);
        putStore._id = id;
        const updateStore = await Store.findByIdAndUpdate(id,putStore,{
            new:true,
        })
        return res.status(200).json(updateStore);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const deleteStore = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteStor = await Store.findByIdAndDelete(id);
        if(!deleteStor){
            return res.status(200).json({message: 'Store no encontrado'})
        }
        return res.status(200).json(deleteStor);
    } catch (error) {
        return res.status(500).json(error);
    }
}



module.exports ={getAllStores, newStore, updateStore,deleteStore};