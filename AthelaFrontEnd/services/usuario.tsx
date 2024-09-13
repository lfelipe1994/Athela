import { api } from '../api/api';

export const criaUsuario = async (novoUsuario:any) => {
    try {
        const resposta = await api.post("/usuario/criar", novoUsuario)        
        return resposta;
    } catch (error) {
        console.error("Erro ao adicionar usuario:", error);
        throw error;
    }
};

export const verificaLogin = async (dadosUsuario:any) => {
    try {
        const resposta = await api.post("/usuario/verificaLogin", dadosUsuario)
        return resposta.data;
    } catch (error) {
        console.error("Erro ao adicionar usuario:", error);
        throw error;
    }
}

export const atualizaNotificacao = async (dadosUsuario:any) => {
    try {
        const resposta = await api.put("/usuario/atualiza", dadosUsuario);
        console.log(resposta.data)
        return resposta.data;
        
    } catch (error) {
        console.error("Erro ao adicionar meta de notificação:", error);
        throw error;
    }
};