import { useState, useCallback } from "react";
import { StyleSheet, View, Pressable, Image, Alert, Dimensions, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Text, Button, FAB, Card } from "react-native-paper";

import { servicesCarnets, servicesFirebase, auth } from "../../services";
import { PreLoader, Background, View as ViewUi, List } from "../../components/ui";
import { helpers } from "../../utilities/helpers";
import { routes } from "../../routes";
import { arrayMascotas } from "./constants/arrayMascotas";

export default function ListaMascotas({ navigation }) {
  const [listMascotas, setListMascotas] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      get();
    }, [])
  );

  //========================= Get
  async function get() {
    const userId = auth.currentUser.uid;
    const items = await servicesCarnets.getAllByUsuario(userId);
    const itemsNew = items.map((data) => ({
      ...data,
      mascota: arrayMascotas.ARRAY.filter((dataFiltrer) => dataFiltrer.id == data.idMascota)[0],
    }));
    setListMascotas(itemsNew);
    setLoaded(true);
  }

  //=========================  Eliminar
  function deleteMascota(id) {
    Alert.alert("", "¿Eliminar la mascota?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Si estoy Seguro",
        onPress: () => {
          const response = servicesFirebase.delete("mascotasCarnets", id);
          if (response) {
            Alert.alert("", "Eliminado correctamente");
            get();
          } else {
            Alert.alert("", "Error al eliminar");
          }
        },
      },
    ]);
  }

  if (!loaded) {
    return <PreLoader />;
  }

  return (
    <Background.Image source={require("../../assets/fondos/menu.png")}>
      {helpers.isArrayEmpty(listMascotas) && (
        <ViewUi.Child>
          <View style={{ marginTop: 10 }}>
            <List.Empty text={"Aún no tienes mascotas agregadas"} />
          </View>
        </ViewUi.Child>
      )}

      {!helpers.isArrayEmpty(listMascotas) && (
        <FlatList
          data={listMascotas}
          renderItem={(data) => (
            <ComponentRender data={data.item} navigation={navigation} deleteMascota={deleteMascota} />
          )}
          contentContainerStyle={styles.contentContainerStyle}
          columnWrapperStyle={styles.columnWrapperStyle}
          numColumns={2}
        />
      )}

      <Button
        icon="plus-circle"
        mode="contained"
        style={styles.fab}
        onPress={() => navigation.navigate(routes.CARNETS.AGREGAR_MASCOTA)}
      >
        Agregar mascota
      </Button>
    </Background.Image>
  );
}

const ComponentRender = ({ data, navigation, deleteMascota }) => (
  <Pressable onPress={() => navigation.navigate(routes.CARNETS.LISTA_CARNETS, { dataMascota: data })}>
    <View style={styles.card}>
      <Image style={styles.image} source={data.mascota.img} />
      <Text variant="labelLarge" style={styles.label}>
        {data.nombre}
      </Text>
      <FAB mode="flat" icon="close" style={styles.fabClose} customSize={35} onPress={() => deleteMascota(data.id)} />
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 80,
    paddingHorizontal: 10,
    gap: 20,
  },
  columnWrapperStyle: {
    gap: 20,
  },
  fab: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 20,
  },
  card: {
    width: Dimensions.get("window").width / 2 - 20,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#e8eaed57",
    paddingVertical: 15,
  },
  image: {
    width: "100%",
    height: 130,
    resizeMode: "contain",
    marginBottom: 10,
  },
  label: {
    color: "#39CCE7",
  },
  fabClose: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#F31F0E",
  },
});
