import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListaMascotas from "../../views/clubRazas/ListaMascotas";
import VerMascota from "../../views/clubRazas/VerMascota";
import { routes } from "../../routes";
import { optionsScreen } from "../constants/optionsScreen";

const Stack = createNativeStackNavigator();

export default function NavigationClubRazas() {
  return (
    <Stack.Navigator initialRouteName={routes.CLUB_RAZAS.LISTA_MASCOTAS} screenOptions={optionsScreen.OPTIONS_STACK}>
      <Stack.Screen
        name={routes.CLUB_RAZAS.LISTA_MASCOTAS}
        component={ListaMascotas}
        options={{ title: "Club de razas" }}
      />
      <Stack.Screen
        name={routes.CLUB_RAZAS.VER_MASCOTA}
        component={VerMascota}
        options={{ title: "Información de la mascota" }}
      />
    </Stack.Navigator>
  );
}
