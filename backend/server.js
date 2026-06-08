const app = require('./app');

const PORT = process.env.PORT || 3000;

const userRoutes          = require('./routes/userRoutes');
const authRoutes          = require('./routes/authRoutes');
const gamificationRoutes  = require('./routes/gamificationRoutes');
const transactionRoutes   = require('./routes/transactionRoutes'); 

app.use('/api',  userRoutes);
app.use('/auth', authRoutes);
app.use('/api',  gamificationRoutes);
app.use('/api',  transactionRoutes); 

app.listen(PORT, () => {
    console.log(`Servidor PiggyMe rodando na porta ${PORT}`);
});
