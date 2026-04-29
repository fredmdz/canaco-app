// navigations/modules/NavigationInicio.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import VerInicio from '../../views/inicio/VerInicio'; 
import { routes } from '../../routes'; 
import { optionsScreen } from '../constants/optionsScreen'; 

const Stack = createStackNavigator();

export default function NavigationInicio() {
  return (
    <Stack.Navigator
      initialRouteName={routes.INICIO.INDEX} 
      screenOptions={optionsScreen.OPTIONS_STACK} 
    >
      <Stack.Screen
        name={routes.INICIO.INDEX} 
        component={VerInicio}
        options={{ headerShown: false }} 
      />
      //<Stack.Screen
        //name={routes.INICIO.DETALLE_NOTICIA} 
        //component={DetalleNoticia} 
        //options={{ title: 'Detalle de Noticia' }} 
      />
    </Stack.Navigator>
  );
}