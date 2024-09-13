import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function InicioScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Bem-vindo ao ATHELA!</Text>
        <Text style={styles.description}>
          Seu aliado ideal para gerenciar prazos e acompanhar o progresso dos seus clientes.
          Torne sua gestão mais eficiente e prática com a nossa solução!
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.infoText}>Já possui uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}> Entre</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0B0FF', // Lilás claro
    paddingHorizontal: 20,
    justifyContent: 'space-between', // Espaça conteúdo no topo e no fim da tela
  },
  header: {
    alignItems: 'center',
    marginTop: 200, // Posição centralizada na tela
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4B0082', // Roxo escuro
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4B0082', // Roxo escuro
    paddingHorizontal: 20,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 50, // Espaçamento na parte inferior
  },
  button: {
    backgroundColor: '#4B0082', // Roxo escuro
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '70%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  linkText: {
    fontSize: 16,
    color: '#4B0082',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});