import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Pressable, Image, Linking, StyleSheet, Dimensions, FlatList } from "react-native";
import { servicesFirebase } from "../../services/servicesFirebase";
import { PreLoader, List as ListUi } from "../../components/ui";

const numColumns = 2;
const screenWidth = Dimensions.get("window").width;

export default function VerRedes() {
  const [redesSociales, setRedesSociales] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getAllRedes();
  }, []);

  async function getAllRedes() {
    try {
      const items = await servicesFirebase.getAll("redesSociales");
      const processedItems = (items || []).map(item => ({
        ...item,
        imagenUrl: item.imagenUrl || 'https://via.placeholder.com/150?text=Logo',
        titulo: item.titulo || 'Red Social Desconocida',
        id: item.id || Math.random().toString(),
      }));
      setRedesSociales(processedItems);
      setLoaded(true);
    } catch (error) {
      console.error("Error al cargar redes sociales:", error);
      setLoaded(true);
    }
  }

  const renderRedSocialItem = ({ item }) => (
    <Pressable
      key={item.id}
      style={styles.card}
      onPress={() => {
        if (item.enlace) {
          Linking.openURL(item.enlace).catch(err =>
            console.error("No se pudo abrir el enlace:", item.enlace, err)
          );
        } else {
          console.warn("No hay enlace definido para esta red social:", item.titulo);
        }
      }}
    >
      <Image
        source={{ uri: item.imagenUrl }}
        style={styles.icon}
        resizeMode="contain"
      />
      <Text style={styles.label}>{item.titulo}</Text>
    </Pressable>
  );

  if (!loaded) {
    return <PreLoader />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulta nuestras redes sociales</Text>

 
      {redesSociales.length === 0 ? (
        <ListUi.Empty text={"No hay redes sociales configuradas por el momento."} />
      ) : (
        <FlatList
          data={redesSociales}
          renderItem={renderRedSocialItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 25,
    color: "#314c95",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  gridContainer: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  columnWrapper: {
    justifyContent: "space-around",
    marginBottom: 10,
    gap: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    width: (screenWidth - (10 * (numColumns + 1))) / numColumns,
    height: Dimensions.get('window').width / numColumns - 40,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#314c95",
    textAlign: "center",
  },
});