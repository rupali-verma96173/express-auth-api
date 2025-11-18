const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next)=> {
   // const token = req.header("Authorization")?.replace("Bearer ", "");
    const token = req.cookies?.token;



    if (!token) {
        return res.status(401).json({message:"missing token"})
    } 
       try {
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token data: ", decoded);
        req.user = decoded;
        next();
    }catch{
        return res.status(401).json({message:"Invalid or expired token"});
    }

};

module.exports = authMiddleware;