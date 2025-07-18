import { useEffect, useState } from "react";
import { Image, View, Text, Pressable, Linking, StyleSheet } from "react-native"; // Asegúrate de que todas estas importaciones estén aquí
import { Background, View as ViewUi, List as ListUi } from "../../components/ui";

function VerContacto({ route }) {
  const { dataContacto } = route.params;

  const [contacto, setContacto] = useState({});

  useEffect(() => {
    if (dataContacto) {
      setContacto(dataContacto);
    }
  }, [dataContacto]);

  // Función para abrir el número de teléfono
  const openPhoneCall = () => {
    if (contacto.telefono) {
      Linking.openURL(`tel:${contacto.telefono}`).catch(err => console.error('No se pudo abrir el teléfono:', err));
    }
  };

  // Función para abrir el cliente de correo electrónico
  const openEmail = () => {
    if (contacto.correo) {
      Linking.openURL(`mailto:${contacto.correo}`).catch(err => console.error('No se pudo abrir el correo:', err));
    }
  };

  // Función para abrir la dirección en Google Maps
  const openAddressInMaps = () => {
    if (contacto.direccion) {
      const encodedAddress = encodeURIComponent(contacto.direccion);
      const mapsUrl = `https://www.google.es/maps/search/?api=1&query=${encodedAddress}`;
      Linking.openURL(mapsUrl).catch(err => console.error('No se pudo abrir Google Maps:', err));
    }
  };

  return (
    // Si necesitas un fondo, recuerda que Background.Image debe envolver ViewUi.Scroll.Parent
    // <Background.Image source={require("../../assets/fondos/tu_fondo.png")}>
    <ViewUi.Scroll.Parent>

      <View style={styles.headerContainer}>
        <Text style={styles.titleText}>
          {contacto.nombre || "Contacto"}
        </Text>
        <Image
          source={contacto.imagen ? { uri: contacto.imagen } : require("../../assets/login/logo1.png")}
          style={styles.contactImage}
        />
      </View>

      <ViewUi.Child>
        <ListUi.Parent>
          {/* Teléfono Clickeable */}
          <Pressable onPress={openPhoneCall}>
            <ListUi.Item
              icon={"phone"}
              color={"blue"}
              title={"Teléfono"}
              subtitle={contacto.telefono || "-"}
            />
          </Pressable>

          {/* Correo Clickeable */}
          <Pressable onPress={openEmail}>
            <ListUi.Item
              icon={"email"}
              color={"green"}
              title={"Correo"}
              subtitle={contacto.correo || "-"}
            />
          </Pressable>

          {/* Dirección Clickeable para Maps */}
          <Pressable onPress={openAddressInMaps}>
            <ListUi.Item
              icon={"map-marker"}
              color={"orange"}
              title={"Dirección"}
              subtitle={contacto.direccion || "-"}
            />
          </Pressable>
        </ListUi.Parent>
      </ViewUi.Child>

    </ViewUi.Scroll.Parent>
    // </Background.Image>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#314c95",
    marginBottom: 5,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  contactImage: {
    width: 350,
    height: 200,
    resizeMode: "contain",
    marginVertical: 10,
  },
});

export default VerContacto;