const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: '0203lanlan',
  database: 'REACT_KOA_NODE',
  insecureAuth : true
})
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('success');
  }
});
module.exports = connection;