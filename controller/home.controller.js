const UserModal  = require("../model/User.model");
const jwt = require("jsonwebtoken");
const secretkey = "secret key";
const Helper = require("../helper/Helper");

exports.index = async (req, res) => {
    let resData = await UserModal.index();
    console.log("Controller : ", resData);
    res.send(resData);
}

exports.login = async (req, res) => {

    try {

        // get user 
        let resData = await UserModal.login(req.body);
        
        
        // generate api token
        const token = jwt.sign({resData}, secretkey);
        // resData.token = token;
        
        // update token api access to 20 sec
        await UserModal.updateUser( resData?.id, {"token_expire_in":Helper.generateTime("m", 20)});

        res.json(token);
        
    } catch (error) {
        res.send({'status':false, 'message': error });
    }
}

exports.profile = (req, res) => {
    res.send({'status':true, 'message': req.auth });
}

