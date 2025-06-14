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
