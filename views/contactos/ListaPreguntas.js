import { useState, useEffect } from "react";
import { StyleSheet, FlatList, Pressable, Image, View } from "react-native";
import { List, Searchbar } from "react-native-paper";

import { servicesFirebase } from "../../services/servicesFirebase";
import { PreLoader, Background, View as ViewUi, List as ListUi } from "../../components/ui";
import { helpers } from "../../utilities/helpers";
import { routes } from "../../routes";

function ListaPreguntas({ navigation }) {
  const [listPreguntas, setListPreguntas] = useState([]);
  const [listPreguntasStore, setListPreguntasStore] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");

  //========================= Get
  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    const items = await servicesFirebase.getAll("preguntas");
    setListPreguntasStore(items);
    setListPreguntas(items);
    setLoaded(true);
  }

  //========================= Busqueda
  function searchText(searchInput) {
    setSearch(searchInput);

    const searchNew = helpers.removeAccents(searchInput).trim().toLowerCase();
    if (searchNew.length >= 1) {
      filter(searchNew);
    } else if (searchNew.length == 0) {
      resetSearch();
    }
  }

  function filter(search) {
    const arrayFilter = listPreguntasStore.filter((data) => {
      const valueSearch = helpers.removeAccents(data.nick).trim().toLowerCase();
      return valueSearch.includes(search);
    });

    setListPreguntas(arrayFilter);
  }

  function resetSearch() {
    setSearch("");
    setListPreguntas(listPreguntasStore);
  }

  function render(item, navigation) {
    return (
      <Pressable onPress={() => navigation.navigate(routes.CONTACTOS.VER_PREGUNTA, { dataPregunta: item })}>
        <List.Item
          style={styles.item}
          title={`Nickname: ${item.nick}`}
          description={item.name}
          left={() => <Image source={{ uri: item.images }} style={styles.itemAvatar} />}
          right={() => <List.Icon icon="arrow-right-thick" />}
          titleStyle={{ fontWeight: "bold", fontSize: 16 }}
          descriptionStyle={{ fontSize: 14 }}
          titleNumberOfLines={4}
          descriptionNumberOfLines={4}
        />
      </Pressable>
    );
  }

  if (!loaded) {
    return <PreLoader />;
  }

  return (
    <Background.Image source={require("../../assets/fondos/menu.png")}>
      <ViewUi.Child>
        <Searchbar
          placeholder="Busca tu nick name"
          onChangeText={(text) => searchText(text)}
          value={search}
          style={styles.searchbar}
          inputStyle={{fontSize:16}}
        />

        <View style={styles.imageContainer}>
          <View style={styles.child}>
            <Pressable onPress={() => navigation.navigate(routes.CONTACTOS.VER_FORMULARIO, { tipo: "pregunta" })}>
              <Image source={require("../../assets/preguntas/usu.png")} style={styles.childImage} />
            </Pressable>
          </View>

          <View style={styles.child}>
            <Pressable onPress={() => navigation.navigate(routes.CONTACTOS.VER_FORMULARIO, { tipo: "veterinario" })}>
              <Image source={require("../../assets/preguntas/vete.png")} style={styles.childImage} />
            </Pressable>
          </View>

          <View style={styles.child}>
            <Pressable onPress={() => navigation.navigate(routes.CONTACTOS.VER_FORMULARIO, { tipo: "taxi" })}>
              <Image source={require("../../assets/preguntas/taxi.png")} style={styles.childImage} />
            </Pressable>
          </View>
        </View>

        {helpers.isArrayEmpty(listPreguntas) && (
          <ListUi.Empty text={"Lo lamentamos, por el momento no hay preguntas"} />
        )}
      </ViewUi.Child>

      {!helpers.isArrayEmpty(listPreguntas) && (
        <FlatList
          data={listPreguntas}
          renderItem={(data) => render(data.item, navigation)}
          contentContainerStyle={styles.contentContainerStyle}
        />
      )}
    </Background.Image>
  );
}
export default ListaPreguntas;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 10,
    paddingHorizontal: 10,
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
    resizeMode: "cover",
    overlayColor: "#fff",
    overflow: "hidden",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    marginBottom: 15,
  },
  child: {
    width: "33%",
  },
  childImage: {
    height: 135,
    resizeMode: "contain",
    width: "100%",
  },
});
