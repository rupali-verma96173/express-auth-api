const express = require('express');
const {registerUser,getAllUsers,deleteUser,getUser,updateUser, patchUser, loginUser} = require('../controller/userController.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.post("/register",registerUser);
router.post("/login", loginUser);

router.get("/gets",auth, getAllUsers);    //protected
router.delete("/remove/:id",auth, deleteUser); //protected
router.get("/userById/:id",auth, getUser);               //protected
router.put("/userUpdateById/:id",auth, updateUser);         //protected
router.patch("/patchById/:id",auth, patchUser);     //protected

module.exports = router;