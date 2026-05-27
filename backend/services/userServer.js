const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// Rotas
app.use('/api', userRoutes);

app.listen(3000, () => console.log('Servidor rodando'));
