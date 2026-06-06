const app = require('./app');

const PORT = process.env.PORT || 3000;

const userRoutes            = require('./routes/userRoutes');
const authRoutes            = require('./routes/authRoutes');
const gamificationRoutes    = require('./routes/gamificationRoutes'); // 🆕

app.use('/api',  userRoutes);
app.use('/auth', authRoutes);
app.use('/api',  gamificationRoutes); // 🆕 monta: /api/xp, /api/xp/ganhar, /api/xp/historico

app.listen(PORT, () => {
    console.log(`Servidor PiggyMe rodando na porta ${PORT}`);
});
