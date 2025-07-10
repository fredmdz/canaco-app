import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";

import useSession from "../hooks/useSession";
import { PreLoader } from "../components/ui";
import NavigationLogin from "./NavigationLogin";
import NavigationDrawer from "./NavigationDrawer";
import { theme } from "../constants/theme";

export default function Navigation() {
  const { isLoaded, user } = useSession();

  useEffect(() => {
    function start() {
      console.log("start app -------------------------");
    }
    start();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        {!isLoaded && <PreLoader />}
        {isLoaded && !user ? <NavigationLogin /> : user && <NavigationDrawer />}
      </NavigationContainer>
    </PaperProvider>
  );
}
