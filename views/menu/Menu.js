// views/menu/Menu.js
import React, { useEffect, useState } from "react";
import { 
  View, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  Text 
} from "react-native";
import EmpresaCard from "./components/EmpresaCard";
import { servicesFirebase } from "../../services/";

export default function Menu({ navigation }) {
  const [state, setState] = useState({
    empresas: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const getEmpresas = async () => {
      try {
        const items = await servicesFirebase.getAll("empresas");
        
        setState({
          empresas: items.sort((a, b) => a.nombre.localeCompare(b.nombre)),
          loading: false,
          error: null
        });
      } catch (err) {
        console.error("Error al cargar empresas:", err);
        setState(prev => ({
          ...prev,
          loading: false,
          error: "Error al cargar las empresas. Por favor, intente más tarde."
        }));
      }
    };
    
    getEmpresas();
  }, []);

  const renderItem = ({ item }) => (
    <EmpresaCard 
      empresa={item} 
      onPressVerMas={() => navigation.navigate("EmpresaDetalle", { empresa: item })}
    />
  );

  if (state.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#314c95" />
      </View>
    );
  }

  if (state.error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{state.error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={state.empresas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay empresas disponibles</Text>
          </View>
        }
      />
    </View>
  );
}


const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center'
  }
});