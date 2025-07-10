import { useState, useEffect } from "react";
import { StyleSheet, FlatList, Pressable, Image } from "react-native";
import { List, Searchbar } from "react-native-paper";

import { servicesFirebase } from "../../services/servicesFirebase";
import { PreLoader, Background, View as ViewUi, List as ListUi } from "../../components/ui";
import Map from "./components/Map";
import { helpers } from "../../utilities/helpers";
import { routes } from "../../routes";

export default function ListaMascotas({ navigation }) {
  const [listMascotas, setListMascotas] = useState([]);
  const [listMascotasStore, setListMascotasStore] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAll();
  }, []);

  //========================= Get
  async function getAll() {
    const items = await servicesFirebase.getAll("mascotas");
    const itemsNew = helpers.shuffle(items)
    setListMascotasStore(itemsNew);
    setListMascotas(itemsNew);
    setLoaded(true);
  }

  //========================= Busqueda
  function searchText(searchInput) {
    setSearch(searchInput);

    const searchNew = helpers.removeAccents(searchInput).trim().toLowerCase();
    if (searchNew.length >= 1) {
      filter(searchNew);
    } else {
      setListMascotas(listMascotasStore);
    }
  }

  function filter(search) {
    const arrayFilter = listMascotasStore.filter((data) => {
      const valueSearch = helpers.removeAccents(data.raza).trim().toLowerCase();
      return valueSearch.includes(search);
    });
    setListMascotas(arrayFilter);
  }

  if (!loaded) {
    return <PreLoader />;
  }

  return (
    <Background.Image source={require("../../assets/fondos/menu.png")}>
      <Map listMascotas={listMascotas} navigation={navigation} />
      <ViewUi.Child>
        <Searchbar
          placeholder="Busca la raza de tu interés"
          onChangeText={(text) => searchText(text)}
          value={search}
          style={styles.searchbar}
          inputStyle={{ fontSize: 16 }}
        />

        {helpers.isArrayEmpty(listMascotas) && (
          <ListUi.Empty text={"Lo lamentamos, por el momento no hay mascotas de esta raza"} />
        )}
      </ViewUi.Child>

      {!helpers.isArrayEmpty(listMascotas) && (
        <FlatList
          data={listMascotas}
          renderItem={(data) => <ComponentRender data={data.item} navigation={navigation} />}
          contentContainerStyle={styles.contentContainerStyle}
        />
      )}
    </Background.Image>
  );
}

function ComponentRender({ data, navigation }) {
  return (
    <Pressable onPress={() => navigation.navigate(routes.CLUB_RAZAS.VER_MASCOTA, { dataMascota: data })}>
      <List.Item
        style={styles.item}
        title={`Raza: ${data.raza}`}
        description={`Nombre: ${data.name}`}
        left={() => <Image source={{ uri: data.image }} style={styles.itemAvatar} />}
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
