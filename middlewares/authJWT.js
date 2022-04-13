const config=require('../configs/secret.config');
const jwt=require('jsonwebtoken');
const db=require('../models/index');


const verifyToken=(req,res, next)=>{
    const token=req.headers['x-access-token'];
    if(!token)
    {
       return res.status(403).send("Send some valid token");
    }
    jwt.verify(token,config.secret,(err,decodedKey)=>{
        if(err)
        {
            return res.status(err).send("not an authorized token");
        }
        else{
            req.UserId=decodedKey.id;
            next();
        }
       
    })
}

module.exports ={
    verifyToken
}