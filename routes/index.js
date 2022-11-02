var express = require('express'); //
var router = express.Router();

var pg = require('pg');
var data;

const connectionData = {
  //host: process.env.RDS_HOSTNAME,
  //user: process.env.RDS_USERNAME,
  //password: process.env.RDS_PASSWORD,
  //port: process.env.RDS_PORT,
  //database: process.env.RDS_DATABASE
  host: "databasenode-instance.c3todq2z656f.us-east-1.rds.amazonaws.com",
  user: "postgresAdmin",
  password: "xstrongDrSp",
  port: 5432,
  database: "first_test_db"
};

const client = new pg.Client(connectionData);

client.connect()
client.query('SELECT * FROM contacts')
  .then(response => {
    console.log(response.rows)
    data = response.rows
    client.end
  })
  .catch(err => {
    client.end()
  })

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Contacts', items: data.map(item =>{
    return ["Name: ",item.username,"Phone: ", item.phone].join(" ");
  })});
});

module.exports = router;