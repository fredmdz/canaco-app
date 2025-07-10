import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListaEventos from "../../views/eventos/ListaEventos";
import VerEvento from "../../views/eventos/VerEvento";
import { routes } from "../../routes";
import { optionsScreen } from "../constants/optionsScreen";

const Stack = createNativeStackNavigator();

export default function NavigationEventos() {
  return (
    <Stack.Navigator initialRouteName={routes.EVENTOS.LISTA_EVENTOS} screenOptions={optionsScreen.OPTIONS_STACK}>
      <Stack.Screen name={routes.EVENTOS.LISTA_EVENTOS} component={ListaEventos} options={{ title: "Eventos" }} />
      <Stack.Screen
        name={routes.EVENTOS.VER_EVENTO}
        component={VerEvento}
        options={{ title: "Información del evento" }}
      />
    </Stack.Navigator>
  );
}
