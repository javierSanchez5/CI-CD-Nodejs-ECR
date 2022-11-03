var express = require('express'); //
var router = express.Router();
require('dotenv').config();

var pg = require('pg');
var data;

const connectionData = {
  host: process.env.RDS_HOSTNAME,
  user: "postgresAdmin",//process.env.RDS_USERNAME,
  password: "xstrongDrSp",//process.env.RDS_PASSWORD,
  port: 5432, "process.env.RDS_PORT,
  database: "test_ead"//process.env.RDS_DATABASE

};

const client = new pg.Client(connectionData);

client.connect(function(err){
  if(err) throw err;
  console.log("connected");
  }
);
//client.query('SELECT * FROM contacts')
//  .then(response => {
//    console.log(response.rows)
//    data = response.rows
//    client.end
//  })
//  .catch(err => {
//    client.end()
//  })

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Contacts'/*, items: data.map(item =>{
    return ["Name: ",item.username,"Phone: ", item.phone].join(" ");
  })*/});
});

module.exports = router;