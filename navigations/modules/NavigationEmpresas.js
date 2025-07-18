// navigation/modules/NavigationEmpresas.js
import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getHeaderTitle } from '@react-navigation/elements'; 
import { Appbar, useTheme } from 'react-native-paper'; 
import { Platform } from 'react-native'; 


import MenuScreen from '../../views/menu/Menu';
import EmpresaDetalleScreen from '../../views/menu/EmpresaDetalle'; 

const Stack = createNativeStackNavigator();

export default function NavigationEmpresas() {
  
  return (
    <Stack.Navigator
      initialRouteName="MenuScreen"
      screenOptions={{
        header: ({ navigation, route, options }) => {
          const title = getHeaderTitle(options, route.name);

          return (
            <Appbar.Header
              // --- CAMBIO CLAVE AQUÍ: COLOR DEL HEADER ---
              style={{ backgroundColor: '#314c95' }}
              // Ajusta la altura de la barra de estado para Android, si es necesario
              statusBarHeight={Platform.OS === 'ios' ? 0 : Appbar.statusBarHeight} 
            >
              {/* Botón para abrir el Drawer (menú hamburguesa) solo en la pantalla inicial */}
              {route.name === "MenuScreen" ? (
                <Appbar.Action icon="menu" color="white" onPress={() => navigation.openDrawer()} />
              ) : (
                // Botón de retroceso para las pantallas de detalle
                <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
              )}
              {/* Título de la pantalla */}
              <Appbar.Content title={title} color="white" /> 
              {/* Puedes añadir más acciones a la derecha si las necesitas */}
            </Appbar.Header>
          );
        },
      }}
    >
      <Stack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{ title: "Empresas" }} 
      />
      <Stack.Screen
        name="EmpresaDetalle"
        component={EmpresaDetalleScreen}
        options={({ route }) => ({ title: route.params.empresa.nombre || 'Detalle de Empresa' })}
      />
    </Stack.Navigator>
  );
}