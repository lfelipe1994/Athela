import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importar o ícone de seta
import { verificaLogin } from '../../services/usuario';
import { useLogado } from '../../context/logadoContext';
import { buscaClientesDoUsuario } from '../../services/cliente';

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const { setLogado, setClientes, setIdUsuario, setDiasNotificacao } = useLogado(); // Use o contexto

  const handleLogin = async () => {
    try {
      const dadosUsuario = { email, senha };
      const usuario = await verificaLogin(dadosUsuario);

      console.log("o usuario foi: ", usuario)

      // Comparar resposta.data, que é a string retornada pelo backend
      if (usuario === "Email não encontrado") {
        Alert.alert('Erro', 'Email não encontrado.');
      } else if (usuario === "Senha inválida") {
        Alert.alert('Erro', 'Senha inválida.');
      } else {
        const respostaClientes = await buscaClientesDoUsuario(usuario.id);
        const clientes = respostaClientes.data; // Assumindo que os clientes estão na propriedade 'data'
        
        setIdUsuario(usuario.id);
        setDiasNotificacao(usuario.diasParaNotificacao)
        setClientes(clientes); // Atualiza o estado de clientes
        
        setLogado(true); // Atualiza o estado de login
        navigation.navigate('Main'); // Navega para o BottomTabNavigator
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
      console.error("Erro no login:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Inicio')}
      >
        <Ionicons name="arrow-back" size={32} color="#4B0082" />
      </TouchableOpacity>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={styles.infoText}>Não possui uma conta?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.linkText}> Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0B0FF', // Lilás claro
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 15,
    zIndex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4B0082', // Roxo escuro
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF', // Branco
    borderColor: '#4B0082', // Roxo escuro
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4B0082', // Roxo escuro
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF', // Branco
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
  },
  linkText: {
    color: '#4B0082', // Roxo escuro
    fontWeight: 'bold',
  },
});