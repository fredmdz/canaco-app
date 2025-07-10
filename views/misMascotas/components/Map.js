import { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import MapView from "react-native-maps";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import useLocationUser from "../../../hooks/useLocationUser";

import marker from "../../../assets/mapas/marker.png";

export default function Map({ hookForm, lat, long }) {
  //========================= Hook location
  const { location, setLocation } = useLocationUser();

  function onMapPress(e) {
    setLocation({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude });
  }

  useEffect(() => {
    if (location) {
      hookForm.setValue(lat, location.latitude, { shouldValidate: true });
      hookForm.setValue(long, location.longitude, { shouldValidate: true });
    }
  }, [location]);

  return (
    <View>
      <Text variant="labelLarge" style={styles.label}>
        Ubicación
      </Text>
      <Text variant="labelMedium" style={styles.label2}>
        Selecciona tu ubicación aproximada
      </Text>
      <View>
        {location ? (
          <>
            <MapView
              style={styles.map}
              zoomControlEnabled={true}
              showsUserLocation={true}
              minZoomLevel={15}
              maxZoomLevel={20}
              onPress={onMapPress}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
              }}
              provider={PROVIDER_GOOGLE}
            >
              <Marker
                key={1}
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
              >
                <Image source={marker} />
              </Marker>
            </MapView>
          </>
        ) : (
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Text variant="labelLarge" style={{ textAlign: "center", marginBottom: 10 }}>
              Cargando mapa
            </Text>
            <ActivityIndicator size={30} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
  },
  label2: {
    textAlign: "center",
    marginBottom: 10,
    color: "#6e6e6e",
  },
  map: {
    width: "100%",
    height: 400,
  },
});
