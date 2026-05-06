import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services";

import useSession from "../hooks/useSession";
import { PreLoader } from "../components/ui";
import NavigationLogin from "./NavigationLogin";
import NavigationDrawer from "./NavigationDrawer";
import VerifyEmail from "../views/login/VerifyEmail";
import { theme } from "../constants/theme";

export default function Navigation() {
  const { isLoaded, user: sessionUser } = useSession();
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmailVerified(user.emailVerified);
      }
    });

    const interval = setInterval(async () => {
      if (auth.currentUser) {
        await auth.currentUser.reload();
        setEmailVerified(auth.currentUser.emailVerified);
      }
    }, 3000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        {!isLoaded && <PreLoader />}
        {isLoaded && !sessionUser ? (
          <NavigationLogin />
        ) : sessionUser && !emailVerified ? (
          <VerifyEmail />
        ) : (
          sessionUser && <NavigationDrawer />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
