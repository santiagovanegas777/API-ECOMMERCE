const User = require("../api/models/user.models");

const validatePassword = (pass) =>{

    const regex = 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pass);
    };
    
    const validateEmail = (email) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
        
        return regex.test(email);
    };

   const usedEmail = async (email)=>{
    const users = await User.find({email: email})
    return users.length;
   };

   module.exports = {validatePassword, validateEmail, usedEmail};




