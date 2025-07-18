import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VerOpciones from "../../views/opciones/VerOpciones";
import { routes } from "../../routes";
import { optionsScreen } from "../constants/optionsScreen";

const Stack = createNativeStackNavigator();

export default function NavigationOpciones() {
  return (
    <Stack.Navigator
      initialRouteName={routes.OPCIONES.VER_OPCIONES}
      screenOptions={optionsScreen.OPTIONS_STACK}
    >
      <Stack.Screen
        name={routes.OPCIONES.VER_OPCIONES}
        component={VerOpciones}
        options={{ title: "Opciones de la app" }} 
      />
    </Stack.Navigator>
  );
}
