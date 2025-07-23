// navigation/modules/NavigationEmpresas.js
import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getHeaderTitle } from '@react-navigation/elements';
import { Appbar } from 'react-native-paper';
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
          const statusBarHeight = options.statusBarHeight ?? (Platform.OS === 'ios' ? 0 : Appbar.statusBarHeight);

          return (
            <Appbar.Header
              style={{ backgroundColor: '#314c95' }}
              statusBarHeight={statusBarHeight} // ✅ Controlas desde cada pantalla
            >
              {route.name === "MenuScreen" ? (
                <Appbar.Action icon="menu" color="white" onPress={() => navigation.openDrawer()} />
              ) : (
                <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
              )}
              <Appbar.Content title={title} color="white" />
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
        options={({ route }) => ({
          title: route.params.empresa.nombre || 'Detalle de Empresa',
        })}
      />
    </Stack.Navigator>
  );
}
