const casosRepository = require(`../repositories/casosRepository`);
const agentesRepository = require(`../repositories/agentesRepository`);

const mensagemErro = `Campo Obrigatório!`;

async function getCasos(req, res) {
  const { titulo, status, sort, agente_id, q } = req.query;
  const filtros = { titulo, status, agente_id, q };
  const casos = await casosRepository.findAll(filtros, sort);
  return res.status(200).json(casos);
}

async function getCasosById(req, res) {
    const { id } = req.params;
    const caso = await casosRepository.findById(id);

    if (!caso) {
        return res.status(404).json({ message: `Caso não encontrado.` });
    }

    res.status(200).json(caso);
}

async function createCaso(req, res) {
    const { titulo, descricao, status, agente_id } = req.body;

    if (!titulo || !descricao || !status || !agente_id) {
        return res.status(400).json({
            status: 400,
            message: `Parâmetros inválidos`,
            errors: {
                titulo: !titulo ? mensagemErro : undefined,
                descricao: !descricao ? mensagemErro : undefined,
                status: !status ? mensagemErro : undefined,
                agente_id: !agente_id ? mensagemErro : undefined,
            },
        });
    }

    if (status !== `aberto` && status !== `solucionado`) {
        return res.status(400).json({
            status: 400,
            message: `Parâmetros inválidos`,
            errors: {
                status: "O campo `status` pode ser somente `aberto` ou `solucionado`",
            },
        });
    }

    const agenteExiste = await agentesRepository.findAll().some((agente) => agente.id === agente_id);

    if (!agenteExiste) {
        return res.status(404).json({
            status: 404,
            message: `Agente responsável não encontrado`,
        });
    }

    const novoCaso = await casosRepository.create({ titulo, descricao, status, agente_id });
    res.status(201).json(novoCaso);
}

async function atualizarCaso(req, res) {
    const { id } = req.params;
    const novoCaso = req.body;

    if (novoCaso.id && novoCaso.id !== id) {
        return res.status(400).json({
            status: 400,
            message: "Não é permitido alterar o campo 'id'."
        });
    }

    if (!novoCaso.titulo || !novoCaso.descricao || !novoCaso.status || !novoCaso.agente_id) {
        return res.status(400).json({
            status: 400,
            message: "Campos obrigatórios ausentes para atualização completa.",
            errors: {
                titulo: !novoCaso.titulo ? mensagemErro : undefined,
                descricao: !novoCaso.descricao ? mensagemErro : undefined,
                status: !novoCaso.status ? mensagemErro : undefined,
                agente_id: !novoCaso.agente_id ? mensagemErro : undefined
            }
        });
    }

    if (novoCaso.status !== `aberto` && novoCaso.status !== `solucionado`) {
        return res.status(400).json({
            message: "Status inválido",
            errors: {
                status: "Use apenas 'aberto' ou 'solucionado'"
            }
        });
    }

    const agenteExiste = await agentesRepository.findAll().some((agente) => agente.id === novoCaso.agente_id);
    if (!agenteExiste) {
        return res.status(404).json({
            status: 404,
            message: `Agente responsável não encontrado`,
        });
    }

    const atualizado = await casosRepository.update(id, novoCaso);

    if (!atualizado) {
        return res.status(404).json({ message: `Caso não encontrado.` });
    }

    res.status(200).json(atualizado);
}

async function atualizarParcialCaso(req, res) {
    const { id } = req.params;
    const campos = req.body;

    if (campos.id && campos.id !== id) {
        return res.status(400).json({
            status: 400,
            message: "Não é permitido alterar o campo 'id'."
        });
    }

    if (campos.status && campos.status !== `aberto` && campos.status !== `solucionado`) {
        return res.status(400).json({
            message: "Status inválido",
            errors: {
                status: "Use apenas 'aberto' ou 'solucionado'"
            }
        });
    }

    if (campos.agente_id) {
        const agenteExiste =  await agentesRepository.findAll().some((agente) => agente.id === campos.agente_id);
        if (!agenteExiste) {
            return res.status(404).json({
                status: 404,
                message: `Agente responsável não encontrado`,
            });
        }
    }

    const atualizado = await casosRepository.update(id, campos);

    if (!atualizado) {
        return res.status(404).json({ message: `Caso não encontrado.` });
    }

    res.status(200).json(atualizado);
}

async function deletarCaso(req, res) {
    const { id } = req.params;

    const removido = await casosRepository.remove(id);

    if (!removido) {
        return res.status(404).json({ message: `Caso não encontrado.` });
    }

    res.status(204).send();
}

module.exports = {
    getCasos,
    getCasosById,
    createCaso,
    atualizarCaso,
    atualizarParcialCaso,
    deletarCaso,
};
