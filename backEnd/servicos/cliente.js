const fs = require("fs")

function getClientesPorId(id) {
    console.log('Buscando clientes para o ID do usuário:', id);

    // Ler e parsear o conteúdo do arquivo JSON
    const clientes = JSON.parse(fs.readFileSync("BD/ClientesBD.json"));

    // Filtrar os clientes pelo IdDoUsuario
    const clientesDoUsuario = clientes.filter(cliente => cliente.IdDoUsuario === id);

    return clientesDoUsuario;
}

function criaCliente(novoCliente) {
    console.log('Dados recebidos para criação do cliente:', novoCliente);

    // Ler e parsear o conteúdo do arquivo JSON
    const clientesAtuais = JSON.parse(fs.readFileSync("BD/ClientesBD.json"));

    // Adicionar o novo cliente à lista existente
    const novosClientes = [...clientesAtuais, novoCliente];

    // Escrever a lista atualizada de volta no arquivo
    fs.writeFileSync("BD/ClientesBD.json", JSON.stringify(novosClientes));
}

function concluiCliente(idCliente){
    const clientes = JSON.parse(fs.readFileSync("BD/ClientesBD.json"));
    const clienteIndex = clientes.findIndex(cliente => cliente.id === idCliente);

    if (clienteIndex !== -1) {
        // Atualiza o atributo diasParaNotificacao no índice encontrado
        clientes[clienteIndex].status = 1;

        // Salva as alterações no arquivo JSON
        fs.writeFileSync("BD/ClientesBD.json", JSON.stringify(clientes));        

        console.log('Notificação atualizada com sucesso!');
    } else {
        console.log('Usuário não encontrado.');
        throw new Error("Usuário não encontrado");
    }
}

module.exports = {
    getClientesPorId,
    criaCliente,
    concluiCliente
}