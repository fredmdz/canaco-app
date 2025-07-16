// navigation/modules/NavigationEmpresas.js
import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getHeaderTitle } from '@react-navigation/elements'; // Necesario para obtener el título de la pantalla
import { Appbar, useTheme } from 'react-native-paper'; // 'useTheme' no es estrictamente necesario aquí si el color es fijo, pero es una buena práctica si usas el tema global.
import { Platform } from 'react-native'; // Necesario para 'Platform.OS'

// Importa tus componentes de pantalla de empresas
import MenuScreen from '../../views/menu/Menu'; // Asegura que esta ruta sea correcta
import EmpresaDetalleScreen from '../../views/menu/EmpresaDetalle'; // Asegura que esta ruta sea correcta

const Stack = createNativeStackNavigator();

export default function NavigationEmpresas() {
  // Puedes usar useTheme() si quieres acceder a las propiedades del tema global de Paper,
  // pero para un color fijo, no es estrictamente necesario aquí.
  // const theme = useTheme(); 

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
        options={{ title: "Empresas" }} // Título que se mostrará en el header para esta pantalla
      />
      <Stack.Screen
        name="EmpresaDetalle"
        component={EmpresaDetalleScreen}
        // El título de esta pantalla se tomará del nombre de la empresa pasada como parámetro
        options={({ route }) => ({ title: route.params.empresa.nombre || 'Detalle de Empresa' })}
      />
    </Stack.Navigator>
  );
}