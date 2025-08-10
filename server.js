const express = require('express');
const app = express();

const setupSwagger = require('./docs/swagger');
const errorHandler = require('./utils/errorHandler');

const agentesRouter = require('./routes/agentesRoutes');
const casosRouter = require('./routes/casosRoutes');

const PORT = 3000;


app.use(express.json());

setupSwagger(app); 

app.use(agentesRouter);
app.use(casosRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
});