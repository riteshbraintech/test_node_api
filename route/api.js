var  express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
const secretkey = "secret key";
const UserModal  = require("../model/User.model");
const Helper = require("../helper/Helper");


// constoller include
const HomeController = require("../controller/home.controller");


// middleware for login token check
const VerifyToken = async (req, res, next) =>{
    try {
        
        var BearerToken = req.headers['authorization'];
        if(BearerToken == undefined || BearerToken == "") res.status(401).send({ "status" : false, "message":"Token not present." });
        
        var token = BearerToken.split(" ")[1];

        // verify token
        jwt.verify(token,secretkey, async (err, auth)=>{
            
            var userId = auth?.resData?.id;

            if(err || userId == undefined) res.status(401).send({ "status" : false, "message":err });

            if(userId == undefined || userId == "") res.status(401).send({ "status" : false, "message":"Token invalid" });

            
            var user = await UserModal.fetchSingleUser(userId);
            let nowDate = Date.now();

            console.log("nowDate", nowDate);
            console.log("User token_expire_in", user.token_expire_in);

            // token expire time check
            if(user.token_expire_in < nowDate ) {
                res.status(401).send({ "status" : false, "message":"Token access time expired, Please login again." });
            }

            // update token api access to more 20 sec
            await UserModal.updateUser( user?.id, {"token_expire_in": Helper.generateTime("s", 20)});

            auth.resData.token = token;
            req.auth = auth;
            next();     // if token present move to next.
        });
    
    } catch (error) {
        res.status(401).send({ "status" : false, "message":"Catch: Token access time expired, Please login again." });    
    }
    
}


router.get('/', HomeController.index);
router.post('/login', HomeController.login);
router.post('/profile', VerifyToken, HomeController.profile);




module.exports = router;