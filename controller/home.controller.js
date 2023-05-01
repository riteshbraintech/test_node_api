const UserModal  = require("../model/User.model");
const jwt = require("jsonwebtoken");
const secretkey = "secret key";

exports.index = async (req, res) => {
    let resData = await UserModal.index();
    console.log("Controller : ", resData);
    res.send(resData);
}

exports.login = async (req, res) => {
    let resData = await UserModal.login(req.body);
    
    jwt.sign({resData}, secretkey, { expiresIn : "300000s"}, (err, token)=>{
        res.json(token);
    });
}

exports.profile = async (req, res) => {
    res.send(req.auth);
}

