import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importando suas telas
import HomeScreen from './screens/HomeScreen';
import LancarGastosScreen from './screens/LancarGastosScreen';
import HistoricoScreen from './screens/HistoricoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#2e86de' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Início' }} 
        />
        <Stack.Screen 
          name="LancarGastos" 
          component={LancarGastosScreen} 
          options={{ title: 'Lançar Gastos' }} 
        />
        <Stack.Screen 
          name="Historico" 
          component={HistoricoScreen} 
          options={{ title: 'Histórico de Contas' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}