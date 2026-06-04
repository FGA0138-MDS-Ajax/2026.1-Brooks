const app = require('./app');

const PORT = process.env.PORT || 3000;


const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api', userRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor PiggyMe rodando na porta ${PORT}`);
});