import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
; 

export default function EmpresaDetalle({ navigation, route }) {
  const { empresa } = route.params;

  const handleOpenMap = () => {
    const address = empresa.ubicacion;
    if (address) {
      const encodedAddress = encodeURIComponent(address);

      const mapUrl = Platform.select({
        ios: `maps:0,0?q=${encodedAddress}`, // Para iOS (Apple Maps)
        android: `geo:0,0?q=${encodedAddress}`, // Para Android (Google Maps por defecto)
        default: `http://maps.google.com/?q=${encodedAddress}`, // Fallback para web o si no se abre la app
      });

      Linking.openURL(mapUrl)
        .catch(err => console.error('Error al intentar abrir el mapa:', err));
    } else {
      console.warn('No hay ubicación disponible para esta empresa.');
      // Opcional: mostrar un Toast o Alert al usuario
      // Alert.alert('Información', 'No se ha proporcionado una ubicación para esta empresa.');
    }
  };

  return (
    <View style={styles.container}>
      {/* El header se maneja desde NavigationEmpresas.js, por lo que no debe estar aquí. */}
      
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

          <Text style={styles.sectionTitle}>Descripción:</Text>
          <Text style={styles.description}>{empresa.descripcionCompleta}</Text>

          <Text style={styles.sectionTitle}>Ubicación:</Text>
          {/* TouchableOpacity para la ubicación */}
          <TouchableOpacity onPress={handleOpenMap} style={styles.locationContainer}>
            <Text style={styles.locationText}>{empresa.ubicacion}</Text>
            {/* Opcional: Icono de mapa si quieres uno */}
            {/* <Image source={require('../assets/icons/map-pin.png')} style={styles.mapIcon} /> */}
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Contacto:</Text>
          <Text style={styles.contactText}>{empresa.contacto}</Text>

          {/* Puedes añadir más campos aquí si los tienes en tus datos de empresa */}
          {/* Por ejemplo, horarios, servicios, etc. */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Un fondo claro
  },
  scrollContent: {
    paddingBottom: 20, // Espacio al final del contenido
  },
  headerImage: {
    width: '100%',
    height: 250, // Altura de la imagen principal
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
    flexDirection: 'row', // Para alinear texto e icono si añades uno
    alignItems: 'center',
    paddingVertical: 5, // Un poco de padding para el área táctil
  },
  locationText: {
    fontSize: 16,
    color: '#007bff', // Color de enlace para indicar que es clickeable
    textDecorationLine: 'underline', // Subrayado para indicar que es clickeable
  },
  mapIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
    tintColor: '#007bff', // Color del icono
  },
  contactText: {
    fontSize: 16,
    color: '#333',
  },
});