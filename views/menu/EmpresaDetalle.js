// views/menu/EmpresaDetalle.js
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function EmpresaDetalle() {
  const { params } = useRoute();
  const { empresa } = params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: empresa.imagen }} style={styles.headerImage} />
      <View style={styles.content}>
        <Text style={styles.title}>{empresa.nombre}</Text>
        <Text style={styles.description}>{empresa.descripcionCompleta}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ubicación</Text>
          <Text style={styles.sectionContent}>{empresa.ubicacion}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contacto</Text>
          <Text style={styles.sectionContent}>{empresa.contacto}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#314c95',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#555',
  },
  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#314c95',
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
  },
});