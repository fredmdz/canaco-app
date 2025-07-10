import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services";

function useSession() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoaded(true);
    });
  }, []);

  return { isLoaded, user };
}
export default useSession;
