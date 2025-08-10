const agentesRepository = require(`../repositories/agentesRepository`);
const { isValidDate } = require(`../utils/validator`);
const mensagemErro = `Campo Obrigatório!`;

async function getAgentes(req, res) {
    const { cargo, sort } = req.query;
    const agentes = await agentesRepository.findAll({ cargo }, sort);
    res.status(200).json(agentes);
}

async function getAgenteById(req, res) {
    const { id } = req.params;
    const agente = await agentesRepository.findById(id);

    if (!agente) {
        return res.status(404).json({ message: `Agente não encontrado.` });
    }

    res.status(200).json(agente);
}

async function createAgente(req, res) {
    const { nome, dataDeIncorporacao, cargo } = req.body;

    if (!nome || !dataDeIncorporacao || !cargo) {
        return res.status(400).json({
            status: 400,
            message: `Parâmetros inválidos`,
            errors: {
                nome: !nome ? mensagemErro : undefined,
                dataDeIncorporacao: !dataDeIncorporacao ? mensagemErro : undefined,
                cargo: !cargo ? mensagemErro : undefined,
            },
        });
    }

    if (!isValidDate(dataDeIncorporacao)) {
        return res.status(400).json({
            status: 400,
            message: "Data de incorporação inválida ou futura",
            errors: {
                dataDeIncorporacao: "Formato esperado: YYYY-MM-DD. Não pode ser futura."
            }
        });
    }

    const novoAgente = await agentesRepository.create({ nome, dataDeIncorporacao, cargo });
    res.status(201).json(novoAgente);
}

async function atualizarAgente(req, res) {
    const { id } = req.params;
    const novoAgente = req.body;

    if (novoAgente.id && novoAgente.id !== id) {
        return res.status(400).json({
            status: 400,
            message: "Não é permitido alterar o campo 'id'."
        });
    }

    if (!novoAgente.nome || !novoAgente.dataDeIncorporacao || !novoAgente.cargo) {
        return res.status(400).json({
            status: 400,
            message: "Campos obrigatórios ausentes para atualização completa.",
            errors: {
                nome: !novoAgente.nome ? mensagemErro : undefined,
                dataDeIncorporacao: !novoAgente.dataDeIncorporacao ? mensagemErro : undefined,
                cargo: !novoAgente.cargo ? mensagemErro : undefined
            }
        });
    }

    if (!isValidDate(novoAgente.dataDeIncorporacao)) {
        return res.status(400).json({
            message: "Data de incorporação inválida",
            errors: {
                dataDeIncorporacao: "Formato inválido ou data futura"
            }
        });
    }

    const atualizado = await agentesRepository.update(id, novoAgente);

    if (!atualizado) {
        return res.status(404).json({ message: `Agente não encontrado.` });
    }

    res.status(200).json(atualizado);
}

async function atualizarParcialAgente(req, res) {
    const { id } = req.params;
    const campos = req.body;

    if (campos.id && campos.id !== id) {
        return res.status(400).json({
            status: 400,
            message: "Não é permitido alterar o campo 'id'."
        });
    }

    const camposPermitidos = ['nome', 'dataDeIncorporacao', 'cargo'];
    const camposValidos = Object.keys(campos).filter(key => camposPermitidos.includes(key));

    if (!campos || camposValidos.length === 0) {
        return res.status(400).json({
            status: 400,
            message: "Nenhum campo válido fornecido para atualização.",
            errors: campos
        });
    }

    if (campos.dataDeIncorporacao && !isValidDate(campos.dataDeIncorporacao)) {
        return res.status(400).json({
            message: "Data de incorporação inválida",
            errors: {
                dataDeIncorporacao: "Formato inválido ou data futura"
            }
        });
    }

    const atualizado = await agentesRepository.update(id, campos);

    if (!atualizado) {
        return res.status(404).json({ message: `Agente não encontrado.` });
    }

    res.status(200).json(atualizado);
}

async function deletarAgente(req, res) {
    const { id } = req.params;

    const removido = await agentesRepository.remove(id);

    if (!removido) {
        return res.status(404).json({ message: `Agente não encontrado.` });
    }

    res.status(204).send();
}

async function getCasosDoAgente(req, res) {
  const { id } = req.params;
  const casos = await casosRepository.findAll({ agente_id: id });
  res.json(casos);
}

module.exports = {
    getAgentes,
    getAgenteById,
    createAgente,
    atualizarAgente,
    atualizarParcialAgente,
    deletarAgente,
    getCasosDoAgente,
};
