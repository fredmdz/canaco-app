import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListaPreguntas from "../../views/contactos/ListaPreguntas";
import VerPregunta from "../../views/contactos/VerPregunta";
import VerFormulario from "../../views/contactos/VerFormulario";
import { routes } from "../../routes";
import { optionsScreen } from "../constants/optionsScreen";

const Stack = createNativeStackNavigator();

export default function NavigationContactos() {
  return (
    <Stack.Navigator initialRouteName={routes.CONTACTOS.LISTA_PREGUNTAS} screenOptions={optionsScreen.OPTIONS_STACK}>
      <Stack.Screen
        name={routes.CONTACTOS.LISTA_PREGUNTAS}
        component={ListaPreguntas}
        options={{ title: "Contactanos" }}
      />
      <Stack.Screen name={routes.CONTACTOS.VER_PREGUNTA} component={VerPregunta} options={{ title: "Pregunta" }} />
      <Stack.Screen
        name={routes.CONTACTOS.VER_FORMULARIO}
        component={VerFormulario}
        options={{ title: "Formulario" }}
      />
    </Stack.Navigator>
  );
}
