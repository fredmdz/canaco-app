import { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";

export default function useLocationUser() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    async function get() {
      const response = await Location.requestForegroundPermissionsAsync();
      if (!response.granted) {
        Alert.alert("", "Debes de proporcionar permisos para acceder a tu ubicación");
        return;
      }

      const location = await Location.getLastKnownPositionAsync({});
      setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    }
    get();
  }, []);

  return { location, setLocation };
}
