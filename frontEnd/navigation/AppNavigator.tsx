import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator'; // Importe o novo componente
import InicioScreen from '../screens/Inicio';
import CadastroScreen from '../screens/Cadastro';
import LoginScreen from '../screens/Login';
import { LogadoProvider, useLogado } from '../context/logadoContext';

const Stack = createStackNavigator();

export default function AppNavigator() {

  return (
    <LogadoProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Inicio" component={InicioScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </LogadoProvider>
  );
}