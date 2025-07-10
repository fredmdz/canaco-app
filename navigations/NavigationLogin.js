import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../views/login/Login";
import Start from "../views/login/Start";
import Register from "../views/login/Register";
import ForgotPassword from "../views/login/ForgotPassword";
import { routes } from "../routes";
import { optionsScreen } from "./constants/optionsScreen";

const Stack = createNativeStackNavigator();

export default function NavigationLogin() {
  return (
    <Stack.Navigator
      initialRouteName={routes.START.INDEX}
      screenOptions={optionsScreen.OPTIONS_LOGIN}
    >
      <Stack.Screen
        name={routes.START.INDEX}
        component={Start}
        options={{ headerShown: false }} // Oculta el header en Start
      />
      <Stack.Screen
        name={routes.START.LOGIN}
        component={Login}
        options={{ title: "Iniciar sesión" }}
      />
      <Stack.Screen
        name={routes.START.REGISTER}
        component={Register}
        options={{ title: "Registro" }}
      />
      <Stack.Screen
        name={routes.START.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={{ title: "Olvidé mi contraseña" }}
      />
    </Stack.Navigator>
  );
}
