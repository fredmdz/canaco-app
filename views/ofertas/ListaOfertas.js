import { useState, useEffect } from "react";
import { StyleSheet, FlatList, Pressable, Image, View, Dimensions } from "react-native";
import { Searchbar } from "react-native-paper";

import { servicesFirebase } from "../../services/servicesFirebase";
import { PreLoader, Background, View as ViewUi, List as ListUi } from "../../components/ui";
import { helpers } from "../../utilities/helpers";
import { routes } from "../../routes";

export default function ListaOfertas({ navigation }) {
  const [listOfertas, setListOfertas] = useState([]);
  const [listOfertasStore, setListMascotasStore] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");

  //========================= Get
  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    const items = await servicesFirebase.getAll("promociones");
    setListMascotasStore(items);
    setListOfertas(items);
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
    const arrayFilter = listOfertasStore.filter((data) => {
      const valueSearch = helpers.removeAccents(data.direccion).trim().toLowerCase();
      return valueSearch.includes(search);
    });

    setListOfertas(arrayFilter);
  }

  function resetSearch() {
    setSearch("");
    setListOfertas(listOfertasStore);
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
    const arrayFilter = listOfertas.filter((data) => {
      const valueSearch = helpers.removeAccents(data.direccion).trim().toLowerCase();
      return valueSearch.includes(search);
    });

    setListOfertas(arrayFilter);
  }

  function resetSearch() {
    setSearch("");
    setListOfertas(listOfertasStore);
  }

  function render(item, navigation) {
    return (
      <Pressable onPress={() => navigation.navigate(routes.OFERTAS.VER_OFERTA, { dataOferta: item })}>
        <View style={styles.item}>
          <Image
            source={{
              uri: item.images,
            }}
            style={styles.itemAvatar}
          />
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
        />

        {helpers.isArrayEmpty(listOfertas) && (
          <ListUi.Empty text={"Lo lamentamos, por el momento no hay promociones en esta ciudad ¡PROXIMAMENTE!"} />
        )}
      </ViewUi.Child>

      {!helpers.isArrayEmpty(listOfertas) && (
        <FlatList
          data={listOfertas}
          renderItem={(data) => render(data.item, navigation)}
          numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
          columnWrapperStyle={{ gap: 10 }}
        />
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
    width: Dimensions.get("window").width / 2 - 15,
    // borderWidth: 1,
  },
  itemAvatar: {
    height: 190,
    resizeMode: "cover",
    width: "100%",
    borderRadius: 15,
    overlayColor: "#fff",
  },
});
