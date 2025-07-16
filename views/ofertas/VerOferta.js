import { useState, useEffect } from "react";
import { Pressable, Linking, Text, StyleSheet, Platform, SafeAreaView, Image, View } from "react-native"; // Agregado Image y View
import dayjs from "dayjs";
import 'dayjs/locale/es';
dayjs.locale('es');

import { View as ViewUi, List as ListUi } from "../../components/ui";

export default function VerOferta({ route }) {
  const { dataOferta } = route.params;

  const [oferta, setOferta] = useState({});

  useEffect(() => {
    if (dataOferta) {
      const processedOferta = {
        ...dataOferta,
        images: dataOferta.images || 'https://via.placeholder.com/400?text=Sin+Imagen',

        vigenciaFecha: dataOferta.celular && dayjs(dataOferta.celular, 'DD/MM/YYYY', true).isValid()
            ? dayjs(dataOferta.celular, 'DD/MM/YYYY').format('DD MMMM YYYY')
            : (dataOferta.celular || 'No especificada'),
        
        nombrePromocion: dataOferta.name || 'Promoción sin nombre',
        descuento: dataOferta.apellido || 'No especificado',
        descripcion: dataOferta.especialidad || 'No hay descripción disponible.',
        whatsappNum: dataOferta.wat || dataOferta.celular,
      };
      setOferta(processedOferta);
    }
  }, [dataOferta]);

  // Función para abrir el mapa (se mantiene, aunque no se muestre el item de dirección)
  // Podrías reutilizarla si en el futuro decides poner un botón de "Ver en mapa"
  const handleOpenMap = () => {
    const { lat, lng, direccion } = oferta;
    if (lat && lng) {
      const mapUrl = Platform.select({
        ios: `maps:0,0?q=${lat},${lng}`,
        android: `geo:0,0?q=${lat},${lng}`,
        default: `https://www.google.es/maps?q=${lat},${lng}`,
      });
      Linking.openURL(mapUrl).catch(err => console.error("No se pudo abrir el mapa con coordenadas:", err));
    } else if (direccion) {
      const encodedAddress = encodeURIComponent(direccion);
      const mapUrl = Platform.select({
          ios: `maps:0,0?q=${encodedAddress}`,
          android: `geo:0,0?q=${encodedAddress}`,
          default: `https://www.google.es/maps?q=${encodedAddress}`,
      });
      Linking.openURL(mapUrl).catch(err => console.error("No se pudo abrir el mapa con dirección:", err));
    } else {
      alert("Ubicación no disponible para esta promoción.");
    }
  };

  if (!oferta || Object.keys(oferta).length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <ViewUi.Scroll.Parent>
          <Text style={styles.loadingText}>Cargando detalles de la promoción...</Text>
        </ViewUi.Scroll.Parent>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ViewUi.Scroll.Parent>

        {/* Nuevo Header personalizado, similar a VerContacto */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>
            {oferta.nombrePromocion}
          </Text>
          <Image
            source={{ uri: oferta.images }} // Aquí se usa la URL de la imagen de la oferta
            style={styles.headerImage}
            resizeMode="contain" // O "cover" dependiendo de tu preferencia
          />
        </View>

        <ViewUi.Child>
          <ListUi.Parent>
            {oferta.descripcion && (
              <ListUi.Item
                icon={"tag-text-outline"}
                color={"#B26217"}
                title={"Descripción de la promoción"}
                subtitle={<Text style={styles.subtitleText}>{oferta.descripcion}</Text>}
              />
            )}

            {oferta.descuento && (
              <ListUi.Item
                icon={"percent"}
                color={"#FF7F37"}
                title={"Descuento / Beneficio"}
                subtitle={<Text style={styles.subtitleText}>{oferta.descuento}</Text>}
              />
            )}

            {oferta.vigenciaFecha && (
              <ListUi.Item
                icon={"calendar-range"}
                color={"#FF7F37"}
                title={"Vigencia"}
                subtitle={<Text style={styles.subtitleText}>{oferta.vigenciaFecha}</Text>}
              />
            )}

            {/* SE QUITA EL ListUi.Item DE DIRECCIÓN */}
            {/* Si aún quieres un botón para abrir el mapa, podrías añadir un Pressable aquí */}

            {oferta.telefono && (
              <Pressable onPress={() => Linking.openURL(`tel:${oferta.telefono}`).catch(err => console.error("No se pudo llamar:", err))}>
                <ListUi.Item
                  icon={"phone"}
                  color={"blue"}
                  title={"Número de Teléfono"}
                  subtitle={<Text style={[styles.subtitleText, styles.linkText]}>{oferta.telefono}</Text>}
                />
              </Pressable>
            )}

            {oferta.whatsappNum && (
              <Pressable
                onPress={() => Linking.openURL("http://api.whatsapp.com/send?phone=52" + oferta.whatsappNum).catch(err => console.error("No se pudo abrir WhatsApp:", err))}
              >
                <ListUi.Item
                  icon={"whatsapp"}
                  color={"green"}
                  title={"Número de WhatsApp"}
                  subtitle={<Text style={[styles.subtitleText, styles.linkText]}>{oferta.whatsappNum}</Text>}
                />
              </Pressable>
            )}
          </ListUi.Parent>
        </ViewUi.Child>
      </ViewUi.Scroll.Parent>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20, // Espacio después del header
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#314c95",
    marginBottom: 10, // Espacio entre título e imagen
    textAlign: 'center', // Centrar el título
    paddingHorizontal: 20, // Pequeño padding para que no se pegue a los bordes
  },
  headerImage: {
    width: '90%', // O un valor fijo como 350
    height: 200, // Altura fija
    resizeMode: "contain",
  },
  subtitleText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  linkText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 50,
  }
});