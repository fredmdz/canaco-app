import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListaMascotas from "../../views/misMascotas/ListaMascotas";
import AgregarMascota from "../../views/misMascotas/AgregarMascota";
import { routes } from "../../routes";
import { optionsScreen } from "../constants/optionsScreen";

const Stack = createNativeStackNavigator();

export default function NavigationMisMascotas() {
  return (
    <Stack.Navigator initialRouteName={routes.MIS_MASCOTAS.LISTA_MASCOTAS} screenOptions={optionsScreen.OPTIONS_STACK}>
      <Stack.Screen
        name={routes.MIS_MASCOTAS.LISTA_MASCOTAS}
        component={ListaMascotas}
        options={{ title: "Mis mascotas" }}
      />
      <Stack.Screen
        name={routes.MIS_MASCOTAS.AGREGAR_MASCOTA}
        component={AgregarMascota}
        options={({ route }) => ({ title: route.params.nameTitle })}
      />
    </Stack.Navigator>
  );
}
