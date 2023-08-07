const mysql = require('mysql');
const DBConfig = require('../config/db.config.js');

// Criar conexão à base de dados
const connection = mysql.createConnection({
  host: DBConfig.DBSERVER,
  user: DBConfig.DBUSER,
  password: DBConfig.DBPASS,
  database: DBConfig.DBNAME
});

// Abrir conexão à base de dados
connection.connect(error => {
  if (error) throw error;
  console.log('Ligação à base de dados estabelecida...');
});

module.exports = connection;