import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Pressable, Image, ActivityIndicator, Text, View } from "react-native";
import { List, Searchbar } from "react-native-paper";

import { View as ViewUi } from "../../components/ui"; // ListUi no se usa directamente en este componente
import { routes } from "../../routes";
import { servicesFirebase } from "../../services/"; 

function ListaContactos({ navigation }) {
  const [listContactos, setListContactos] = useState([]);
  const [originalContactos, setOriginalContactos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);     

  useEffect(() => {
    const getContactos = async () => {
      try {
        setLoading(true);
        setError(null);
        const items = await servicesFirebase.getAll("contactos");
        
        setOriginalContactos(items);
        setListContactos(items);
      } catch (err) {
        console.error("Error al cargar contactos desde Firebase:", err);
        setError("No se pudieron cargar los contactos. Intente de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    getContactos();
  }, []);

  function searchText(text) {
    setSearch(text);
    if (text.trim().length === 0) {
      setListContactos(originalContactos);
    } else {
      const filtrados = originalContactos.filter((item) =>
        item.nombre.toLowerCase().includes(text.toLowerCase())
      );
      setListContactos(filtrados);
    }
  }

  function render(item) {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate(routes.CONTACTOS.VER_CONTACTO, { dataContacto: item })
        }
      >
        <List.Item
          style={styles.item}
          title={item.nombre}
          description={item.telefono}
          left={() => (
            // *** CAMBIO AQUÍ: Usar item.imagen ***
            <Image
              source={item.imagen ? { uri: item.imagen } : require("../../assets/login/logo1.png")}
              style={styles.itemAvatar}
            />
          )}
          right={() => <List.Icon icon="arrow-right-thick" />}
          titleStyle={{ fontWeight: "bold", fontSize: 16 }}
          descriptionStyle={{ fontSize: 14 }}
        />
      </Pressable>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#314c95" />
        <Text style={{ marginTop: 10 }}>Cargando contactos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ViewUi.Child style={styles.container}>
      <Searchbar
        placeholder="Buscar contacto"
        onChangeText={searchText}
        value={search}
        style={styles.searchbar}
        inputStyle={{ fontSize: 16 }}
      />

      <FlatList
        data={listContactos}
        renderItem={({ item }) => render(item)}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No se encontraron contactos.</Text>
          </View>
        }
      />
    </ViewUi.Child>
  );
}

export default ListaContactos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  contentContainerStyle: {
    paddingVertical: 10,
    gap: 10,
  },
  searchbar: {
    marginTop: 10,
    marginBottom: 10,
  },
  item: {
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#78EBFF",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  itemAvatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
    resizeMode: "contain",
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
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});