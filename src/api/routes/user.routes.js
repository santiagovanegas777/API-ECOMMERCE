const express = require("express");

const {login, register, checkSeccion, adminRole, logoutUser,getAllUsers, getUserById, updateUser ,deleteUser} = require("../controllers/user.controller");

const {isAuth, isAdmin, logout} = require("../../middlewares/auth");

const router = express.Router();


router.post('/login', login);

router.post('/register', register);

router.post('/checkSeccion', [isAuth], checkSeccion);

router.post('/admin', [isAdmin], adminRole);

router.get('/logout', [logout], logoutUser);
router.get('/',getAllUsers);
router.get('/:id',getUserById);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);


module.exports = router;
