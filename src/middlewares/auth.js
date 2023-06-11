const {verifySign,closeSesion} =require("../utils/jwt");
const User = require("../api/models/user.models");

const isAuth = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
     if (!authorization) {
        return res.status(401).json({ message: 'No esta autorizado' });
      }
      console.log(authorization);
      const token = authorization.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ message: 'No  me has enviado el token' });
      }
      let tokenVerified = verifySign(token);
      if (!tokenVerified.id) {
        return res.status(401).json(tokenVerified);
      }
      console.log(tokenVerified);
      const userLogged = await User.findById(tokenVerified.id);
      req.user = userLogged;
      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  };
  
  const isAdmin = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      
      if (!authorization) {
        return res.status(401).json({ message: 'No esta autorizado' });
      }
      console.log(authorization);
      const token = authorization.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No  me has enviado el token' });
      }
      let tokenVerified = verifySign(token); 
      if (!tokenVerified.id) {
        return res.status(401).json(tokenVerified);
      }
      console.log(tokenVerified);
      const userLogged = await User.findById(tokenVerified.id);
  
      if (userLogged.role !== 'admin') {
        return res
          .status(401)
          .json({ message: 'Para ver esta web necesitas ser administrador' });
      }
  
      req.user = userLogged;
      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  };
  const logout = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

  
    const close = closeSesion(token);
    console.log(close);
    if (!close.id) {
      return res.status(401).json(tokenVerified);
    }
  
  };
  module.exports = { isAuth, isAdmin, logout };
  