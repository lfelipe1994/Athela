const { getClientesPorId, criaCliente, concluiCliente } = require("../servicos/cliente");


function getClientesDoUsuario(req, res){
    try {  
        const id = req.params.id   
        const clientes = getClientesPorId(id) 
        res.send(clientes)
    } catch(error) { 
        res.status(500)
        res.send(error.message)
    }   
}

function postNovoCliente(req, res){
    try {
        const clienteNovo = req.body;
        console.log("Dados recebidos para criação do usuário: ", clienteNovo);
        criaCliente(clienteNovo);
        res.status(201).json({
            mensagem: "Cliente criado com sucesso",
            cliente: clienteNovo
        });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).send(error.message);
    }
}

function putConcluirCliente(req, res){
    try {
        const id = req.params.id
        console.log("id para concluir", id)
        concluiCliente(id);
        res.status(201).json({
            mensagem: "Cliente concluido com sucesso",            
        });
    } catch (error) {
        console.error('Erro ao concluir usuário:', error);
        res.status(500).send(error.message);
    }    
}

module.exports = {   
    getClientesDoUsuario,
    postNovoCliente,
    putConcluirCliente    
};