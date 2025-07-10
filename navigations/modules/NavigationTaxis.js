import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListaTaxis from "../../views/taxis/ListaTaxis";
import VerTaxi from "../../views/taxis/VerTaxi";
import { routes } from "../../routes";
import { optionsScreen } from "../constants/optionsScreen";

const Stack = createNativeStackNavigator();

export default function NavigationTaxis() {
  return (
    <Stack.Navigator initialRouteName={routes.TAXIS.LISTA_TAXIS} screenOptions={optionsScreen.OPTIONS_STACK}>
      <Stack.Screen name={routes.TAXIS.LISTA_TAXIS} component={ListaTaxis} options={{ title: "Transporte" }} />
      <Stack.Screen
        name={routes.TAXIS.VER_TAXI}
        component={VerTaxi}
        options={{ title: "Información del transporte" }}
      />
    </Stack.Navigator>
  );
}
