const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const {validatePassword, validateEmail,usedEmail} = require("../../utils/validators");

const { generateSign } = require("../../utils/jwt");

const login= async (req, res)=>{
    try {
     const userInfo = await User.findOne({email:req.body.email});
     if(!userInfo) {
        return res.status(400).json({message:"El email es invalido"});
     }
     if(!bcrypt.compareSync(req.body.password, userInfo.password)){
        return res.status(400).json({message:"La contraseña es incorrecta"});
     }      

     const token = generateSign(userInfo.id,userInfo.email);
     console.log(token);
     return res.status(200).json({token, userInfo});
    } catch (error) {
        return res.status(500).json(error);
    }
};


const register = async (req, res) =>{
    try {
        const newUser = new User(req.body);
        if(!validatePassword(newUser.password)){
            return res.status(400).json({
                message:"Contraseña incorrecta"
            });
        }
        if(!validateEmail(newUser.email)) {
            return res.status(400).json({
                message:"Email no tiene formato correcto"
            });
        }
        if((await usedEmail(newUser.email))>0){
            return res.status(400).json({message:"El email ya existe"})
        }
        newUser.password = bcrypt.hashSync(newUser.password, 10);
        const createdUser = await newUser.save();
        return res.status(200).json(createdUser);

    } catch (error) {
        return res.status(500).json(error);
    }
};

const checkSeccion = async(req, res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        return res.status(500).json(error);
    }
};

const adminRole = async (req,res)=>{
    try {
        res.status(200).json({user: req.user,message: "Puedes acceder a todo", rol: req.user.role});
    } catch (error) {
        return res.status(500).json(error);
    }
};

const logoutUser = (req, res) =>{};


const getAllUsers = async (req,res)=>{
    try {
        const allUsers = await User.find().populate("product");
        return res.json(allUsers);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const getUserById = async (req, res)=>{
try {
    const {id} = req.params;
    const users = await User.findById(id).populate({
        path: 'products',
        select: '_id tipo color temporada',
    });
    return res.status(200).json(users);
} catch (error) {
    return res.status(500).json(error);
}
};

const updateUser = async (req, res) =>{
    try {
        const {id} = req.params;
        const putUser = new User(req.body);
        putUser._id = id;
        const updateUse = await User.findByIdAndUpdate(id,putUser,{
            new:true,
        });
        return res.status(200).json(updateUse);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const deleteUser = async (req, res) =>{
    try {
        const {id} = req.params;
        const deleteUse = await User.findByIdAndDelete(id);
        if(!deleteUse) {
            return res.status(404).json({message: 'Usuario no encontrado'});
            
        }
        return res.status(200).json(deleteUse);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {login, register, checkSeccion, adminRole,logoutUser,getAllUsers, getUserById, updateUser ,deleteUser};