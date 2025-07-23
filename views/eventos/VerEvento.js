import { useState, useEffect } from "react";
import { Pressable, Linking, Text, StyleSheet, Modal, ScrollView, TouchableOpacity, Dimensions, Platform } from "react-native";
import dayjs from "dayjs";
import 'dayjs/locale/es';
dayjs.locale('es');

import { View as ViewUi, List as ListUi } from "../../components/ui";

const { width, height } = Dimensions.get('window');

export default function VerEvento({ route }) {
  const { dataEventos } = route.params;

  const [eventoDetalle, setEventoDetalle] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (dataEventos) {
      const fechaInicioFormateada = dataEventos.fechaInicio?.toDate ? dayjs(dataEventos.fechaInicio.toDate()).format('DD MMMM YYYY') : 'Fecha no disponible';
      const fechaFinFormateada = dataEventos.fechaFin?.toDate ? dayjs(dataEventos.fechaFin.toDate()).format('DD MMMM YYYY') : 'Fecha no disponible';

      setEventoDetalle({
        ...dataEventos,
        fechaInicioFormateada,
        fechaFinFormateada,
      });
    }
  }, [dataEventos]);

  const handleOpenMap = () => {
    const address = eventoDetalle.direccion || eventoDetalle.lugar;
    if (address) {
      const encodedAddress = encodeURIComponent(address);
      const mapUrl = Platform.select({
        ios: `maps:0,0?q=${encodedAddress}`,
        android: `geo:0,0?q=${encodedAddress}`,
        default: `http://maps.google.com/?q=${encodedAddress}`,
      });
      Linking.openURL(mapUrl).catch(() => alert('No se pudo abrir la aplicación de mapas.'));
    } else {
      alert('No hay ubicación disponible para este evento.');
    }
  };

  const handleWhatsApp = () => {
    const numeroLimpio = eventoDetalle.celular || eventoDetalle.contacto || '';
    const numeroSoloNums = numeroLimpio.replace(/[^0-9]/g, '');
    const numeroWhatsApp = numeroSoloNums.startsWith('52') ? numeroSoloNums : `52${numeroSoloNums}`;
    if (numeroSoloNums) {
      Linking.openURL(`http://api.whatsapp.com/send?phone=${numeroWhatsApp}`).catch(() => alert('No se pudo abrir WhatsApp.'));
    } else {
      alert('No hay un número de contacto de WhatsApp disponible.');
    }
  };

  const handleCall = () => {
    const numeroLimpio = eventoDetalle.telefono || eventoDetalle.celular || eventoDetalle.contacto || '';
    const numeroSoloNums = numeroLimpio.replace(/[^0-9]/g, '');
    if (numeroSoloNums) {
      Linking.openURL(`tel:${numeroSoloNums}`).catch(() => alert('No se pudo iniciar la llamada.'));
    } else {
      alert('No hay un número de teléfono disponible para llamar.');
    }
  };

  if (!eventoDetalle || Object.keys(eventoDetalle).length === 0) {
    return (
      <ViewUi.Scroll.Parent style={styles.container}>
        <Text style={styles.loadingText}>Cargando detalles del evento...</Text>
      </ViewUi.Scroll.Parent>
    );
  }

  return (
    <ViewUi.Scroll.Parent style={styles.container}>

      <Pressable onPress={() => setModalVisible(true)} style={styles.headerContainer}>
        <ListUi.Header
          image={eventoDetalle.images || eventoDetalle.imagen || 'https://via.placeholder.com/350x200?text=Sin+Imagen'}
          title={eventoDetalle.nombre || eventoDetalle.name || 'Evento sin título'}
          titleStyle={styles.titleText}
        />
      </Pressable>

      <ListUi.Parent style={styles.listContainer}>

        {(eventoDetalle.descripcionCompleta || eventoDetalle.especialidad) && (
          <ListUi.Item
            icon={"information-outline"}
            color={"#314c95"}
            title={<Text style={styles.sectionTitle}>Descripción del evento</Text>}
            subtitle={<Text style={styles.subtitleBlack}>{eventoDetalle.descripcionCompleta || eventoDetalle.especialidad}</Text>}
          />
        )}

        {eventoDetalle.ponente && (
          <ListUi.Item
            icon={"account-tie"}
            color={"#314c95"}
            title={<Text style={styles.sectionTitle}>Ponente</Text>}
            subtitle={<Text style={styles.subtitleBlack}>{eventoDetalle.ponente}</Text>}
          />
        )}

        {(eventoDetalle.fechaInicioFormateada || eventoDetalle.fechaFinFormateada) && (
          <ListUi.Item
            icon={"calendar-month"}
            color={"#314c95"}
            title={<Text style={styles.sectionTitle}>Fechas</Text>}
            subtitle={
              <Text style={styles.subtitleBlack}>
                Del {eventoDetalle.fechaInicioFormateada} al {eventoDetalle.fechaFinFormateada}
              </Text>
            }
          />
        )}

        {(eventoDetalle.hor || eventoDetalle.horario) && (
          <ListUi.Item
            icon={"clock-outline"}
            color={"#314c95"}
            title={<Text style={styles.sectionTitle}>Horario</Text>}
            subtitle={<Text style={styles.subtitleBlack}>{eventoDetalle.hor || eventoDetalle.horario}</Text>}
          />
        )}

        {eventoDetalle.modalidad && (
          <ListUi.Item
            icon={eventoDetalle.modalidad.toLowerCase() === 'presencial' ? 'map-marker' : 'laptop'}
            color={"#314c95"}
            title={<Text style={styles.sectionTitle}>Modalidad</Text>}
            subtitle={<Text style={styles.subtitleBlack}>{eventoDetalle.modalidad}</Text>}
          />
        )}

        {eventoDetalle.costo !== undefined && (
          <ListUi.Item
            icon={"currency-usd"}
            color={"#314c95"}
            title={<Text style={styles.sectionTitle}>Costo</Text>}
            subtitle={
              <Text style={styles.subtitleBlack}>
                ${typeof eventoDetalle.costo === 'number' ? eventoDetalle.costo.toFixed(2) : eventoDetalle.costo}
              </Text>
            }
          />
        )}

        {eventoDetalle.linkInscripcion && (
          <Pressable onPress={() => Linking.openURL(eventoDetalle.linkInscripcion)}>
            <ListUi.Item
              icon={"link-variant"}
              color={"#314c95"}
              title={<Text style={styles.sectionTitle}>Enlace de Inscripción</Text>}
              subtitle={<Text style={[styles.subtitleBlack, { fontSize: 15 }]}>{eventoDetalle.linkInscripcion}</Text>}
            />
          </Pressable>
        )}

        {(eventoDetalle.modalidad?.toLowerCase() === 'presencial' && (eventoDetalle.direccion || eventoDetalle.lugar)) && (
          <Pressable onPress={handleOpenMap}>
            <ListUi.Item
              icon={"map-marker"}
              color={"#314c95"}
              title={<Text style={styles.sectionTitle}>Dirección</Text>}
              subtitle={<Text style={styles.linkText}>{eventoDetalle.direccion || eventoDetalle.lugar}</Text>}
            />
          </Pressable>
        )}

        {(eventoDetalle.celular || eventoDetalle.contacto) && (
          <>
            <Pressable onPress={handleWhatsApp}>
              <ListUi.Item
                icon={"whatsapp"}
                color={"#314c95"}
                title={<Text style={styles.sectionTitle}>Contacto WhatsApp</Text>}
                subtitle={<Text style={styles.linkText}>{eventoDetalle.celular || eventoDetalle.contacto}</Text>}
              />
            </Pressable>

            <Pressable onPress={handleCall}>
              <ListUi.Item
                icon={"phone"}
                color={"#314c95"}
                title={<Text style={styles.sectionTitle}>Contacto Teléfono</Text>}
                subtitle={<Text style={styles.linkText}>{eventoDetalle.telefono || eventoDetalle.celular || eventoDetalle.contacto}</Text>}
              />
            </Pressable>
          </>
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
              image={eventoDetalle.images || eventoDetalle.imagen || 'https://via.placeholder.com/350x200?text=Sin+Imagen'}
              title={eventoDetalle.nombre || eventoDetalle.name || 'Evento sin título'}
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
    backgroundColor: "#f0f4f7",
    paddingBottom: 30,
  },
  headerContainer: {
    alignItems: "center",
    // ❌ Quitamos el marginTop para pegar el formulario al header
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
    marginTop: 10, 
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
