import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListaPreguntas from "../../views/preguntas/ListaPreguntas";
import VerPregunta from "../../views/preguntas/VerPregunta";
import { routes } from "../../routes";
import { optionsScreen } from "../constants/optionsScreen";

const Stack = createNativeStackNavigator();

export default function NavigationPreguntasFrecuentes() {
  return (
    <Stack.Navigator initialRouteName={routes.PREGUNTAS.LISTA_PREGUNTAS} screenOptions={optionsScreen.OPTIONS_STACK}>
      <Stack.Screen
        name={routes.PREGUNTAS.LISTA_PREGUNTAS}
        component={ListaPreguntas}
        options={{ title: "Preguntas frecuentes" }}
      />
      <Stack.Screen
        name={routes.PREGUNTAS.VER_PREGUNTA}
        component={VerPregunta}
        options={{ title: "Detalle de pregunta" }}
      />
    </Stack.Navigator>
  );
}
