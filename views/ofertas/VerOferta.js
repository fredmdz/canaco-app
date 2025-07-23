import { useState, useEffect } from "react";
import { Pressable, Linking, Text, StyleSheet, Modal, ScrollView, TouchableOpacity, Dimensions, Platform } from "react-native";
import dayjs from "dayjs";
import 'dayjs/locale/es';
dayjs.locale('es');

import { View as ViewUi, List as ListUi } from "../../components/ui";

const { width, height } = Dimensions.get('window');

export default function VerOferta({ route }) {
  const { dataOferta } = route.params;

  const [ofertaDetalle, setOfertaDetalle] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (dataOferta) {
      const processedOferta = {
        ...dataOferta,
        images: dataOferta.images || 'https://via.placeholder.com/400x300?text=Sin+Imagen',
        vigenciaFecha: dataOferta.celular && dayjs(dataOferta.celular, 'DD/MM/YYYY', true).isValid()
          ? dayjs(dataOferta.celular, 'DD/MM/YYYY').format('DD MMMM YYYY')
          : (dataOferta.celular || 'No especificada'),
        nombrePromocion: dataOferta.name || 'Promoción sin nombre',
        descuento: dataOferta.apellido || 'No especificado',
        descripcion: dataOferta.especialidad || 'No hay descripción disponible.',
        whatsappNum: dataOferta.wat || dataOferta.celular,
      };
      setOfertaDetalle(processedOferta);
    }
  }, [dataOferta]);

  const handleOpenMap = () => {
    const { lat, lng, direccion } = ofertaDetalle;
    if (lat && lng) {
      const mapUrl = Platform.select({
        ios: `maps:0,0?q=${lat},${lng}`,
        android: `geo:0,0?q=${lat},${lng}`,
        default: `https://www.google.es/maps?q=${lat},${lng}`,
      });
      Linking.openURL(mapUrl).catch(() => alert('No se pudo abrir la app de mapas.'));
    } else if (direccion) {
      const encodedAddress = encodeURIComponent(direccion);
      const mapUrl = Platform.select({
        ios: `maps:0,0?q=${encodedAddress}`,
        android: `geo:0,0?q=${encodedAddress}`,
        default: `https://www.google.es/maps?q=${encodedAddress}`,
      });
      Linking.openURL(mapUrl).catch(() => alert('No se pudo abrir la app de mapas.'));
    } else {
      alert('Ubicación no disponible.');
    }
  };

  if (!ofertaDetalle || Object.keys(ofertaDetalle).length === 0) {
    return (
      <ViewUi.Scroll.Parent style={styles.container}>
        <Text style={styles.loadingText}>Cargando detalles de la oferta...</Text>
      </ViewUi.Scroll.Parent>
    );
  }

  return (
    <ViewUi.Scroll.Parent style={styles.container}>
      <Pressable onPress={() => setModalVisible(true)} style={styles.headerContainer}>
        <ListUi.Header
          image={ofertaDetalle.images}
          title={ofertaDetalle.nombrePromocion}
          titleStyle={styles.titleText}
        />
      </Pressable>

      <ListUi.Parent style={styles.listContainer}>
        {ofertaDetalle.descripcion && (
          <ListUi.Item
            icon={"tag-text-outline"}
            color={"#314c95"}
            title={<Text style={styles.sectionTitle}>Descripción de la oferta</Text>}
            subtitle={<Text style={styles.subtitleBlack}>{ofertaDetalle.descripcion}</Text>}
          />
        )}

        {ofertaDetalle.descuento && (
          <ListUi.Item
            icon={"percent"}
            color={"#314c95"}
            title={<Text style={styles.sectionTitle}>Descuento / Beneficio</Text>}
            subtitle={<Text style={styles.subtitleBlack}>{ofertaDetalle.descuento}</Text>}
          />
        )}

        {ofertaDetalle.vigenciaFecha && (
          <ListUi.Item
            icon={"calendar-range"}
            color={"#314c95"}
            title={<Text style={styles.sectionTitle}>Vigencia</Text>}
            subtitle={<Text style={styles.subtitleBlack}>{ofertaDetalle.vigenciaFecha}</Text>}
          />
        )}

        {ofertaDetalle.telefono && (
          <Pressable onPress={() => Linking.openURL(`tel:${ofertaDetalle.telefono}`)}>
            <ListUi.Item
              icon={"phone"}
              color={"#314c95"}
              title={<Text style={styles.sectionTitle}>Teléfono</Text>}
              subtitle={<Text style={styles.linkText}>{ofertaDetalle.telefono}</Text>}
            />
          </Pressable>
        )}

        {ofertaDetalle.whatsappNum && (
          <Pressable onPress={() => Linking.openURL(`http://api.whatsapp.com/send?phone=52${ofertaDetalle.whatsappNum}`)}>
            <ListUi.Item
              icon={"whatsapp"}
              color={"#314c95"}
              title={<Text style={styles.sectionTitle}>WhatsApp</Text>}
              subtitle={<Text style={styles.linkText}>{ofertaDetalle.whatsappNum}</Text>}
            />
          </Pressable>
        )}

        {(ofertaDetalle.lat && ofertaDetalle.lng || ofertaDetalle.direccion) && (
          <Pressable onPress={handleOpenMap}>
            <ListUi.Item
              icon={"map-marker"}
              color={"#314c95"}
              title={<Text style={styles.sectionTitle}>Ubicación</Text>}
              subtitle={<Text style={styles.linkText}>{ofertaDetalle.direccion || 'Ver en el mapa'}</Text>}
            />
          </Pressable>
        )}
      </ListUi.Parent>

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
            <ListUi.Header
              image={ofertaDetalle.images}
              title={ofertaDetalle.nombrePromocion}
              titleStyle={styles.titleText}
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    </ViewUi.Scroll.Parent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
  },
  headerContainer: {
    alignItems: "center",
    // ❌ Quitamos el marginTop para pegar al header
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#314c95",
    marginBottom: 10,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  listContainer: {
    marginTop: 10,   // 👈 Controlas el espacio desde aquí (igual que VerEvento)
    marginBottom: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e6ec",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
    marginHorizontal: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#34495e",
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#314c95",
  },
  subtitleBlack: {
    fontSize: 17,
    color: "black",
  },
  linkText: {
    fontSize: 17,
    color: "#314c95",
    textDecorationLine: "underline",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalScrollView: {
    flex: 1,
    width: width,
    height: height,
  },
  modalContentContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  loadingText: {
    fontSize: 18,
    color: "#4a6572",
    textAlign: "center",
    marginTop: 50,
  },
});
