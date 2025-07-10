import { StyleSheet, View, Image } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import MapView from "react-native-maps";
import { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";

import useLocationUser from "../../../hooks/useLocationUser";
import { routes } from "../../../routes";

import marker from "../../../assets/mapas/AAA 4.png";

function Map({ listVeterinarios, navigation }) {
  //========================= Hook location
  const { location } = useLocationUser();

  return (
    <View
      style={{
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        overflow: "hidden",
        borderColor: "#39CCE7",
        borderWidth: 1,
      }}
    >
      {location ? (
        <MapView
          style={styles.map}
          zoomControlEnabled={true}
          showsUserLocation={true}
          minZoomLevel={9}
          maxZoomLevel={16}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.015,
          }}
          provider={PROVIDER_GOOGLE}
        >
          {listVeterinarios.map((data, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: data.lat,
                longitude: data.lng,
              }}
              image={marker}
            >
              <Callout
                tooltip={true}
                onPress={() => navigation.navigate(routes.VETERINARIOS.VER_VETERINARIO, { dataVeterinarios: data })}
              >
                <View style={styles.callout}>
                  <Text style={styles.calloutTitle}>{data.name}</Text>
                  <Text style={styles.calloutSubTitle}>{data.raza}</Text>

                  <View style={styles.calloutButtonContainer}>
                    <Text style={styles.calloutButton}>Ver Más</Text>
                  </View>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      ) : (
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text variant="labelLarge" style={{ textAlign: "center", marginBottom: 10 }}>
            Cargando mapa
          </Text>
          <ActivityIndicator size={30} />
        </View>
      )}
    </View>
  );
}
export default Map;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 300,
  },
  callout: {
    overflow: "hidden",
    borderRadius: 15,
    width: 200,
    backgroundColor: "#fff",
    borderColor: "#4fb8e5",
    borderWidth: 1,
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
    padding: 5,
    color: "#4fb8e5",
  },
  calloutSubTitle: {
    fontSize: 12,
    alignSelf: "center",
    paddingBottom: 5,
    color: "#000",
  },
  calloutButtonContainer: {
    backgroundColor: "#4fb8e5",
    alignItems: "center",
  },
  calloutButton: {
    color: "#fff",
    paddingVertical: 5,
    fontSize: 12,
  },
});
