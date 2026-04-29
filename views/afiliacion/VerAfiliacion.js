import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Linking, Alert, Image, ScrollView, Dimensions } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

// Definimos el color principal de la marca para fácil uso
const BRAND_BLUE = '#314c95';
const LIGHT_BACKGROUND = '#f8f9fa';
const CARD_BACKGROUND = '#FFFFFF';
const TEXT_DARK = '#2c3e50';
const TEXT_MUTED = '#7f8c8d';

const { width } = Dimensions.get('window');

export default function VerAfiliacion() {
  const handlePress = async () => {
    const url = 'https://canacotuxtla.org.mx/afiliacion';
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `No se puede abrir el enlace de afiliación: ${url}.`);
      }
    } catch (error) {
      console.error('Error al intentar abrir el enlace de afiliación:', error);
      Alert.alert('Error', 'Hubo un problema al intentar abrir el enlace. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.scrollViewContent}>
      {/* --- Header Section --- */}
      <View style={styles.header}>
        <Image 
          source={require('../../assets/login/logo1.png')} 
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Afíliate a CANACO SERVYTUR</Text>
      </View>

      {/* --- Main Content Section --- */}
      <View style={styles.contentCard}>
        <Text style={styles.sectionTitle}>Ventajas de unirte:</Text>
        
        <View style={styles.benefitItem}>
          <Icon name="handshake-outline" size={22} color={BRAND_BLUE} style={styles.benefitIcon} />
          <Text style={styles.benefitText}>Conexiones empresariales exclusivas.</Text>
        </View>
        <View style={styles.benefitItem}>
          <Icon name="school-outline" size={22} color={BRAND_BLUE} style={styles.benefitIcon} />
          <Text style={styles.benefitText}>Cursos y talleres especializados.</Text>
        </View>
        <View style={styles.benefitItem}>
          <Icon name="tag-multiple-outline" size={22} color={BRAND_BLUE} style={styles.benefitIcon} />
          <Text style={styles.benefitText}>Beneficios y descuentos en servicios.</Text>
        </View>
        <View style={styles.benefitItem}>
          <Icon name="calendar-check-outline" size={22} color={BRAND_BLUE} style={styles.benefitIcon} />
          <Text style={styles.benefitText}>Participación en eventos clave.</Text>
        </View>
        
        <Text style={styles.callToActionText}>
          Impulsa tu crecimiento empresarial hoy mismo.
        </Text>

        {/* --- Button --- */}
        <TouchableOpacity style={styles.actionButton} onPress={handlePress}>
          <Icon name="link" size={22} color="#FFFFFF" style={styles.actionButtonIcon} />
          <Text style={styles.actionButtonText}>Afiliarme Ahora</Text>
        </TouchableOpacity>
      </View>

      {/* --- Footer Text --- */}
      <Text style={styles.footerInfoText}>
        Visita nuestro sitio web oficial para más información.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: LIGHT_BACKGROUND,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 30,
  },
  header: {
    width: '100%',
    backgroundColor: BRAND_BLUE,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  headerLogo: {
    width: 100,
    height: 75,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 30,
  },
  headerSubtitle: { 
    fontSize: 15,
    color: '#e0f7fa',
    textAlign: 'center',
    lineHeight: 20,
  },
  contentCard: {
    backgroundColor: CARD_BACKGROUND,
    borderRadius: 15,
    padding: 25,
    width: '90%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: TEXT_DARK,
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingRight: 10,
  },
  benefitIcon: {
    marginRight: 15,
    marginTop: 2,
  },
  benefitText: {
    flex: 1,
    fontSize: 16,
    color: TEXT_MUTED,
    lineHeight: 22,
  },
  callToActionText: {
    fontSize: 17,
    color: BRAND_BLUE,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 25,
    fontWeight: '600',
    width: '100%',
    lineHeight: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BRAND_BLUE,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 5,
    shadowColor: BRAND_BLUE,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    width: '80%',
    alignSelf: 'center',
  },
  actionButtonIcon: {
    marginRight: 10,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  footerInfoText: {
    fontSize: 14,
    color: TEXT_MUTED,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
});