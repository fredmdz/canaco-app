import { useState, useEffect } from "react";
import { StyleSheet, FlatList, Pressable, Image, View } from "react-native";
import { Searchbar, Text, Card, Divider } from "react-native-paper";

import { servicesFirebase } from "../../services/servicesFirebase";
import { PreLoader, Background, View as ViewUi, List as ListUi } from "../../components/ui";
import { helpers } from "../../utilities/helpers";
import { routes } from "../../routes";

export default function ListaPreguntas({ navigation }) {
  const [listPreguntas, setListPreguntas] = useState([]);
  const [listPreguntasStore, setListPreguntasStore] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");

  //========================= Get
  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    const items = await servicesFirebase.getAll("preguntasFrecuentes");
    setListPreguntas(items);
    setListPreguntasStore(items);
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
      const valueSearch = helpers.removeAccents(data.preg).trim().toLowerCase();
      return valueSearch.includes(search);
    });

    setListPreguntas(arrayFilter);
  }

  function resetSearch() {
    setSearch("");
    setListPreguntas(listPreguntasStore);
  }

  // ========================= Render
  function render(item, navigation) {
    return (
      <Pressable onPress={() => navigation.navigate(routes.PREGUNTAS.VER_PREGUNTA, { dataPregunta: item })}>
        <Card>
          <Card.Content>
            <Text variant="titleMedium" style={{ paddingBottom: 10 }}>
              {item.preg}
            </Text>
            <Divider style={{ marginBottom: 10 }} />
            <Text variant="bodyMedium">{item.res?.slice(0, 80) + " ..."}</Text>
          </Card.Content>
        </Card>
      </Pressable>
    );
  }

  if (!loaded) {
    return <PreLoader />;
  }

  return (
    <Background.Image source={require("../../assets/fondos/menu.png")}>
      <ViewUi.Child>
        <Image
          source={require("../../assets/preguntasFrecuentes/fondo.gif")}
          style={{ width: "100%", height: 120, resizeMode: "contain" }}
        />

        <Searchbar
          placeholder="Busca una palabra clave"
          onChangeText={(text) => searchText(text)}
          value={search}
          style={styles.searchbar}
          inputStyle={{ fontSize: 16 }}
        />

        {helpers.isArrayEmpty(listPreguntas) && (
          <ListUi.Empty text={"Lo lamentamos, no hay preguntas con esta palabra clave"} />
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
});
