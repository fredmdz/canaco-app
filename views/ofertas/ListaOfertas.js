import { useState, useEffect } from "react";
import { StyleSheet, FlatList, Pressable, Image, View, Dimensions, Text } from "react-native";
import { Searchbar } from "react-native-paper";

import { servicesFirebase } from "../../services/servicesFirebase";
import { PreLoader, View as ViewUi, List as ListUi } from "../../components/ui"; // 'Background' removed from import
import { helpers } from "../../utilities/helpers";
import { routes } from "../../routes";

export default function ListaOfertas({ navigation }) {
  const [listOfertas, setListOfertas] = useState([]);
  const [listOfertasStore, setListOfertasStore] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");

  //========================= Get
  useEffect(() => {
    getAllPromociones();
  }, []);

  async function getAllPromociones() {
    const items = await servicesFirebase.getAll("promociones");
    // Mapea los ítems para asegurar que 'images' no sea null y que 'name' sea prioritario
    const processedItems = items.map(item => ({
      ...item,
      // Usar un placeholder si images es null o vacío
      images: item.images || 'https://via.placeholder.com/150?text=Sin+Imagen', // URL de placeholder
      // Asegurarse de que 'name' es el campo principal para el título si 'nombre' no existe
      displayName: item.name || item.nombre || 'Promoción sin título',
    }));

    setListOfertasStore(processedItems);
    setListOfertas(processedItems);
    setLoaded(true);
  }

  //========================= Busqueda
  function handleSearchText(searchInput) {
    setSearch(searchInput);

    const searchNew = helpers.removeAccents(searchInput).trim().toLowerCase();
    if (searchNew.length >= 1) {
      filterList(searchNew);
    } else if (searchNew.length === 0) {
      resetSearch();
    }
  }

  function filterList(searchKeyword) {
    const arrayFilter = listOfertasStore.filter((data) => {
      // Prioriza la búsqueda por 'name', luego 'direccion'
      const nameMatch = helpers.removeAccents(data.name || '').trim().toLowerCase().includes(searchKeyword);
      const addressMatch = helpers.removeAccents(data.direccion || '').trim().toLowerCase().includes(searchKeyword);
      return nameMatch || addressMatch;
    });

    setListOfertas(arrayFilter);
  }

  function resetSearch() {
    setSearch("");
    setListOfertas(listOfertasStore);
  }

  function renderOfertaItem({ item }) {
    return (
      <Pressable onPress={() => navigation.navigate(routes.OFERTAS.VER_OFERTA, { dataOferta: item })}>
        <View style={styles.item}>
          <Image
            source={{ uri: item.images }}
            style={styles.itemAvatar}
          />
          {item.displayName && <Text style={styles.itemName}>{item.displayName}</Text>}
        </View>
      </Pressable>
    );
  }

  if (!loaded) {
    return <PreLoader />;
  }

  return (
    // Reemplazado Background.Image con una View simple para contener el contenido.
    // Añadimos 'style={styles.container}' para que ocupe todo el espacio.
    <View style={styles.container}> 
      <ViewUi.Child>
        <Searchbar
          placeholder="Busca por nombre o dirección"
          onChangeText={handleSearchText}
          value={search}
          style={styles.searchbar}
        />

        {helpers.isArrayEmpty(listOfertas) && (
          <ListUi.Empty text={"Lo lamentamos, por el momento no hay promociones disponibles que coincidan con tu búsqueda."} />
        )}
      </ViewUi.Child>

      {!helpers.isArrayEmpty(listOfertas) && (
        <FlatList
          data={listOfertas}
          renderItem={renderOfertaItem}
          numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
          columnWrapperStyle={{ gap: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Nuevo estilo 'container' para la View principal, similar al de VerRedes
  container: {
    flex: 1, // Ocupa todo el espacio disponible
    backgroundColor: 'transparent', // Permite que el fondo de la pantalla padre se vea
    // Puedes añadir padding o alignItems si necesitas que el contenido esté centrado o con márgenes generales
    // paddingHorizontal: 10,
    // alignItems: 'center',
  },
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
    width: Dimensions.get("window").width / 2 - 15, // Ajusta el ancho si cambias el paddingHorizontal del container o contentContainerStyle
  },
  itemAvatar: {
    height: 190,
    resizeMode: "cover",
    width: "100%",
    borderRadius: 15,
    overlayColor: "#fff",
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    color: '#333',
  }
});