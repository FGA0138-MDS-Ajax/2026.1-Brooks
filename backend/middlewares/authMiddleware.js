const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'piggyme_secret';

// esse middleware protege rotas que exigem login, ele é executado antes de controller quando colocado em uma rota

function authMiddleware(req, res, next){

    // ototken vem no header authoriation em formato beare <token>
    const authHeather = req.headers['authorization'];
    if (!authHeather){
        return res.status(401).json({ erro:'Token não fornecido' });
    }

    const token = authHeather.split(' ')[1]; //separa a palavra bearer do token
    if (!token){
        return res.status(401).json({ erro: 'Formato de token inválido'});

    }

    try{

        const decodificado = jwt.verify(token, SECRET); 
        req.usuario = decodificado;
        next(); 



    }catch (err){
        return res.status(401).json({ erro: 'token inválido ou expirado'});
    }

}

module.exports = authMiddleware;
   
