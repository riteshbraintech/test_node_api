const UserModal  = require("../model/User.model");
const jwt = require("jsonwebtoken");
const secretkey = "secret key";
const Helper = require("../helper/Helper");
const LoginValidation  = require('../validation/login.validation');

exports.index = async (req, res) => {
    let resData = await UserModal.index();
    console.log("Controller : ", resData);
    res.send(resData);
}

exports.login = async (req, res) => {

    try {

        // validtion input
        let validation = await LoginValidation(req.body);
        if(validation.fails()){
            console.log("validation.errors", validation.errors);
            res.status(200).send({ status:false, message: validation.errors});
        }
        

        // get user 
        let resData = await UserModal.login(req.body);
        
        
        // generate api token
        const token = jwt.sign({resData}, secretkey);
        // resData.token = token;
        
        // update token api access to 20 sec
        await UserModal.updateUser( resData?.id, {"token_expire_in":Helper.generateTime("s", 20)});

        res.json(token);
        
    } catch (error) {
        res.send({'status':false, 'message': error });
    }
}

exports.profile = (req, res) => {
    res.send({'status':true, 'message': req.auth });
}

