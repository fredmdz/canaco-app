import { useEffect, useState } from "react";
import { Image, View, Text, Pressable, Linking, StyleSheet, Modal, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { View as ViewUi, List as ListUi } from "../../components/ui";

const { width, height } = Dimensions.get('window');

function VerContacto({ route }) {
  const { dataContacto } = route.params;

  const [contacto, setContacto] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (dataContacto) {
      setContacto(dataContacto);
    }
  }, [dataContacto]);

  const openPhoneCall = () => {
    if (contacto.telefono) {
      Linking.openURL(`tel:${contacto.telefono}`).catch(err => console.error('No se pudo abrir el teléfono:', err));
    }
  };

  const openEmail = () => {
    if (contacto.correo) {
      Linking.openURL(`mailto:${contacto.correo}`).catch(err => console.error('No se pudo abrir el correo:', err));
    }
  };

  const openAddressInMaps = () => {
    if (contacto.direccion) {
      const encodedAddress = encodeURIComponent(contacto.direccion);
      const mapsUrl = `https://www.google.es/maps/search/?api=1&query=${encodedAddress}`;
      Linking.openURL(mapsUrl).catch(err => console.error('No se pudo abrir Google Maps:', err));
    }
  };

  return (
    <ViewUi.Scroll.Parent>
      <View style={styles.headerContainer}>
        <Text style={styles.titleText}>
          {contacto.nombre || "Contacto"}
        </Text>

        <Pressable onPress={() => setModalVisible(true)} activeOpacity={0.9}>
          <Image
            source={contacto.imagen ? { uri: contacto.imagen } : require("../../assets/login/logo1.png")}
            style={styles.contactImage}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      <ViewUi.Child>
        <ListUi.Parent>
          <Pressable onPress={openPhoneCall}>
            <ListUi.Item
              icon={"phone"}
              color={"#314c95"}
              iconStyle={{ color: '#314c95' }}
              title={<Text style={styles.sectionTitle}>Teléfono</Text>}
              subtitle={<Text style={styles.linkText}>{contacto.telefono || "-"}</Text>}
            />
          </Pressable>

          <Pressable onPress={openEmail}>
            <ListUi.Item
              icon={"email"}
              color={"#314c95"}
              iconStyle={{ color: '#314c95' }}
              title={<Text style={styles.sectionTitle}>Correo</Text>}
              subtitle={<Text style={styles.linkText}>{contacto.correo || "-"}</Text>}
            />
          </Pressable>

          <Pressable onPress={openAddressInMaps}>
            <ListUi.Item
              icon={"map-marker"}
              color={"#314c95"}
              iconStyle={{ color: '#314c95' }}
              title={<Text style={styles.sectionTitle}>Dirección</Text>}
              subtitle={<Text style={styles.linkText}>{contacto.direccion || "-"}</Text>}
            />
          </Pressable>
        </ListUi.Parent>
      </ViewUi.Child>

      {/* Modal para zoom imagen */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <ScrollView
            style={styles.modalScrollView}
            contentContainerStyle={styles.modalContentContainer}
            maximumZoomScale={5}
            minimumZoomScale={1}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            pinchGestureEnabled={true}
            scrollEnabled={true}
            contentInsetAdjustmentBehavior="automatic"
          >
            <Image
              source={contacto.imagen ? { uri: contacto.imagen } : require("../../assets/login/logo1.png")}
              style={styles.modalImage}
              resizeMode="contain"
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    </ViewUi.Scroll.Parent>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 25,  // para que no quede pegado a los lados
  },
  titleText: {
    fontSize: 22,           // menos que 24 para homogeneidad
    fontWeight: "700",      // igual que en otros componentes
    color: "#314c95",
    marginBottom: 15,       // un poco más separación abajo
    textAlign: "center",
    paddingHorizontal: 10,
  },
  contactImage: {
    width: width * 0.9,     // relativo para que no se pase en pantallas pequeñas
    height: (width * 0.9) * 0.56, // relación 16:9 para evitar cortes
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#34495e',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#314c95',
  },
  linkText: {
    fontSize: 16,           // añade tamaño para que sea igual a otros
    color: '#314c95',
    textDecorationLine: 'underline',
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalScrollView: {
    flex: 1,
    width: width,
    height: height,
  },
  modalContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  modalImage: {
    width: width,
    height: height,
  },
});

export default VerContacto;
