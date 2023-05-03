
const BaseService = require("../services/base/Base.service");
const Helper = require("../helper/Helper");

const UserModal = {};

UserModal.index = async (result) => {
    var sqlQuery = "select * from users";
    let response = await BaseService.fetch(sqlQuery);
    return response;
};

UserModal.login = async (req) => {
    var sqlQuery = "select * from users where email='"+req.email +"' AND password='"+req.password+"'";
    let response = await BaseService.singleFetch(sqlQuery);
    return response;
};


UserModal.fetchSingleUser = async (userId) => {
    var sqlQuery = "select * from users where id="+userId;
    let response = await BaseService.singleFetch(sqlQuery);
    return response;
};

UserModal.updateUser = async (id, uData) => {

    var updateQuery = `UPDATE users SET ${Helper.objectToString(uData)} WHERE id=${id}`;
    var res = await BaseService.executeQuery(updateQuery);
    return res;

};

module.exports = UserModal;
