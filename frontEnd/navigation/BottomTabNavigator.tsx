import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CadastroScreen from '../screens/CadastraClientes';
import ConsultaScreen from '../screens/ConsultaClientes'; // Supondo que você criará esta tela
import { FontAwesome } from '@expo/vector-icons'; // Se estiver usando Expo

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Cadastro de Cliente') {
            iconName = focused ? 'user-plus' : 'user-plus';
          } else if (route.name === 'Consulta de Cliente') {
            iconName = focused ? 'search' : 'search';
          }

          // Você pode retornar qualquer componente de ícone que deseja usar aqui
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4B0082',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Cadastro de Cliente" component={CadastroScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Consulta de Cliente" component={ConsultaScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}