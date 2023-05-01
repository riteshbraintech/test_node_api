
const BaseService = require("../services/base/Base.service");

const UserModal = {};

UserModal.index = async (result) => {
    var sqlQuery = "select * from users";
    let response = await BaseService.fetch(sqlQuery);
    return response;
};

UserModal.login = async (req) => {
    var sqlQuery = "select * from users where email='"+req.email +"' AND password='"+req.password+"'";
    let response = await BaseService.fetch(sqlQuery);
    console.log("response", response);
    return response;
};

module.exports = UserModal;
