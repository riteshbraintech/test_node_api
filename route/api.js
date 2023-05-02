var  express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
const secretkey = "secret key";

// constoller include
const HomeController = require("../controller/home.controller");


// middleware for login token check
const VerifyToken = (req, res, next) =>{
    var BearerToken = req.headers['authorization'];
    if(BearerToken == undefined || BearerToken == "") res.send({ "status" : false, "message":"Token not present." });
    
    var token = BearerToken.split(" ")[1];
   
    //  verify token
    jwt.verify(token,secretkey,{ maxAge : "2h"},(err, auth)=>{
        if(err) res.send({ "status" : false, "message":err });
        console.log("auth data:", auth);
        auth.resData.token = token;
        req.auth = auth;
        next();     // if token present move to next.
    });
    
}


router.get('/', HomeController.index);
router.post('/login', HomeController.login);
router.post('/profile', VerifyToken, HomeController.profile);




module.exports = router;