import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importar o ícone de seta
import uuid from 'react-native-uuid';
import { criaUsuario } from '../../services/usuario';
import { api } from '../../api/api';

export default function Cadastro({ navigation }: any) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');

  const handleCadastro = async () => {

    if (senha !== confirmacaoSenha) {
        Alert.alert('Erro', 'As senhas não coincidem.');
        return;
    }

    const novoUsuario = {
        id: uuid.v4(),
        nome: nome,
        email: email,
        senha: senha,
        diasParaNotificacao: "",
    };

    try {
        const response = await api.post('/usuario/adicionar', novoUsuario);
        console.log(response)
        Alert.alert('Cadastro', 'Cadastro realizado com sucesso!');
        navigation.navigate('Login');
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao realizar o cadastro.');
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
      <Text style={styles.title}>Cadastro</Text>
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
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme a Senha"
        secureTextEntry
        value={confirmacaoSenha}
        onChangeText={setConfirmacaoSenha}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleCadastro}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.infoText}>Já possui uma conta?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.linkText}> Entre</Text>
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
  },
  linkText: {
    color: '#4B0082',
    fontWeight: 'bold',
  },
});