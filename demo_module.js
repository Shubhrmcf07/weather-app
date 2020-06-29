var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shubh_rmcf07",
  database: "firstdb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "SELECT * FROM customers";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});