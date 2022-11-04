require('dotenv').config();

var express = require('express'); //
var router = express.Router();

var pg = require('pg');
var data;

console.log("Hostname: %s, username: %s, password: %s", process.env.RDS_HOSTNAME, process.env.RDS_USERNAME, process.env.RDS_PASSWORD)

const connectionData = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DATABASE
};

const client = new pg.Client(connectionData);

client.connect();     // gets connection

const execute = (query) => {
  try {
    client.query(query);  // sends queries
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
  }
};

const create_table = `
    CREATE TABLE IF NOT EXISTS contacts (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
	    "phone" VARCHAR(15) NOT NULL,
	    PRIMARY KEY ("id")
    );`;

client.query(create_table).then(result => {
  if (result) {
    console.log('Table created');
  }
});

const insert_record = `INSERT INTO contacts(name, phone) values ('Usuario 1', '77777777')`;

client.query(insert_record).then(result => {
  if (result) {
    console.log('Record added');
  }
});

client.query('SELECT * FROM contacts')
  .then(response => {
    console.log(response.rows)
    data = response.rows
  })
  .catch(err => {
    console.error(error.stack);
  });

// client.end();         // closes connection

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Contacts', items: data.map(item => {
      return ["Name: ", item.name, "Phone: ", item.phone].join(" ");
    })
  });
});

module.exports = router;