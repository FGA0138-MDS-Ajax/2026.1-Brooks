const express                = require('express');
const GamificationController = require('../controllers/gamificationController');

const authMiddleware         = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/xp',authMiddleware, GamificationController.buscarXp);

router.post('/xp/ganhar', authMiddleware , GamificationController.ganharXp);
   
router.get('/xp/historico', authMiddleware , GamificationController.historico);

module.exports = router;
