const UserModal  = require("../model/User.model");
const jwt = require("jsonwebtoken");
const secretkey = "secret key";
const Helper = require("../helper/Helper");
const LoginValidation  = require('../validation/login.validation');
const RegisterValidation = require('../validation/register.validation');
const SendMail = require("../helper/EmailSend");


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
            res.status(200).send({ status:false, message: validation.errors});
        }
        

        // get user 
        let resData = await UserModal.login(req.body);
        if(resData == undefined) res.send({'status':false, 'message': "Unable to fetch record !" });
        
        
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

exports.register = async (req, res) => {

    // try {

        // validtion input
        let validation = await RegisterValidation(req.body);
        if(validation.fails()){
             res.status(200).send({ status:false, message: validation.errors});
        }

        // create user account
        let response = await UserModal.register(validation.input);

        // mail transfer
        await SendMail.sendRegisterMail(validation?.input?.email);

        res.json(response);
        
    // } catch (error) {
    //     res.send({'status':false, 'message': error });
    // }
}

