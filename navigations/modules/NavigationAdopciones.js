import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListaAdopciones from "../../views/adopciones/ListaAdopciones";
import VerAdopcion from "../../views/adopciones/VerAdopcion";
import { routes } from "../../routes";
import { optionsScreen } from "../constants/optionsScreen";

const Stack = createNativeStackNavigator();

export default function NavigationAdopciones() {
  return (
    <Stack.Navigator initialRouteName={routes.ADOPCIONES.LISTA_ADOPCIONES} screenOptions={optionsScreen.OPTIONS_STACK}>
      <Stack.Screen
        name={routes.ADOPCIONES.LISTA_ADOPCIONES}
        component={ListaAdopciones}
        options={{ title: "Adopciones" }}
      />
      <Stack.Screen
        name={routes.ADOPCIONES.VER_ADOPCION}
        component={VerAdopcion}
        options={{ title: "Información de la mascota" }}
      />
    </Stack.Navigator>
  );
}
