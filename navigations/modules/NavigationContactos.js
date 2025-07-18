import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListaContactos from "../../views/contactos/ListaContactos";
import VerContacto from "../../views/contactos/VerContacto";
import VerFormulario from "../../views/contactos/VerFormulario";
import { routes } from "../../routes";
import { optionsScreen } from "../constants/optionsScreen";

const Stack = createNativeStackNavigator();

export default function NavigationContactos() {
  return (
    <Stack.Navigator initialRouteName={routes.CONTACTOS.LISTA_CONTACTOS} screenOptions={optionsScreen.OPTIONS_STACK}>
      <Stack.Screen
        name={routes.CONTACTOS.LISTA_CONTACTOS}
        component={ListaContactos}
        options={{ title: "Directorio" }}
      />
      <Stack.Screen name={routes.CONTACTOS.VER_CONTACTO} component={VerContacto} options={{ title: "Contacto" }} />
      <Stack.Screen
        name={routes.CONTACTOS.VER_FORMULARIO}
        component={VerFormulario}
        options={{ title: "Formulario" }}
      />
    </Stack.Navigator>
  );
}
