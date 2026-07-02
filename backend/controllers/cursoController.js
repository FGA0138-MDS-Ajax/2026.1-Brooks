const db = require('../database/config');
const gamificationService = require('../services/gamificationService');

const LISTA_CURSOS = [
    { id: 1, titulo: 'Educação Financeira Pessoal', fonte: 'Escola Virtual Gov', link: 'https://www.escolavirtual.gov.br/curso/1076', resumo: 'Esse curso prepara você para lidar melhor com seu dinheiro, por meio do tripé de educação financeira.' },
    { id: 2, titulo: 'Gestão de Finanças Pessoais', fonte: 'Escola Virtual Gov e Banco Central do Brasil', link: 'https://www.escolavirtual.gov.br/curso/170', resumo: 'Adquira mais conhecimentos para gerir suas finanças e realizar seus sonhos!' },
    { id: 3, titulo: 'Construindo minha Proteção Financeira', fonte: 'Fundação Bradesco - Escola Virtual', link: 'https://www.ev.org.br/cursos/Construindo-minha-Protecao-Financeira', resumo: 'Você aprenderá a administrar as suas finanças por meio do planejamento e organização, realizando o mapeamento de gastos, ganhos e compromissos financeiros com a intenção de atingir um objetivo.' },
    { id: 4, titulo: 'Formação de Multiplicadores da Série "Eu e Meu Dinheiro"', fonte: 'Escola Virtual Gov', link: 'https://www.escolavirtual.gov.br/curso/251', resumo: 'O curso destina-se a sensibilizar os participantes para a gestão das finanças pessoais e a capacitá-los a conduzir grupos de discussão.' },
    { id: 5, titulo: 'Elas Bancam', fonte: 'Fundação Bradesco - Escola Virtual', link: 'https://edu.b3.com.br/w/elas-bancam', resumo: 'Um curso feito por e para mulheres que desejam transformar sua relação com o dinheiro.' },
    { id: 6, titulo: 'Curso Finanças Básicas', fonte: 'SERASA', link: 'https://www.serasa.com.br/ensina/financas-basicas/', resumo: 'A Serasa oferece um curso de educação financeira gratuito para iniciantes.' },
    { id: 7, titulo: 'Gestão financeira', fonte: 'SEBRAE', link: 'https://df.loja.sebrae.com.br/gest-o-financeira-1-372000026927', resumo: 'O curso apresenta fundamentos de gestão financeira voltados a empreendedores que buscam estruturar ou iniciar um negócio de forma sustentável.' }
];

class CursoController {
    async listar(req, res) {
        try {
            const usuarioId = req.usuario.id;
            
            const [rows] = await db.execute('SELECT curso_id FROM cursos_concluidos WHERE usuario_id = ?', [usuarioId]);
            const concluidosIds = rows.map(r => r.curso_id);

            const cursosComStatus = LISTA_CURSOS.map(curso => ({
                ...curso,
                concluido: concluidosIds.includes(curso.id)
            }));

            res.status(200).json({ cursos: cursosComStatus });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao listar cursos' });
        }
    }

    async concluir(req, res) {
        try {
            const usuarioId = req.usuario.id;
            const cursoId = parseInt(req.params.id);

            if (!LISTA_CURSOS.find(c => c.id === cursoId)) {
                return res.status(404).json({ erro: 'Curso não encontrado.' });
            }

            const [rows] = await db.execute('SELECT * FROM cursos_concluidos WHERE usuario_id = ? AND curso_id = ?', [usuarioId, cursoId]);
            if (rows.length > 0) {
                return res.status(400).json({ erro: 'Você já resgatou sua recompensa por este curso.' });
            }

            await db.execute('INSERT INTO cursos_concluidos (usuario_id, curso_id) VALUES (?, ?)', [usuarioId, cursoId]);
            await gamificationService.ganharXp(usuarioId, 'curso_concluido', 'Concluiu um curso de educação financeira');

            res.status(200).json({ mensagem: 'Parabéns! Você concluiu o curso e avançou um nível inteiro!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao registrar conclusão do curso' });
        }
    }
}

module.exports = new CursoController();