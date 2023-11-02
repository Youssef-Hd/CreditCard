//importing the library pg to help us connect to our postgres database
const Pool = require("pg").Pool;

//connecting to our database
const pool = new Pool({
    user: "youssef",
    password: "123456",
    host: "localhost",
    port: 5432,
    database: "payment_gate_away"
  });
  
  //exporting Pool to use it to make request to our database
  module.exports = pool;