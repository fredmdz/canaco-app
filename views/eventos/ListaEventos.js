import { useState, useEffect } from "react";
import { StyleSheet, FlatList, Pressable, Image, View, Text } from "react-native";
import { List, Searchbar } from "react-native-paper";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

import { servicesFirebase } from "../../services/servicesFirebase";
import { PreLoader, View as ViewUi, List as ListUi } from "../../components/ui";
import { helpers } from "../../utilities/helpers";
import { routes } from "../../routes";

export default function ListaEventos({ navigation }) {
  const [listEventos, setListEventos] = useState([]);
  const [listEventosStore, setListEventosStore] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    try {
      console.log("Intentando obtener eventos...");
      const items = await servicesFirebase.getAll("eventos");
      console.log("Eventos obtenidos (antes de filtrar):", JSON.stringify(items, null, 2));

      const itemsNew = items.filter((data) => {
        const fechaInicio = data.fechaInicio && typeof data.fechaInicio.toDate === 'function' ? data.fechaInicio.toDate() : null;
        const fechaFin = data.fechaFin && typeof data.fechaFin.toDate === 'function' ? data.fechaFin.toDate() : null;

        if (!fechaInicio || !fechaFin) {
          console.log(`Evento ID: ${data.id} - Fechas inválidas o ausentes. Filtrando fuera.`);
          return false;
        }

        const isCurrent = helpers.isRangeDates(fechaInicio, fechaFin);
        console.log(`--- Evento ID: ${data.id} ---`);
        console.log(`fechaInicio (Date): ${dayjs(fechaInicio).format('YYYY-MM-DD HH:mm:ss')}`);
        console.log(`fechaFin (Date): ${dayjs(fechaFin).format('YYYY-MM-DD HH:mm:ss')}`);
        console.log(`Resultado de isRangeDates: ${isCurrent}`);
        console.log("-----------------------");

        return isCurrent;
      });

      console.log("Eventos filtrados:", itemsNew);
      setListEventosStore(itemsNew);
      setListEventos(itemsNew);
      setLoaded(true);
    } catch (error) {
      console.error("Error al obtener o filtrar eventos:", error);
      setLoaded(true);
    }
  }

  //========================= Busqueda
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
    const arrayFilter = listEventosStore.filter((data) => {
      const nameValue = helpers.removeAccents(data.name || '').trim().toLowerCase();
      const cityValue = helpers.removeAccents(data.ciudad || '').trim().toLowerCase();
      return nameValue.includes(search) || cityValue.includes(search);
    });

    setListEventos(arrayFilter);
  }

  function resetSearch() {
    setSearch("");
    setListEventos(listEventosStore);
  }

  function render({ item }) {
    const fechaInicioFormatted = item.fechaInicio && typeof item.fechaInicio.toDate === 'function'
      ? dayjs(item.fechaInicio.toDate()).format('DD/MM/YYYY')
      : 'N/A';
    const fechaFinFormatted = item.fechaFin && typeof item.fechaFin.toDate === 'function'
      ? dayjs(item.fechaFin.toDate()).format('DD/MM/YYYY')
      : 'N/A';

    return (
      <Pressable onPress={() => navigation.navigate(routes.EVENTOS.VER_EVENTO, { dataEventos: item })}>
        <List.Item
          style={styles.item}
          title={` ${item.name || 'Evento sin nombre'}`}
          description={`Ciudad: ${item.ciudad || 'N/A'} | ${fechaInicioFormatted} - ${fechaFinFormatted}`}
          left={() => (
            <Image
              source={{ uri: item.images || 'https://via.placeholder.com/60' }}
              style={styles.itemAvatar}
            />
          )}
          right={() => <List.Icon icon="arrow-right-thick" />}
          titleStyle={{ fontWeight: "bold", fontSize: 16 }}
          descriptionStyle={{ fontSize: 12 }}
          titleNumberOfLines={2}
          descriptionNumberOfLines={2}
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
          placeholder="Busca evento o ciudad de interés"
          onChangeText={(text) => searchText(text)}
          value={search}
          style={styles.searchbar}
          inputStyle={{ fontSize: 16 }}
        />
      </ViewUi.Child>

      {!listEventos.length ? (
        <ViewUi.Child>
          <ListUi.Empty text={"Lo lamentamos, por el momento no hay eventos"} />
        </ViewUi.Child>
      ) : (
        <FlatList
          data={listEventos}
          renderItem={render}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.contentContainerStyle}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchbar: {
    marginTop: 10,
    marginBottom: 10,
  },
  contentContainerStyle: {
    paddingBottom: 20, // Adjusted paddingBottom as banner is removed
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
  // Removed banner styles as the component is no longer present
  // banner: {
  //   position: "absolute",
  //   bottom: 0,
  //   width: "100%",
  //   height: 80,
  // },
  // bannerImage: {
  //   width: "100%",
  //   height: "100%",
  //   resizeMode: "cover",
  // },
});