/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
const biblioteca = require('../repositorios/biblioteca');

const tabela = [];

const ordenarTabela = () => {
	tabela.sort((a, b) => {
		if (a.pontos > b.pontos) {
			return -1;
		}
		if (b.pontos > a.pontos) {
			return 1;
		}
		if (a.vitorias > b.vitorias) {
			return -1;
		}
		if (b.vitorias > a.vitorias) {
			return 1;
		}
		const saldoA = a.golsFeitos - a.golsSofridos;
		const saldoB = b.golsFeitos - a.golsSofridos;

		if (saldoA > saldoB) {
			return -1;
		}
		if (saldoB > saldoA) {
			return 1;
		}
		if (a.golsFeitos > b.golsFeitos) {
			return -1;
		}
		if (b.golsFeitos > a.golsFeitos) {
			return 1;
		}
		a.nome.localeCompare(b.nome);
	});
};

const inserirOuAtualizarTime = (nome, pontos, golsFeitos, golsSofridos) => {
	const timeEncontrado = tabela.find((time) => time.nome === nome);

	if (timeEncontrado) {
		timeEncontrado.pontos += pontos;
		timeEncontrado.jogos++;
		timeEncontrado.vitorias += pontos === 3 ? 1 : 0;
		timeEncontrado.derrotas += pontos === 0 ? 1 : 0;
		timeEncontrado.empate += pontos === 1 ? 1 : 0;
		timeEncontrado.golsFeitos += golsFeitos;
		timeEncontrado.golsSofridos += golsSofridos;
	} else {
		tabela.push({
			nome,
			pontos,
			jogos: 1,
			vitorias: pontos === 3 ? 1 : 0,
			derrotas: pontos === 0 ? 1 : 0,
			empate: pontos === 1 ? 1 : 0,
			golsFeitos,
			golsSofridos,
		});
	}
};

const calcularTabela = (todoJogos) => {
	for (jogo of todoJogos) {
		if (jogo.gols_casa > jogo.gols_visitante) {
			inserirOuAtualizarTime(
				jogo.time_casa,
				3,
				jogo.gols_casa,
				jogo.gols_visitante
			);
			inserirOuAtualizarTime(
				jogo.time_visitante,
				0,
				jogo.gols_visitante,
				jogo.gols_casa
			);
		} else if (jogo.gols_casa < jogo.gols_visitante) {
			inserirOuAtualizarTime(
				jogo.time_casa,
				0,
				jogo.gols_casa,
				jogo.gols_visitante
			);
			inserirOuAtualizarTime(
				jogo.time_visitante,
				3,
				jogo.gols_visitante,
				jogo.gols_casa
			);
		} else {
			inserirOuAtualizarTime(
				jogo.time_casa,
				1,
				jogo.gols_casa,
				jogo.gols_visitante
			);
			inserirOuAtualizarTime(
				jogo.time_visitante,
				1,
				jogo.gols_visitante,
				jogo.gols_casa
			);
		}
	}
};

const tabelaJogos = async (ctx) => {
	const todoJogos = await biblioteca.obterJogos();

	ctx.body = { status: 'sucesso', tabela };

	calcularTabela(todoJogos);
	ordenarTabela();
};

module.exports = { tabelaJogos };
