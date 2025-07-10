import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListaOfertas from "../../views/ofertas/ListaOfertas";
import VerOferta from "../../views/ofertas/VerOferta";
import { routes } from "../../routes";
import { optionsScreen } from "../constants/optionsScreen";

const Stack = createNativeStackNavigator();

export default function NavigationOfertas() {
  return (
    <Stack.Navigator initialRouteName={routes.OFERTAS.LISTA_OFERTAS} screenOptions={optionsScreen.OPTIONS_STACK}>
      <Stack.Screen name={routes.OFERTAS.LISTA_OFERTAS} component={ListaOfertas} options={{ title: "Promociones" }} />
      <Stack.Screen
        name={routes.OFERTAS.VER_OFERTA}
        component={VerOferta}
        options={{ title: "Detalles de la promoción" }}
      />
    </Stack.Navigator>
  );
}
