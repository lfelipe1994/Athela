import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, Switch, Modal, TouchableOpacity, Alert } from 'react-native';
import { useLogado } from '../../context/logadoContext';
import { Ionicons } from '@expo/vector-icons';
import { buscaClientesDoUsuario, concluiProjeto } from '../../services/cliente';

// Função para formatar a data no estilo "06 de agosto de 2024"
const formatarData = (dataString: string) => {
  const data = new Date(dataString);
  const dia = data.getDate();
  const mes = data.toLocaleString('pt-BR', { month: 'long' });
  const ano = data.getFullYear();
  return `${dia} de ${mes} de ${ano}`;
};

// Função para calcular a diferença de dias entre a data atual e a data do prazo
const calcularDiasRestantes = (prazo: string) => {
  const dataAtual = new Date();
  const dataPrazo = new Date(prazo);
  const diffTime = dataPrazo.getTime() - dataAtual.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Função para ordenar os clientes pelo prazo, do mais próximo para o mais distante
const ordenarClientesPorPrazo = (clientes: any[]) => {
  return clientes.sort((a, b) => {
    const prazoA = new Date(a.prazo).getTime();
    const prazoB = new Date(b.prazo).getTime();
    return prazoA - prazoB;
  });
};

// Função para determinar a cor do fundo do card e do texto com base no status
const obterEstilosDoCard = (status: number) => {
  if (status === 1) {
    return {
      backgroundColor: '#4B0082',
      borderColor: '#FFFFFF',
      textoCor: '#FFFFFF',
    };
  } else {
    return {
      backgroundColor: '#FFFFFF',
      borderColor: '#4B0082',
      textoCor: '#333333',
    };
  }
};

export default function ConsultaClientes() {
  const { clientes, setClientes, idUsuario } = useLogado();
  const [ocultarEntregues, setOcultarEntregues] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<any>(null);

  // Filtra a lista de clientes com base no estado do checkbox
  const clientesFiltrados = clientes.filter(cliente => !ocultarEntregues || cliente.status === 0);

  // Ordena os clientes filtrados pelo prazo
  const clientesOrdenados = ordenarClientesPorPrazo(clientesFiltrados);

  const abrirModal = (cliente: any) => {
    setClienteSelecionado(cliente);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setClienteSelecionado(null);
  };

  // Função para marcar o projeto como concluído
  const marcarComoConcluido = async () => {
    if (!clienteSelecionado) return;
    
    try {
      // Chama a função para concluir o projeto
      await concluiProjeto(clienteSelecionado.id);

      // Atualiza a lista de clientes
      const resposta = await buscaClientesDoUsuario(idUsuario);
      setClientes(resposta.data);

      // Fecha o modal
      fecharModal();
    } catch (error) {
      console.error('Erro ao marcar como concluído:', error);
      Alert.alert('Erro', 'Não foi possível concluir o projeto.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="search" size={26} color="#4B0082" style={styles.icon} />
        <Text style={styles.title}>Consulta de Cliente</Text>
      </View>
      <View style={styles.conteudo}>
        <View style={styles.checkboxContainer}>
          <Switch
            value={ocultarEntregues}
            onValueChange={setOcultarEntregues}
          />
          <Text style={styles.checkboxLabel}>Ocultar projetos entregues</Text>
        </View>
        {clientesOrdenados.length > 0 ? (
          <FlatList
            data={clientesOrdenados}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const estilos = obterEstilosDoCard(item.status);
              return (
                <TouchableOpacity
                  style={[styles.card, { backgroundColor: estilos.backgroundColor, borderColor: estilos.borderColor }]}
                  onPress={() => item.status === 0 && abrirModal(item)}
                >
                  <Text style={[styles.projeto, { color: estilos.textoCor }]}>{item.projeto}</Text>
                  <View style={styles.nomeDiasContainer}>
                    <Text style={[styles.nome, { color: estilos.textoCor }]}>{item.nome}</Text>
                    <Text style={[styles.diasRestantes, { color: estilos.textoCor }]}>
                      {item.status === 1 ? 'Entregue' : `${calcularDiasRestantes(item.prazo)} dias restantes`}
                    </Text>
                  </View>
                  <Text style={[styles.email, { color: estilos.textoCor }]}>{item.email}</Text>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <Text style={styles.emptyText}>Nenhum cliente encontrado.</Text>
        )}
      </View>

      {clienteSelecionado && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={fecharModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={fecharModal}>
                <Ionicons name="close" size={26} color="#000000" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Detalhes do Cliente</Text>
              <Text style={styles.modalText}>Nome: {clienteSelecionado.nome}</Text>
              <Text style={styles.modalText}>Projeto: {clienteSelecionado.projeto}</Text>
              <Text style={styles.modalText}>Email: {clienteSelecionado.email}</Text>
              <Text style={styles.modalText}>Prazo: {formatarData(clienteSelecionado.prazo)}</Text>
              <TouchableOpacity style={styles.concluirButton} onPress={marcarComoConcluido}>
                <Text style={styles.concluirButtonText}>Marcar como concluído</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flexDirection: 'column',
    backgroundColor: '#E0B0FF',
    justifyContent: 'space-around'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingLeft: 15,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4B0082',
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingBottom: 15,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#4B0082',
    marginLeft: 5,
  },
  conteudo: {
    height: '100%',
    justifyContent: 'center',
    paddingVertical: 25,
  },
  card: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  projeto: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nomeDiasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nome: {
    fontSize: 14,
    marginBottom: 5,
  },
  diasRestantes: {
    fontSize: 14,
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',    
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  concluirButton: {
    backgroundColor: '#4B0082',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,    
    alignItems: 'center',
  },
  concluirButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});