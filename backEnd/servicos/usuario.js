const fs = require("fs")

function criaUsuario(usuarioNovo) {
    console.log('Dados recebidos para criação do usuário:', usuarioNovo);
    const usuariosAtuais = JSON.parse(fs.readFileSync("BD/UsuariosBD.json"))
    const novosUsuarios = [...usuariosAtuais, usuarioNovo]
    fs.writeFileSync("BD/UsuariosBD.json", JSON.stringify(novosUsuarios))
}

function getListaDeUsuarios() {
    return JSON.parse(fs.readFileSync("BD/UsuariosBD.json"))
}

function verificaLoginRetornaUsuario(dadosUsuario) {

    console.log('Dados recebidos para verificação do usuário:', dadosUsuario);

    const usuarios = JSON.parse(fs.readFileSync("BD/UsuariosBD.json"));

    // Encontrar o usuário pelo email
    const usuarioEncontrado = usuarios.find(usuario => usuario.email === dadosUsuario.email);

    if (!usuarioEncontrado) {
        return "Email não encontrado"; // Retorna esta mensagem se o email não for encontrado
    }

    // Verificar se a senha está correta
    if (usuarioEncontrado.senha !== dadosUsuario.senha) {
        return "Senha inválida"; // Retorna esta mensagem se a senha estiver incorreta
    }

    return {
        id: usuarioEncontrado.id,
        diasParaNotificacao: usuarioEncontrado.diasParaNotificacao
    };
}


function atualizaNotificacao(dadosUsuario) {
    console.log('Dados recebidos para verificação do usuário:', dadosUsuario);
    
    // Lê o arquivo JSON de usuários
    const usuarios = JSON.parse(fs.readFileSync("BD/UsuariosBD.json"));

    // Encontrar o índice do usuário pelo ID
    const usuarioIndex = usuarios.findIndex(usuario => usuario.id === dadosUsuario.id);

    if (usuarioIndex !== -1) {
        // Atualiza o atributo diasParaNotificacao no índice encontrado
        usuarios[usuarioIndex].diasParaNotificacao = dadosUsuario.notificacao;

        // Salva as alterações no arquivo JSON
        fs.writeFileSync("BD/UsuariosBD.json", JSON.stringify(usuarios));

        console.log('Notificação atualizada com sucesso!');
    } else {
        console.log('Usuário não encontrado.');
        throw new Error("Usuário não encontrado");
    }
}

module.exports = {
    criaUsuario,
    getListaDeUsuarios,
    verificaLoginRetornaUsuario,
    atualizaNotificacao
}