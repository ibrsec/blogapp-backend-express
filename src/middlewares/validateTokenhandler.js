
const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');


const validateToken = (req,res,next)=>{

    const authHeader = req.headers.authorization || req.headers.Authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.status(401)
        throw new Error('Unauthorized - Token is missing!')
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token,process.env.ACCESSTOKEN_SECRETKEY,(err,decoded)=>{
        // console.log('verifya girdi');
        if(err){
            res.status(401)
            throw new Error('Unauthorized - Invalid Token!')
        }

        // console.log('decoded= ', decoded)

        req.username = decoded.user.username;
        req.accessToken =token;
        req.userId = decoded.user.id;
         


        next();

    })

}

module.exports = validateToken;