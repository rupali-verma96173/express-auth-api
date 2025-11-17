 const jwt = require("jsonwebtoken");
 const {User} = require('../model/userModel.js');
 const bcrypt = require("bcrypt");
//  const {userSchema} = require('../model/userModel.js');

const registerUser = async (req,res)=>{
    const {name,email,password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name,email,password:hashedPassword});
    res.status(201).json({user});
    } catch (error) {
         res.status(400).json({message:"error"});
    }
    
};

    const getAllUsers = async (req,res) => {
        try {
            const user = await User.find();
        res.status(200).json({user});
        } catch(error){
           res.status(500).json({message: "Error"})
            
        }
    };


    const deleteUser = async (req, res) => {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    };
    
    const getUser = async (req, res) => {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({ user });
    };
    

    const updateUser = async(req, res) => {
        const {id} = req.params;
        const {name, email, password} = req.body;
        try{
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

            const user = await User.findByIdAndUpdate(id,
                {name, email, ...(hashedPassword && { password: hashedPassword })},
                {new: true, runValidators: true}
            )
            res.status(200).json({user});
        } catch(error){
            res.status(500).json({message:"error"})
        }
    };


    const patchUser = async (req, res) => {
        const {id} = req.params;
        const updateData = req.body;

        try{
             if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
            const user = await User.findByIdAndUpdate(id, updateData, {new: true, runValidators:true});
            res.status(200).json({message: "successfully Updated"});
        } catch(error){
            res.status(500).json({message:"error update"});
        }
    }


    console.log("JWT_SECRET =", process.env.JWT_SECRET);
console.log("JWT_EXPIRE =", process.env.JWT_EXPIRE);


    const loginUser = async(req, res) => {
        const {email, password} = req.body;

        try{
            const user = await User.findOne({email});

            if(!user){
                return res.status(404).json({ message:"invalid email"});
            }
            const isValidePassword = await bcrypt.compare(password, user.password);

            if(!isValidePassword){
                return res.status(401).json({message:"invalid password"});
            }

    const token = jwt.sign({id: user._id, email: user.email},
         process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE});

        console.log("Generate token: ", token);

           // res.status(200).json({message:"login Successfully", user, token});
            res.cookie("token", token, {
    httpOnly: true,
    secure: false, // HTTPS par true karna
    sameSite: "lax",      
    maxAge: 24 * 60 * 60 * 1000 // 1 day
});
res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax",max
})

res.status(200).json({message:"login Successfully", user});


        }catch(error){
            res.status(500).json({message:"login failed"});
        }

    }

module.exports = {registerUser,getAllUsers,deleteUser,getUser, updateUser, patchUser, loginUser};