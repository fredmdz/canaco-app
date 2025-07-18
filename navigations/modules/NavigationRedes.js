import { createNativeStackNavigator } from "@react-navigation/native-stack";

import VerRedes from "../../views/redes/VerRedes"; 

import { routes } from "../../routes";
import { optionsScreen } from "../constants/optionsScreen";

const Stack = createNativeStackNavigator();

export default function NavigationRedes() {
  return (
    <Stack.Navigator initialRouteName={routes.REDES.VER_REDES} screenOptions={optionsScreen.OPTIONS_STACK}>
      <Stack.Screen
        name={routes.REDES.VER_REDES}
        component={VerRedes}
        options={{
          title: "Nuestras Redes Sociales", 
          headerShown: true, // <-- IMPORTANT: This ensures the header (and back button) is visible
        }}
      />
    </Stack.Navigator>
  );
}