// views/menu/Menu.js
import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EmpresaCard from "./components/EmpresaCard";
import { servicesFirebase } from "../../services/";

export default function Menu({ navigation }) {
  const insets = useSafeAreaInsets(); // ✅ Obtienes el espacio del notch y barra de estado

  const [state, setState] = useState({
    empresas: [],
    loading: true,
    error: null,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      statusBarHeight: insets.top, // ✅ Le pasas el insets.top al Appbar.Header desde options
    });
  }, [navigation, insets]);

  useEffect(() => {
    const getEmpresas = async () => {
      try {
        const items = await servicesFirebase.getAll("empresas");
        setState({
          empresas: items.sort((a, b) => a.nombre.localeCompare(b.nombre)),
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error("Error al cargar empresas:", err);
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Error al cargar las empresas. Por favor, intente más tarde.",
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
        keyExtractor={(item) => item.id}
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
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 200,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
