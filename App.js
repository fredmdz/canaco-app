import "react-native-gesture-handler";
import "react-native-reanimated";
import dayjs from "dayjs";
import "dayjs/locale/es";
import isBetween from "dayjs/plugin/isBetween";

dayjs.locale("es");
dayjs.extend(isBetween);

import Navigation from "./navigations/Navigations"; 
//import { useNotifications } from './hooks/useNotifications'; 

// Importa tu UserProvider desde la carpeta 'context'
import { UserProvider } from './context/UserContext'; 

export default function App() {

  //const { expoPushToken, notification } = useNotifications();

  // console.log("App.js - Expo Push Token from hook:", expoPushToken);
  // console.log("App.js - Last Notification from hook:", notification);

  return (
    // Envuelve tu componente principal de navegación con UserProvider
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
}