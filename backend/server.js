require('dotenv').config(); 
const app = require('./app');

const PORT = process.env.PORT || 3000;

const userRoutes          = require('./routes/userRoutes');
const authRoutes          = require('./routes/authRoutes');
const gamificationRoutes  = require('./routes/gamificationRoutes');
const transactionRoutes   = require('./routes/transactionRoutes'); 
const metaRoutes  = require('./routes/metaRoutes');

app.use('/api',  userRoutes);
app.use('/auth', authRoutes);
app.use('/api',  gamificationRoutes);
app.use('/api',  transactionRoutes); 
app.use('/api/metas', metaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor PiggyMe rodando na porta ${PORT}`);
});
