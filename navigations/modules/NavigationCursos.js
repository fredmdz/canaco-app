import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListaCursos from "../../views/cursos/ListaCursos";
import VerCurso from "../../views/cursos/VerCurso"; 

import { routes } from "../../routes";
import { optionsScreen } from "../constants/optionsScreen";

const Stack = createNativeStackNavigator();

export default function NavigationCursos() {
  return (
    <Stack.Navigator
      initialRouteName={routes.CURSOS.LISTA_CURSOS}
      screenOptions={optionsScreen.OPTIONS_STACK}
    >
      <Stack.Screen
        name={routes.CURSOS.LISTA_CURSOS}
        component={ListaCursos}
        options={{ title: "Cursos" }}
      />
      <Stack.Screen
        name={routes.CURSOS.VER_CURSO} 
        component={VerCurso}
        options={{ title: "Información del curso" }}
      />
    </Stack.Navigator>
  );
}
