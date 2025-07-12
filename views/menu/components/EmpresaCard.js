import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  Dimensions // ¡Importación crucial que faltaba!
} from 'react-native';

const EmpresaCard = ({ empresa, onPressVerMas }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPressVerMas}>
      <Image source={{ uri: empresa.imagen }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{empresa.nombre}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {empresa.descripcionBreve}
        </Text>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Ver más</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Usando Dimensions para hacer el diseño responsive
const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    maxWidth: Dimensions.get('window').width / 2 - 16, // Uso de Dimensions
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#314c95',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#314c95',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EmpresaCard;