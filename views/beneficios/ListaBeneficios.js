import { useState, useEffect } from "react";
import { StyleSheet, FlatList, Pressable, Image, Linking, View } from "react-native";
import { List, Searchbar } from "react-native-paper";

import { servicesFirebase } from "../../services/servicesFirebase";
import { PreLoader, View as ViewUi, List as ListUi } from "../../components/ui";
import { helpers } from "../../utilities/helpers";
import { routes } from "../../routes";

export default function ListaBeneficios({ navigation }) {
  const [listBeneficios, setListBeneficios] = useState([]);
  const [listBeneficiosStore, setListBeneficiosStore] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    const items = await servicesFirebase.getAll("beneficios");
    const itemsNew = items.filter((data) => helpers.isRangeDates(data.fechaInicio.toDate(), data.fechaFin.toDate()));
    setListBeneficiosStore(itemsNew);
    setListBeneficios(itemsNew);
    setLoaded(true);
  }

  function searchText(searchInput) {
    setSearch(searchInput);

    const searchNew = helpers.removeAccents(searchInput).trim().toLowerCase();
    if (searchNew.length >= 1) {
      filter(searchNew);
    } else if (searchNew.length === 0) {
      resetSearch();
    }
  }

  function filter(search) {
    const arrayFilter = listBeneficiosStore.filter((data) => {
      const valueSearch = helpers.removeAccents(data.name).trim().toLowerCase();
      return valueSearch.includes(search);
    });

    setListBeneficios(arrayFilter);
  }

  function resetSearch() {
    setSearch("");
    setListBeneficios(listBeneficiosStore);
  }

  function render(item, navigation) {
    return (
      <Pressable onPress={() => navigation.navigate(routes.BENEFICIOS.VER_BENEFICIO, { dataBeneficios: item })}>
        <List.Item
          style={styles.item}
          title={` ${item.name}`}
          description={` ${item.apellido}`}
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
    <View style={{ flex: 1 }}>
      <ViewUi.Child>
        <Searchbar
          placeholder="Busca beneficios de interés"
          onChangeText={(text) => searchText(text)}
          value={search}
          style={styles.searchbar}
          inputStyle={{ fontSize: 16 }}
        />
      </ViewUi.Child>

      {!listBeneficios.length ? (
        <ViewUi.Child>
          <ListUi.Empty text={"Lo lamentamos, por el momento no hay beneficios"} />
        </ViewUi.Child>
      ) : (
        <FlatList
          data={listBeneficios}
          renderItem={(data) => render(data.item, navigation)}
          contentContainerStyle={styles.contentContainerStyle}
        />
      )}

      <Pressable
        onPress={() => {
          Linking.openURL("https://mashuezus.com/apppreguntas/eventos");
        }}
        style={styles.banner}
      >
      </Pressable>
    </View>
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
});
