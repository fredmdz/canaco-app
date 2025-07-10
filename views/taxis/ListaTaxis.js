import { useState, useEffect } from "react";
import { StyleSheet, FlatList, Pressable, Image, View, Dimensions } from "react-native";
import { Searchbar, Text } from "react-native-paper";

import { servicesFirebase } from "../../services/servicesFirebase";
import { PreLoader, Background, View as ViewUi, List as ListUi } from "../../components/ui";
import { helpers } from "../../utilities/helpers";
import { routes } from "../../routes";

export default function ListaTaxis({ navigation }) {
  const [listTaxis, setListTaxis] = useState([]);
  const [listTaxisStore, setListTaxisStore] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");

  //========================= Get
  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    const items = await servicesFirebase.getAll("taxis");
    setListTaxisStore(items);
    setListTaxis(items);
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
    const arrayFilter = listTaxisStore.filter((data) => {
      const valueSearch = helpers.removeAccents(data.ciudad).trim().toLowerCase();
      return valueSearch.includes(search);
    });

    setListTaxis(arrayFilter);
  }

  function resetSearch() {
    setSearch("");
    setListTaxis(listTaxisStore);
  }

  function render(item, navigation) {
    return (
      <Pressable onPress={() => navigation.navigate(routes.TAXIS.VER_TAXI, { dataTaxi: item })}>
        <View style={styles.item}>
          <Image source={require("../../assets/taxis/taxi-avatar.png")} style={styles.itemAvatar} />
        </View>
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
          placeholder="Busca tu cuidad"
          onChangeText={(text) => searchText(text)}
          value={search}
          style={styles.searchbar}
          inputStyle={{fontSize:16}}
        />

        {helpers.isArrayEmpty(listTaxis) && (
          <ListUi.Empty text={"Lo lamentamos, por el momento no hay taxis en esta ciudad ¡PROXIMAMENTE!"} />
        )}
      </ViewUi.Child>

      {!helpers.isArrayEmpty(listTaxis) && (
        <>
          <FlatList
            data={listTaxis}
            renderItem={(data) => render(data.item, navigation)}
            numColumns={3}
            contentContainerStyle={styles.contentContainerStyle}
            columnWrapperStyle={{ gap: 10 }}
          />
          <Text variant="labelLarge" style={styles.baseText}>
            Sujeto a disponibilidad
          </Text>
          <Text variant="labelLarge" style={styles.baseText2}>
            Para un mejor servicio, Programa previamente tu viaje
          </Text>
        </>
      )}
    </Background.Image>
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
    width: Dimensions.get("window").width / 3 - 13.333,
    // borderWidth: 1,
  },
  itemAvatar: {
    height: 120,
    resizeMode: "contain",
    width: "100%",
  },
  baseText: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    color: "#e57c38",
  },
  baseText2: {
    textAlign: "center",
    color: "#0071e3",
    marginBottom: 30,
  },
});
