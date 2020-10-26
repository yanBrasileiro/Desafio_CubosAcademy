const Router = require('koa-router');
const biblioteca = require('./controllers/biblioteca');
const classificacao = require('./controllers/classificacao');

const router = new Router();

/**
 * Definição de rotas
 */
router.get('/jogos/:rodada', biblioteca.jogosRodada);
router.get('/jogos', biblioteca.jogos);
router.get('/classificacao', classificacao.tabelaJogos);
router.put('/atualizarJogo/:id', biblioteca.atualizarJogos);

module.exports = router;
