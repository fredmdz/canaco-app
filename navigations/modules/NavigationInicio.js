// navigations/modules/NavigationInicio.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerActions } from '@react-navigation/native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import VerInicio from '../../views/inicio/VerInicio'; 
import VerEvento from '../../views/eventos/VerEvento';
import VerCurso from '../../views/cursos/VerCurso';
import { routes } from '../../routes'; 
import { optionsScreen } from '../constants/optionsScreen'; 

const Stack = createNativeStackNavigator();

export default function NavigationInicio() {
  return (
    <Stack.Navigator
      initialRouteName={routes.INICIO.INDEX} 
      screenOptions={optionsScreen.OPTIONS_STACK} 
    >
      <Stack.Screen
        name={routes.INICIO.INDEX} 
        component={VerInicio}
        options={({ navigation }) => ({
          title: 'CANACO SERVYTUR',
          headerShown: true,
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: 'normal',
          },
          headerLeft: () => (
            <Icon
              name="menu"
              size={30}
              color="#fff"
              style={{ marginLeft: 5, marginRight: 15 }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
        })}
      />
      <Stack.Screen
        name="homeVerEvento"
        component={VerEvento}
        options={{ title: 'Información del evento' }}
      />
      <Stack.Screen
        name="homeVerCurso"
        component={VerCurso}
        options={{ title: 'Información del curso' }}
      />
    </Stack.Navigator>
  );
}


