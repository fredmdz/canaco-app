import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListaBeneficios from "../../views/beneficios/ListaBeneficios";
import VerBeneficio from "../../views/beneficios/VerBeneficio"; // ✅ Import correcto

import { routes } from "../../routes";
import { optionsScreen } from "../constants/optionsScreen";

const Stack = createNativeStackNavigator();

export default function NavigationBeneficios() {
  return (
    <Stack.Navigator
      initialRouteName={routes.BENEFICIOS.LISTA_BENEFICIOS}
      screenOptions={optionsScreen.OPTIONS_STACK}
    >
      <Stack.Screen
        name={routes.BENEFICIOS.LISTA_BENEFICIOS}
        component={ListaBeneficios}
        options={{ title: "Beneficios" }}
      />
      <Stack.Screen
        name={routes.BENEFICIOS.VER_BENEFICIO} // ✅ en singular y desde routes
        component={VerBeneficio}
        options={{ title: "Información del beneficio" }}
      />
    </Stack.Navigator>
  );
}
