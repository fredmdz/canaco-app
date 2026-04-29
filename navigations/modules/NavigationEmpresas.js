import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MenuScreen from '../../views/menu/Menu';
import EmpresaDetalleScreen from '../../views/menu/EmpresaDetalle';

import { routes } from "../../routes"; 
import { optionsScreen } from "../constants/optionsScreen"; 

const Stack = createNativeStackNavigator();

export default function NavigationEmpresas() {
  return (
    <Stack.Navigator
      initialRouteName="MenuScreen"
      screenOptions={optionsScreen.OPTIONS_STACK} 
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