import { useState, useEffect } from "react";
import { StyleSheet, FlatList, Pressable, Image, Linking, View, Text } from "react-native";
import { List, Searchbar } from "react-native-paper";

import { servicesFirebase } from "../../services/servicesFirebase";
import { PreLoader, View as ViewUi, List as ListUi } from "../../components/ui";
import { helpers } from "../../utilities/helpers";
import { routes } from "../../routes"; // Asegúrate de que esta importación sea correcta

export default function ListaCursos({ navigation }) {
  const [listCursos, setListCursos] = useState([]);
  const [listCursosStore, setListCursosStore] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    const items = await servicesFirebase.getAll("cursos");
    const itemsNew = items.filter((data) => data.fechaInicio?.toDate && data.fechaFin?.toDate && helpers.isRangeDates(data.fechaInicio.toDate(), data.fechaFin.toDate()));
    setListCursosStore(itemsNew);
    setListCursos(itemsNew);
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
    const arrayFilter = listCursosStore.filter((data) => {
      const valueSearch = helpers.removeAccents(data.nombre || '').trim().toLowerCase();
      return valueSearch.includes(search);
    });
    setListCursos(arrayFilter);
  }

  function resetSearch() {
    setSearch("");
    setListCursos(listCursosStore);
  }

  function render(item, navigation) {
    return (
      <Pressable
        // *** CAMBIO CLAVE AQUÍ ***
        // 1. Navega primero al Stack Navigator de Cursos (routes.DRAWER.CURSOS)
        // 2. Luego, dentro de ese Stack, navega a la pantalla 'VerCurso' (routes.CURSOS.VER_CURSO)
        // 3. Pasa los parámetros a la pantalla 'VerCurso'
        onPress={() => navigation.navigate(routes.DRAWER.CURSOS, {
          screen: routes.CURSOS.VER_CURSO,
          params: { dataCursos: item },
        })}
      >
        <List.Item
          style={styles.item}
          title={` ${item.nombre || 'Curso sin nombre'}`}
          left={() => (
            <Image source={{ uri: item.imagen || 'https://via.placeholder.com/60' }} style={styles.itemAvatar} />
          )}
          right={() => <List.Icon icon="arrow-right-thick" />}
          titleStyle={{ fontWeight: "bold", fontSize: 16 }}
          titleNumberOfLines={2}
        >
          <View style={styles.itemContent}>
            <Text style={styles.itemDescription} numberOfLines={2}>
              {item.descripcionCompleta || 'No hay descripción disponible.'}
            </Text>
            {item.ponente && (
              <Text style={styles.itemPresenter}>Ponente: {item.ponente}</Text>
            )}
          </View>
        </List.Item>
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
          placeholder="Busca cursos de interés"
          onChangeText={(text) => searchText(text)}
          value={search}
          style={styles.searchbar}
          inputStyle={{ fontSize: 16 }}
        />
      </ViewUi.Child>

      {!listCursos.length ? (
        <ViewUi.Child>
          <ListUi.Empty text={"Lo lamentamos, por el momento no hay cursos"} />
        </ViewUi.Child>
      ) : (
        <FlatList
          data={listCursos}
          renderItem={(data) => render(data.item, navigation)}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={item => item.id || item.nombre}
        />
      )}

      <Pressable
        onPress={() => {
          Linking.openURL("https://mashuezus.com/apppreguntas/eventos");
        }}
        style={styles.banner}
      >
        {/* Placeholder for banner */}
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
    overflow: "hidden",
  },
  itemContent: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  itemPresenter: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  banner: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 80,
  },
});