import { useState, useEffect } from "react";
import { StyleSheet, FlatList, Pressable, Image } from "react-native";
import { List, Searchbar } from "react-native-paper";

import { servicesFirebase } from "../../services/servicesFirebase";
import { PreLoader, Background, View as ViewUi, List as ListUi } from "../../components/ui";
import Map from "./components/Map";
import { helpers } from "../../utilities/helpers";
import { routes } from "../../routes";

export default function ListaVeterinarios({ navigation }) {
  const [listVeterinarios, setListVeterinarios] = useState([]);
  const [listVeterinariosStore, setListVeterinariosStore] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAll();
  }, []);

  //========================= Get
  async function getAll() {
    const items = await servicesFirebase.getAll("veterinarios");
    const itemsNew = helpers.shuffle(items)
    setListVeterinariosStore(itemsNew);
    setListVeterinarios(itemsNew);
    setLoaded(true);
  }

  //========================= Busqueda
  function searchText(searchInput) {
    setSearch(searchInput);

    const searchNew = helpers.removeAccents(searchInput).trim().toLowerCase();
    if (searchNew.length >= 1) {
      filter(searchNew);
    } else {
      setListVeterinarios(listVeterinariosStore);
    }
  }

  function filter(search) {
    const arrayFilter = listVeterinariosStore.filter((data) => {
      const valueSearch = helpers.removeAccents(data.servicios).trim().toLowerCase();
      return valueSearch.includes(search);
    });
    setListVeterinarios(arrayFilter);
  }

  if (!loaded) {
    return <PreLoader />;
  }

  return (
    <Background.Image source={require("../../assets/fondos/menu.png")}>
      <Map listVeterinarios={listVeterinarios} navigation={navigation} />
      <ViewUi.Child>
        <Searchbar
          placeholder="Busca el servicio que necesites"
          onChangeText={(text) => searchText(text)}
          value={search}
          style={styles.searchbar}
          inputStyle={{ fontSize: 16 }}
        />

        {helpers.isArrayEmpty(listVeterinarios) && (
          <ListUi.Empty text={"Lo lamentamos, por el momento no hay servicios que buscas ¡PROXIMAMENTE!"} />
        )}
      </ViewUi.Child>

      {!helpers.isArrayEmpty(listVeterinarios) && (
        <FlatList
          data={listVeterinarios}
          renderItem={(data) => <ComponentRender data={data.item} navigation={navigation} />}
          contentContainerStyle={styles.contentContainerStyle}
        />
      )}
    </Background.Image>
  );
}

function ComponentRender({ data, navigation }) {
  return (
    <Pressable onPress={() => navigation.navigate(routes.VETERINARIOS.VER_VETERINARIO, { dataVeterinarios: data })}>
      <List.Item
        style={styles.item}
        title={`${data.name}`}
        description={`${data.nombrev}`}
        left={() => <Image source={{ uri: data.images }} style={styles.itemAvatar} />}
        right={() => <List.Icon icon="arrow-right-thick" />}
        titleStyle={{ fontWeight: "bold", fontSize: 16 }}
        descriptionStyle={{ fontSize: 14 }}
        titleNumberOfLines={4}
        descriptionNumberOfLines={4}
      />
    </Pressable>
  );
}

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
});