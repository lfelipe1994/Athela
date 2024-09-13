const { criaUsuario, getListaDeUsuarios, verificaLoginRetornaUsuario, atualizaNotificacao } = require("../servicos/usuario");

function postNovoUsuario(req, res) {
    try {
        const usuarioNovo = req.body;
        console.log("Dados recebidos para criação do usuário: ", usuarioNovo);
        criaUsuario(usuarioNovo);
        res.status(201).json({
            mensagem: "Usuário criado com sucesso",
            usuario: usuarioNovo
        });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).send(error.message);
    }
}

function getTodosUsuarios(req, res){
    try {     
        const usuarios = getListaDeUsuarios() 
        res.send(usuarios)
    } catch(error) { 
        res.status(500)
        res.send(error.message)
    }    
}

function getVerificacaoLogin(req, res) {
    try {
        const dadosUsuario = req.body;
        console.log("Dados de login recebidos:", dadosUsuario);
        const Usuario = verificaLoginRetornaUsuario(dadosUsuario);
        console.log("Resultado da verificação:", Usuario);
        res.send(Usuario);
    } catch (error) {
        console.error("Erro ao verificar login:", error);
        res.status(500).send(error.message);
    }
}

function putAtualizaNotificacao(req, res){
    try {
        const dadosUsuario = req.body;
        console.log("Dados recebidos para atualização do usuário: ", dadosUsuario);
        atualizaNotificacao(dadosUsuario);
        res.status(201).json({
            mensagem: "Dias de notificações editado com sucesso"            
        });
    } catch (error) {
        console.error('Erro ao editar usuário:', error);
        res.status(500).send(error.message);
    }
}


module.exports = {   
    postNovoUsuario,
    getTodosUsuarios,
    getVerificacaoLogin,
    putAtualizaNotificacao
};