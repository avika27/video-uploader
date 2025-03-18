const mysql=require("mysql2");
const pool =mysql.createPool({
    local:"localhost",
    user:"root",
    password:"lambo",
    database:"videotranscript",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  module.exports = pool.promise();