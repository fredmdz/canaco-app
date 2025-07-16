// navigation/constants/optionsScreen.js

import LeftIcon from "../../components/icons/LeftIcon";

const optionsScreen = {
  OPTIONS_STACK: {
    headerStyle: { backgroundColor: "#314c95" },
    headerTintColor: "#fff",
  
    headerLeft: LeftIcon,
  },

  OPTIONS_LOGIN: {
    headerStyle: { backgroundColor: "#314c95" },
    headerTintColor: "#fff",
  },

  OPTIONS_DRAWER: {
    headerStyle: { backgroundColor: "#314c95" },
    headerTintColor: "#fff",
    drawerActiveTintColor: "#314c95", // <-- ¡CAMBIO CLAVE AQUÍ!
    drawerLabelStyle: {
      color: "#fff", // Color del texto del label inactivo (por defecto, sigue siendo blanco)
    },
    drawerActiveBackgroundColor: "#00000030",
    drawerStyle: {
      backgroundColor: "#ffffffff",
      color: "#fff",
      width: 250,
    },
    drawerItemStyle: {
      padding: 0,
      marginVertical: 4,
    },
  },
};

export { optionsScreen };