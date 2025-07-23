// Cambios importantes:
// 1. En los TouchableOpacity de ubicación, teléfono y whatsapp, el Icon color será '#314c95' (azul).
// 2. El texto para ubicación, teléfono y whatsapp será azul (#314c95) y subrayado.
// 3. En lugar del verde de whatsapp #25D366 en el icono, cambiamos a azul #314c95.

import React, { useState, useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform, Alert, Dimensions, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

export default function EmpresaDetalle({ navigation, route }) {
  const { empresa } = route.params;
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      statusBarHeight: insets.top,
    });
  }, [navigation, insets]);

  const handleOpenMap = () => {
    const address = empresa.ubicacion;
    if (address) {
      const encodedAddress = encodeURIComponent(address);
      const mapUrl = Platform.select({
        ios: `maps:0,0?q=${encodedAddress}`,
        android: `geo:0,0?q=${encodedAddress}`,
        default: `http://google.com/maps/search/?api=1&query=${encodedAddress}`,
      });

      Linking.openURL(mapUrl).catch(err => {
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
      Linking.openURL(`whatsapp://send?phone=${numeroWhatsApp}`).catch(err => {
        console.warn('No se pudo abrir WhatsApp directamente, intentando con API web:', err);
        Linking.openURL(`https://api.whatsapp.com/send?phone=${numeroWhatsApp}`).catch(webErr => {
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
      Linking.openURL(`tel:${numeroLimpio}`).catch(err => {
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
          <>
            <TouchableOpacity activeOpacity={0.9} onPress={() => setModalVisible(true)}>
              <Image source={{ uri: empresa.imagen }} style={styles.headerImage} />
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent={true} animationType="fade">
              <TouchableOpacity
                style={styles.modalBackground}
                onPress={() => setModalVisible(false)}
                activeOpacity={1}
              >
                <Image source={{ uri: empresa.imagen }} style={styles.modalImage} resizeMode="contain" />
              </TouchableOpacity>
            </Modal>
          </>
        ) : (
          <View style={styles.imagePlaceholder}>
            <Icon name="image-broken-variant" size={80} color="#999" />
            <Text style={styles.imagePlaceholderText}>No image available</Text>
          </View>
        )}

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{empresa.nombre}</Text>
          </View>

          {empresa.descripcionCompleta && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Descripción</Text>
              <View style={styles.sectionContent}>
                <Text style={styles.description}>{empresa.descripcionCompleta}</Text>
              </View>
            </View>
          )}

          {empresa.ubicacion && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ubicación</Text>
              <TouchableOpacity onPress={handleOpenMap} style={styles.detailItem}>
                <Icon name="map-marker-outline" size={22} color="#314c95" style={styles.detailIcon} />
                <Text style={styles.linkText}>{empresa.ubicacion}</Text>
              </TouchableOpacity>
            </View>
          )}

          {(empresa.telefono || empresa.whatsapp) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contacto</Text>
              {empresa.telefono && (
                <TouchableOpacity onPress={handleCall} style={styles.detailItem}>
                  <Icon name="phone-outline" size={22} color="#314c95" style={styles.detailIcon} />
                  <Text style={styles.linkText}>{empresa.telefono}</Text>
                </TouchableOpacity>
              )}
              {empresa.whatsapp && (
                <TouchableOpacity onPress={handleWhatsApp} style={styles.detailItem}>
                  <Icon name="whatsapp" size={22} color="#314c95" style={styles.detailIcon} />
                  <Text style={styles.linkText}>{empresa.whatsapp}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  headerImage: {
    width: width,
    height: width * 0.7,
    resizeMode: 'cover',
    borderBottomWidth: 5,
    borderBottomColor: '#314c95',
    marginBottom: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: width * 0.9,
    height: height * 0.7,
  },
  imagePlaceholder: {
    width: width,
    height: width * 0.7,
    backgroundColor: '#dbe2e9',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 5,
    borderBottomColor: '#314c95',
    marginBottom: 20,
  },
  imagePlaceholderText: {
    color: '#888',
    fontSize: 18,
    marginTop: 10,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 25,
  },
  titleContainer: {
    backgroundColor: '#314c95',
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e6ec',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
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
  sectionContent: {
    paddingTop: 5,
  },
  description: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f2f5f7',
  },
  detailIcon: {
    marginRight: 18,
  },
  detailText: {
    fontSize: 17,
    color: '#000000',
    textDecorationLine: 'underline',
    flexShrink: 1,
    flexGrow: 1,
  },
  linkText: {
    fontSize: 17,
    color: '#314c95',
    textDecorationLine: 'underline',
    flexShrink: 1,
    flexGrow: 1,
  },
});
