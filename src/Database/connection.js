<<<<<<< HEAD
// src/database/connection.js
import mysql from 'mysql2/promise';
import 'dotenv/config';

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env;

async function ensureDatabase() {
  const conn = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    port: DB_PORT,
    // **sem** a propriedade `database` aqui
  });
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  await conn.end();
  console.log(`DB "${DB_NAME}" verificado/criado com sucesso.`);
}

async function createPool() {
  return mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

let pool;

(async () => {
  try {
    await ensureDatabase();
    pool = await createPool();
    console.log(`Pool conectada ao DB "${DB_NAME}".`);
  } catch (err) {
    console.error('Erro ao inicializar DB:', err);
    process.exit(1);
  }
})();

export default {
  query: (...args) => pool.query(...args),
  getConnection: () => pool.getConnection(),
};
=======
// Database/connection.js
import mysql from 'mysql2/promise';
import 'dotenv/config';

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env;

class Database {
  static instance;

  constructor() {
    if (!Database.instance) {
      Database.instance = mysql.createPool({
        host: DB_HOST || 'localhost',
        user: DB_USER || 'root',
        port: DB_PORT || 3306,
        database: DB_NAME || 'RBFS_database',
        password: DB_PASS || '',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
    }
    return Database.instance;
  }
}

const pool = new Database();

// console.log("pool22", pool)

// Criação da database (caso não exista)
(async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST || 'localhost',
      user: DB_USER || 'root',
      database: DB_NAME || 'RBFS_database', 
      password: DB_PASS || '',
      port: DB_PORT || 3306,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    console.log(`Banco de dados "${DB_NAME}" verificado/criado com sucesso!`);
    await connection.end();
  } catch (err) {
    console.error("Erro ao criar/verificar database:", err.message);
  }
})();

export default pool;
>>>>>>> 050b0febff384f13c3179dc979ba29845ab78417
