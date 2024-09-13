import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function BotaoSair() {
  const navigation = useNavigation();  

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
      <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
      <Text style={styles.buttonText}>Sair</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#4B0082',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 8,
  },
});