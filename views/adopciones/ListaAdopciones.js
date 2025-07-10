import { useState, useEffect } from "react";
import { StyleSheet, FlatList, Pressable, Image, Linking } from "react-native";
import { List, Searchbar } from "react-native-paper";

import { servicesFirebase } from "../../services/servicesFirebase";
import { PreLoader, Background, View as ViewUi, List as ListUi } from "../../components/ui";
import { helpers } from "../../utilities/helpers";
import { routes } from "../../routes";

export default function ListaAdopciones({ navigation }) {
  const [listAdopciones, setListAdopciones] = useState([]);
  const [listAdopcionesStore, setListAdopcionesStore] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    const items = await servicesFirebase.getAll("adopciones");
    setListAdopcionesStore(items);
    setListAdopciones(items);
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
    const arrayFilter = listAdopcionesStore.filter((data) => {
      const valueSearch = helpers.removeAccents(data.celular).trim().toLowerCase();
      return valueSearch.includes(search);
    });

    setListAdopciones(arrayFilter);
  }

  function resetSearch() {
    setSearch("");
    setListAdopciones(listAdopcionesStore);
  }

  function render(item, navigation) {
    return (
      <Pressable onPress={() => navigation.navigate(routes.ADOPCIONES.VER_ADOPCION, { dataAdopciones: item })}>
        <List.Item
          style={styles.item}
          title={`${item.name}`}
          description={`${item.genero}`}
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
          placeholder="Busca la ciudad de tu interés"
          onChangeText={(text) => searchText(text)}
          value={search}
          style={styles.searchbar}
          inputStyle={{ fontSize: 16 }}
        />
      </ViewUi.Child>

      {!listAdopciones.length ? (
        <ViewUi.Child>
          <ListUi.Empty text={"Lo lamentamos, por el momento no hay adopciones"} />
        </ViewUi.Child>
      ) : (
        <FlatList
          data={listAdopciones}
          renderItem={(data) => render(data.item, navigation)}
          contentContainerStyle={styles.contentContainerStyle}
        />
      )}
      <Pressable
        onPress={() => {
          Linking.openURL("https://mashuezus.com/apppreguntas/adopciones");
        }}
        style={styles.banner}
      >
        <Image source={require("../../assets/banners/banner-adopciones.gif")} style={styles.banner} />
      </Pressable>
    </Background.Image>
  );
}

const styles = StyleSheet.create({
  searchbar: {
    marginTop: 10,
    marginBottom: 10,
  },
  contentContainerStyle: {
    paddingBottom: 80,
    paddingHorizontal: 10,
  },
  item: {
    paddingHorizontal: 10,
    marginVertical: 5,
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
  banner: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 80,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
