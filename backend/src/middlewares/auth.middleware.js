const jwt = require("jsonwebtoken");
const blacklistTokenModel = require('../models/blacklistToken.model.js');

async function authUser(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"No Token found, authorization denied"
        })
    }
    const blacklistedToken = await blacklistTokenModel.findOne({token});
    if(blacklistedToken){
        return res.status(401).json({
            message:"Token is Invalid"
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next(); 
    } catch (error) {
        return res.status(401).json({
            message:"Invalid token, authorization denied"
        })
    }
}

module.exports = {authUser};