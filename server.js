// server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mainRouter from './src/index.js';

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

app.use('/api', mainRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
