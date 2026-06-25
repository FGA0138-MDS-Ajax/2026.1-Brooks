const Meta = require('../models/Meta');


class MetaService {


    async criar(usuarioId, dados){

        const {
            titulo,
            valorAlvo,
            prazo
        } = dados;


        if(!titulo || !titulo.trim())
            throw new Error("Informe um título");


        if(!valorAlvo || valorAlvo <= 0)
            throw new Error("Informe um valor válido");


        if(!prazo)
            throw new Error("Informe o prazo");


        return Meta.criar({
            usuarioId,
            titulo:titulo.trim(),
            valorAlvo,
            prazo
        });

    }


    async listar(usuarioId){

        return Meta.listarPorUsuario(usuarioId);

    }


    async excluir(usuarioId,id){

        return Meta.excluir(id,usuarioId);

    }


}


module.exports = new MetaService();