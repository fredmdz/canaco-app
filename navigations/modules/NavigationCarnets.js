import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListaMascotas from "../../views/carnets/ListaMascotas";
import ListaCarnets from "../../views/carnets/ListaCarnets";
import AgregarMascota from "../../views/carnets/AgregarMascota";
import AgregarCarnet from "../../views/carnets/AgregarCarnet";
import { routes } from "../../routes";
import { optionsScreen } from "../constants/optionsScreen";

const Stack = createNativeStackNavigator();

export default function NavigationCarnets() {
  return (
    <Stack.Navigator initialRouteName={routes.CARNETS.LISTA_MASCOTAS} screenOptions={optionsScreen.OPTIONS_STACK}>
      <Stack.Screen
        name={routes.CARNETS.LISTA_MASCOTAS}
        component={ListaMascotas}
        options={{ title: "Mis mascotas" }}
      />
      <Stack.Screen
        name={routes.CARNETS.LISTA_CARNETS}
        component={ListaCarnets}
        options={{ title: "Lista de carnets" }}
      />
      <Stack.Screen
        name={routes.CARNETS.AGREGAR_MASCOTA}
        component={AgregarMascota}
        options={{ title: "Agregar mascota" }}
      />
      <Stack.Screen
        name={routes.CARNETS.AGREGAR_CARNET}
        component={AgregarCarnet}
        options={{ title: "Agregar carnet" }}
      />
    </Stack.Navigator>
  );
}
