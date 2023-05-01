var sql = require("../../connection/mysqlConnection");
const BaseService = {};

BaseService.fetch = (sqlQuery) => {
    return new Promise((resolve, reject)=>{
        sql.query(sqlQuery, (err, res) => {
            if (err) {
              reject(err);
            }
            resolve(res);
          });
    });
}

module.exports = BaseService;