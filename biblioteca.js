const bd = require('../utils/database');

const obterRodadas = async (rodada) => {
	const query = {
		text: `SELECT * FROM jogos WHERE rodada= $1;`,
		values: [rodada],
	};

	const result = await bd.query(query);
	return result.rows;
};

const obterJogos = async () => {
	const query = {
		text: `SELECT * FROM jogos;`,
	};

	const result = await bd.query(query);
	return result.rows;
};

const atualizar = async (id) => {
	const query = {
		text: `SELECT * FROM jogos WHERE id = $1;`,
		values: [id],
	};

	const result = await bd.query(query);
	return result.rows;
};

module.exports = { obterRodadas, obterJogos, atualizar };
