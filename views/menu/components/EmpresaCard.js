import React from 'react';import { View, Text, Image, TouchableOpacity, StyleSheet,Dimensions} from 'react-native';

const EmpresaCard = ({ empresa, onPressVerMas }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPressVerMas}>
      <Image 
        source={{ uri: empresa.imagen }} 
        style={styles.image} 
      />
      <View style={styles.content}>
        <Text style={styles.title}>{empresa.nombre}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {empresa.description || empresa.descripcionBreve} 
        </Text>
        
        <TouchableOpacity style={styles.buttonStyled} onPress={onPressVerMas}>
          <Text style={styles.buttonText}>Ver más</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    maxWidth: Dimensions.get('window').width / 2 - 16, 
    minHeight: 200, 
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    flex: 1, 
    padding: 10,
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5, 
    color: '#314c95',
    textAlign: 'center', 
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center', 
    lineHeight: 10, 
    marginBottom: 1, 
  },
  buttonStyled: { 
    backgroundColor: '#314c95',
   
    paddingVertical: 10, 
    paddingHorizontal: 30, 
    borderRadius: 5,
    marginTop: 5, 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EmpresaCard;