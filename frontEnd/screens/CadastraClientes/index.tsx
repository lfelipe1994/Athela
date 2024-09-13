import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLogado } from '../../context/logadoContext';
import { adicionaCliente, buscaClientesDoUsuario } from '../../services/cliente';
import uuid from 'react-native-uuid';
import DateTimePicker from '@react-native-community/datetimepicker';
import { atualizaNotificacao } from '../../services/usuario';
import BotaoSair from '../../components/botaoSair';

export default function CadastraClientes() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isConfigVisible, setIsConfigVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [projeto, setProjeto] = useState('');
  const [prazo, setPrazo] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [diasAviso, setDiasAviso] = useState('');

  const { idUsuario, setClientes, clientes, diasNotificacao } = useLogado();

  useEffect(() => {
    verificarClientesProximosPrazo();
  }, []);

  const calcularDiasRestantes = (prazo: Date) => {
    const dataAtual = new Date();
    const diffTime = prazo.getTime() - dataAtual.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const verificarClientesProximosPrazo = () => {
    
    const diasNotificacaoNumero = parseInt(diasNotificacao, 10);
    
    // Filtra clientes que estão próximos da data limite e cujo status não é 1
    const clientesExpirando = clientes.filter(cliente => {
      if (cliente.prazo && cliente.status !== 1) {
        const diasRestantes = calcularDiasRestantes(new Date(cliente.prazo));        
        return diasRestantes <= diasNotificacaoNumero;
      }
      return false;
    });
  
    // Exibe o alerta se houver clientes com prazo próximo
    if (clientesExpirando.length > 0) {
      const mensagemProjetos = clientesExpirando.map(cliente => {
        const diasRestantes = calcularDiasRestantes(new Date(cliente.prazo));
        return `${cliente.nome} - ${diasRestantes} dias restantes`;
      }).join('\n');
  
      const mensagemFinal = clientesExpirando.length > 1
        ? `Atenção! Esses projetos estão perto de chegar na data limite:\n\n${mensagemProjetos}`
        : `Atenção! Esse projeto está perto de chegar na data limite:\n\n${mensagemProjetos}`;
  
      Alert.alert(
        '',  // Título vazio
        mensagemFinal,  // Mensagem
        [{ text: 'Ok', style: 'default' }]
      );
    }
  };

  const handleFormSubmit = async () => {
    try {
      const novoCliente: any = {
        id: uuid.v4(),
        IdDoUsuario: idUsuario,
        nome,
        email,
        projeto,
        prazo: prazo ? prazo.toISOString() : null,
        status: 0,
      };

      await adicionaCliente(novoCliente);
      const clientesAtualizados = await buscaClientesDoUsuario(idUsuario);
      setClientes(clientesAtualizados.data);

      Alert.alert('Sucesso', 'Cliente adicionado com sucesso!');

      setNome('');
      setEmail('');
      setProjeto('');
      setPrazo(null);
      setIsFormVisible(false);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao adicionar o cliente.');
      console.error("Erro ao adicionar cliente:", error);
    }
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || prazo;
    setShowDatePicker(Platform.OS === 'ios');
    setPrazo(currentDate);
  };

  const handleConfigSubmit = () => {
    const dadosUsuario = {
      id: idUsuario,
      notificacao: diasAviso,
    };

    atualizaNotificacao(dadosUsuario);
    Alert.alert('Configuração de Aviso', `Notificações serão emitidas quando faltar ${diasAviso} dias para o prazo.`);
    setIsConfigVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-add" size={26} color="#4B0082" style={styles.icon} />
        <Text style={styles.title}>Cadastro de Cliente</Text>
      </View>
      <View style={styles.conteudo}>
        {!isFormVisible && !isConfigVisible && (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setIsFormVisible(true);
                setIsConfigVisible(false);
              }}
            >
              <Text style={styles.buttonText}>Adicione novo cliente</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setIsFormVisible(false);
                setIsConfigVisible(true);
              }}
            >
              <Text style={styles.buttonText}>Configure os avisos</Text>
            </TouchableOpacity>
            <BotaoSair/>
          </>
        )}
        {isFormVisible && (
          <View style={styles.form}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsFormVisible(false)}
            >
              <Ionicons name="close" size={24} color="#4B0082" />
            </TouchableOpacity>
            <Text style={styles.formText}>Preencha os dados do seu cliente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Projeto"
              value={projeto}
              onChangeText={setProjeto}
            />
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.datePickerText}>
                {prazo ? prazo.toLocaleDateString() : 'Selecione uma data'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={prazo || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
                style={styles.dateTimePicker}
              />
            )}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleFormSubmit}
            >
              <Text style={styles.submitButtonText}>Adicionar Cliente</Text>
            </TouchableOpacity>
          </View>
        )}
        {isConfigVisible && (
          <View style={styles.configSection}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsConfigVisible(false)}
            >
              <Ionicons name="close" size={26} color="#4B0082" />
            </TouchableOpacity>
            <Text style={styles.configText}>
              Receber avisos de acordo com quantos dias restantes até o prazo?
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Número de dias"
              keyboardType="numeric"
              value={diasAviso}
              onChangeText={setDiasAviso}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleConfigSubmit}
            >
              <Text style={styles.submitButtonText}>Salvar Configuração</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flexDirection: 'column',
    backgroundColor: '#E0B0FF',
    justifyContent: 'space-around',
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
  conteudo: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4B0082',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderColor: '#4B0082',
    borderWidth: 1,
    width: '90%',
    alignItems: 'center',
    position: 'relative',
  },
  formText: {
    marginBottom: 20,
    fontSize: 16,
    color: '#4B0082',
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderColor: '#4B0082',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '100%',
    marginBottom: 15,
  },
  datePickerButton: {
    width: '100%',
    borderColor: '#4B0082',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
  },
  datePickerText: {
    color: '#4B0082',
    fontSize: 16,
  },
  dateTimePicker: {
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#4B0082',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  configSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderColor: '#4B0082',
    borderWidth: 1,
    width: '90%',
    alignItems: 'center',
    position: 'relative',
  },
  configText: {
    marginBottom: 20,
    fontSize: 16,
    color: '#4B0082',
    textAlign: 'center',
  },
});