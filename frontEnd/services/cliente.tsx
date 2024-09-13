import { api } from '../api/api';


export const buscaClientesDoUsuario = async (idUsuario: any) => {
    try {
        console.log("Chamada para buscaClientesDoUsuario com ID:", idUsuario);
        const resposta = await api.get(`/cliente/${idUsuario}`);
        console.log("Resposta de buscaClientesDoUsuario:", resposta);
        return resposta;
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        throw error; // Re-throw the error to be caught in marcarComoConcluido
    }
};

export const adicionaCliente = async (novoCliente: any) => {
    try {
        const resposta = await api.post("/cliente/adicionar", novoCliente)
        return resposta;
    } catch (error) {
        console.error("Erro ao adicionar usuario:", error);
        throw error;
    }
};

export const concluiProjeto = async (idCliente: any) => {
    try {
        console.log("Chamada para concluiProjeto com ID:", idCliente);
        const resposta = await api.put(`/cliente/concluir/${idCliente}`);
        console.log("Resposta de concluiProjeto:", resposta);
        return resposta;
    } catch (error) {
        console.error("Erro ao concluir projeto:", error);
        throw error; // Re-throw the error to be caught in marcarComoConcluido
    }
};