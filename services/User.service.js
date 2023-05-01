const BaseService = require("./base/Base.service");

const UserService = {};

UserService.allRecords = async () => {
    var sqlQuery = "select * from users";
    let response = await BaseService.fetch(sqlQuery);
    console.log("response", response);
    return response;
}

module.exports = UserService;