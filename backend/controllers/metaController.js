const metaService = require('../services/metaService');


exports.criar = async(req,res)=>{

    try{

        const meta = await metaService.criar(
            req.usuario.id,
            req.body
        );

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