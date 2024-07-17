import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddScreen from './screens/AddScreen';
import DetailScreen from './screens/DetailScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { useAppContext } from './components/AppContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const { user } = useAppContext();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          statusBarColor: '#1976D2',
          headerTintColor: '#FFFFFF',
          headerStyle: {
            backgroundColor: '#2196F3',
          },
        }}>
        {user ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Bantu Sekolah' }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: 'Sekolah Detail' }}
        />
        <Stack.Screen
          name="Add"
          component={AddScreen}
          options={{ title: 'Tambah Sekolah' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
