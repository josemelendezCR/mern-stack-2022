const mysql = require('mysql2');
const dotenv = require('dotenv');

const mysqlDB = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: process.env.MYSQL_PS,
  database: 'goals'
});

mysqlDB.connect(function(err) {
  if(err) {
    console.log(err);
    return;
  } else {
    console.log('DB connected');
  }
})

module.exports = mysqlDB;