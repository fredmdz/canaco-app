import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function EmpresaDetalle({ navigation, route }) {
  const { empresa } = route.params;

  const handleOpenMap = () => {
    const address = empresa.ubicacion;
    if (address) {
      const encodedAddress = encodeURIComponent(address);

      const mapUrl = Platform.select({
        ios: `maps:0,0?q=${encodedAddress}`, 
        android: `geo:0,0?q=${encodedAddress}`,
        default: `http://maps.google.com/?q=${encodedAddress}`,
      });

      Linking.openURL(mapUrl)
        .catch(err => {
          console.error('Error al intentar abrir el mapa:', err);
          Alert.alert('Error', 'No se pudo abrir la aplicación de mapas. Asegúrate de tener una instalada.');
        });
    } else {
      Alert.alert('Información', 'No hay ubicación disponible para esta empresa.');
    }
  };

  const handleWhatsApp = () => {
    const numeroLimpio = empresa.whatsapp ? empresa.whatsapp.replace(/[^0-9]/g, '') : '';
    const numeroWhatsApp = numeroLimpio.startsWith('52') ? numeroLimpio : `52${numeroLimpio}`;

    if (numeroLimpio) {
      Linking.openURL(`whatsapp://send?phone=${numeroWhatsApp}`)
        .catch(err => {
          console.warn('No se pudo abrir WhatsApp directamente, intentando con API web:', err);
          Linking.openURL(`https://api.whatsapp.com/send?phone=${numeroWhatsApp}`)
            .catch(webErr => {
              console.error('Error al intentar abrir WhatsApp (API web):', webErr);
              Alert.alert('Error', 'No se pudo abrir WhatsApp. Asegúrate de tener la aplicación instalada y un número válido.');
            });
        });
    } else {
      Alert.alert('Información', 'No hay un número de WhatsApp disponible para esta empresa.');
    }
  };

  const handleCall = () => {
    const numeroLimpio = empresa.telefono ? empresa.telefono.replace(/[^0-9]/g, '') : '';
    if (numeroLimpio) {
      Linking.openURL(`tel:${numeroLimpio}`)
        .catch(err => {
          console.error('Error al intentar hacer la llamada:', err);
          Alert.alert('Error', 'No se pudo iniciar la llamada. Asegúrate de tener un número de teléfono válido.');
        });
    } else {
      Alert.alert('Información', 'No hay un número de teléfono disponible para esta empresa.');
    }
  };

  return (
    <View style={styles.container}>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {empresa.imagen ? (
          <Image source={{ uri: empresa.imagen }} style={styles.headerImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>No hay imagen</Text>
          </View>
        )}

        <View style={styles.content}>
          <Text style={styles.title}>{empresa.nombre}</Text>

          {empresa.descripcionCompleta && (
            <>
              <Text style={styles.sectionTitle}>Descripción:</Text>
              <Text style={styles.description}>{empresa.descripcionCompleta}</Text>
            </>
          )}

          {empresa.ubicacion && (
            <>
              <Text style={styles.sectionTitle}>Ubicación:</Text>
              <TouchableOpacity onPress={handleOpenMap} style={styles.locationContainer}>
                <Icon name="map-marker" size={20} color="#007bff" style={{ marginRight: 8 }} />
                <Text style={styles.locationText}>{empresa.ubicacion}</Text>
              </TouchableOpacity>
            </>
          )}

          {(empresa.telefono || empresa.whatsapp) && ( 
            <>
              <Text style={styles.sectionTitle}>Contacto:</Text>
              <View style={styles.contactOptionsContainer}>
                {empresa.telefono && (
                  <TouchableOpacity onPress={handleCall} style={styles.contactOption}>
                    <Icon name="phone" size={24} color="blue" />
                    <Text style={styles.contactOptionText}>{empresa.telefono}</Text>
                  </TouchableOpacity>
                )}

                {empresa.whatsapp && (
                  <TouchableOpacity onPress={handleWhatsApp} style={styles.contactOption}>
                    <Icon name="whatsapp" size={24} color="green" />
                    <Text style={styles.contactOptionText}>{empresa.whatsapp}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', 
  },
  scrollContent: {
    paddingBottom: 20, 
  },
  headerImage: {
    width: '100%',
    height: 250, 
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: 250,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#666',
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#314c95',
    marginBottom: 15,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 15,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  locationContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    paddingVertical: 5, 
  },
  locationText: {
    fontSize: 16,
    color: '#007bff', 
    textDecorationLine: 'underline', 
  },
  contactOptionsContainer: {
    marginTop: 5,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee', 
  
    width: '100%', 
  },
  contactOptionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    textDecorationLine: 'underline',
    color: '#007bff',
   
    flexShrink: 1, // Permite que el texto se encoja si es necesario (para que no desborde)
    flexGrow: 1,  // Permite que el texto crezca para ocupar el espacio disponible
  },
});