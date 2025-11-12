import Usuario from "../models/usuario.js";

export const criarUsuario = async (req, res) => {
    try{
        const usuario = await Usuario.create(req.body);
        res.status(201).json(usuario);
    } catch (err) {
        res.status(400).json({ error: err.message})
    }
};

export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

export const buscaUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.fingById(req.params.id);
        if (!usuario) return res.status(404).json({ error: "Usuário não encontrado"});
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

export const deletarUsuario = async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({ message: "Usuário removido com sucesso" })
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};