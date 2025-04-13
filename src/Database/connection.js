// Database/connection.js
import mysql from 'mysql2';
import 'dotenv/config';

const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_PORT,
} = process.env;

const connection = mysql.createConnection({
  host: DB_HOST || 'localhost',
  user: DB_USER || 'root',
  password: DB_PASS || 'root',
  port: DB_PORT || 3306,
});


connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conexão MySQL estabelecida!');

  // Cria a database se não existir
  connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``, (err) => {
    if (err) {
      console.error('Erro ao criar/verificar a database:', err);
      return;
    }
    console.log(`Banco de dados "${DB_NAME}" verificado/criado com sucesso!`);

    // Seleciona a database
    connection.query(`USE \`${DB_NAME}\``, (err) => {
      if (err) {
        console.error(`Erro ao selecionar a database "${DB_NAME}":`, err);
        return;
      }
      console.log(`Usando a database "${DB_NAME}"`);
    });
  });
});

export default connection;
