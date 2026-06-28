const metaService = require('../services/metaService');
const gamificationService = require('../services/gamificationService');


exports.criar = async(req,res)=>{

    try{

        const meta = await metaService.criar(
            req.usuario.id,
            req.body
        );

        try {
            await gamificationService.ganharXp(req.usuario.id, 'meta_criada', 'Criou uma nova meta financeira');
        } catch (xpErro) {
            console.error("Erro ao registrar XP de meta criada:", xpErro);
        }

        res.json(meta);


    }catch(e){

        res.status(400).json({
            erro:e.message
        });

    }

};



exports.listar = async(req,res)=>{

    try{

        const metas =
            await metaService.listar(
                req.usuario.id
            );


        res.json({
            metas
        });


    }catch(e){

        res.status(500).json({
            erro:e.message
        });

    }

};



exports.excluir = async(req,res)=>{

    try{

        await metaService.excluir(
            req.usuario.id,
            req.params.id
        );


        res.json({
            mensagem:"Meta excluída"
        });


    }catch(e){

        res.status(400).json({
            erro:e.message
        });

    }

};

exports.concluir = async(req, res) => {
    try {
        await metaService.concluir(req.usuario.id, req.params.id);

        try {
            await gamificationService.ganharXp(req.usuario.id, 'meta_concluida', 'Concluiu uma meta financeira');
        } catch (xpErro) {
            console.error("Erro ao registrar XP de meta concluída:", xpErro);
        }

        res.json({ mensagem: "Meta concluída com sucesso!" });

    } catch(e) {
        res.status(400).json({ erro: e.message });
    }
};