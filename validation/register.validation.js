let Validator = require('validatorjs');

const RegisterValidation = (body, req, res) =>{
    let rules = {
        name : 'required',
        email : 'required|email',
        password : 'required|confirmed'
    };
    let validation = new Validator(body, rules);
    return validation;
}

module.exports = RegisterValidation;