import { useState } from "react";
import { StyleSheet, FlatList, Pressable, Image } from "react-native";
import { List, Searchbar } from "react-native-paper";

import { View as ViewUi, List as ListUi } from "../../components/ui";
import { routes } from "../../routes";

const contactos = [
  {
    id: 1,
    nombre: "CANACO SERVYTUR Tuxtla",
    telefono: "961 123 4567",
    correo: "contacto@canacotuxtla.org.mx",
    direccion: "Av Central 123, Tuxtla Gutiérrez, Chiapas",
  },
  {
    id: 2,
    nombre: "Atención a Socios",
    telefono: "961 987 6543",
    correo: "socios@canacotuxtla.org.mx",
    direccion: "Av Central 123, Piso 2, Tuxtla Gutiérrez",
  },
  {
    id: 3,
    nombre: "Servicios Jurídicos",
    telefono: "961 456 7890",
    correo: "juridico@canacotuxtla.org.mx",
    direccion: "Av Central 123, Despacho 5, Tuxtla Gutiérrez",
  },
];

function ListaContactos({ navigation }) {
  const [listContactos, setListContactos] = useState(contactos);
  const [search, setSearch] = useState("");

  function searchText(text) {
    setSearch(text);
    if (text.trim().length === 0) {
      setListContactos(contactos);
    } else {
      const filtrados = contactos.filter((item) =>
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
            <Image
              source={require("../../assets/login/logo1.png")}
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
});
