import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListaVeterinarios from "../../views/veterinarios/ListaVeterinarios";
import VerVeterinario from "../../views/veterinarios/VerVeterinario";
import { routes } from "../../routes";
import { optionsScreen } from "../constants/optionsScreen";

const Stack = createNativeStackNavigator();

export default function NavigationVeterinarios() {
  return (
    <Stack.Navigator
      initialRouteName={routes.VETERINARIOS.LISTA_VETERINARIOS}
      screenOptions={optionsScreen.OPTIONS_STACK}
    >
      <Stack.Screen
        name={routes.VETERINARIOS.LISTA_VETERINARIOS}
        component={ListaVeterinarios}
        options={{ title: "Veterinarios" }}
      />
      <Stack.Screen
        name={routes.VETERINARIOS.VER_VETERINARIO}
        component={VerVeterinario}
        options={{ title: "Información del veterinario" }}
      />
    </Stack.Navigator>
  );
}
