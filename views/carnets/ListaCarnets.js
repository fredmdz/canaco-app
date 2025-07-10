import { useState, useCallback } from "react";
import { StyleSheet, View, Image, FlatList, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Text, Button, Card, IconButton } from "react-native-paper";

import { servicesMascotas, servicesFirebase } from "../../services";
import { PreLoader, Background, View as ViewUi, List as ListUi } from "../../components/ui/";
import { helpers } from "../../utilities/helpers";
import { routes } from "../../routes";
import dayjs from "dayjs";

export default function ListaCarnets({ route, navigation }) {
  const [listCarnets, setListCarnets] = useState([]);
  const [loaded, setLoaded] = useState(false);

  //========================= Router
  const { dataMascota } = route.params;

  useFocusEffect(
    useCallback(() => {
      getAll();
    }, [])
  );

  //========================= Get
  async function getAll() {
    const items = await servicesMascotas.getAllCarnetsByMascota(dataMascota.id);
    const itemsNew = items.map((data) => ({
      ...data,
      fechaCita: data.fechaCita ? data.fechaCita.toDate() : null,
      fechaProxCita: data.fechaProxCita ? data.fechaProxCita.toDate() : null,
    }));
    setListCarnets(itemsNew);
    setLoaded(true);
  }

  //=========================  Eliminar
  function deleteCarnet(id) {
    Alert.alert("", "¿Eliminar el carnet?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Si estoy Seguro",
        onPress: () => {
          const response = servicesFirebase.delete("carnets", id);
          if (response) {
            Alert.alert("", "Eliminado correctamente");
            getAll();
          } else {
            Alert.alert("", "Error al eliminar");
          }
        },
      },
    ]);
  }

  if (!loaded) {
    return <PreLoader />;
  }

  return (
    <Background.Image source={require("../../assets/fondos/menu.png")}>
      <ViewUi.Child>
        <View
          style={{
            borderWidth: 2,
            borderColor: "#dfdfdf",
            marginTop: 20,
            borderRadius: 15,
            marginBottom: 10,
          }}
        >
          <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
            <Image style={styles.logoTop} source={dataMascota.mascota.img} />
          </View>
          <Text variant="titleLarge" style={styles.nombre}>
            {dataMascota.nombre}
          </Text>
        </View>
        {helpers.isArrayEmpty(listCarnets) && <ListUi.Empty text={"Aún no tienes carnet para esta mascota"} />}
      </ViewUi.Child>

      {!helpers.isArrayEmpty(listCarnets) && (
        <FlatList
          data={listCarnets}
          renderItem={(data) => (
            <ComponentRender data={data.item} navigation={navigation} deleteCarnet={deleteCarnet} />
          )}
          contentContainerStyle={styles.contentContainerStyle}
        />
      )}
      <Button
        icon="plus-circle"
        mode="contained"
        style={styles.fab}
        onPress={() =>
          navigation.navigate(routes.CARNETS.AGREGAR_CARNET, {
            dataCarnet: null,
            dataMascota: dataMascota,
            idMascota: dataMascota.id,
          })
        }
      >
        Agregar carnet
      </Button>
    </Background.Image>
  );
}

function ComponentRender({ navigation, deleteCarnet, data }) {
  return (
    <Card>
      <Card.Content>
        <ComponentText title={"Fecha cita:"} text={dayjs(data.fechaCita).format("D MMMM YYYY")} />
        <ComponentText title={"Fecha próxima cita:"} text={dayjs(data.fechaProxCita).format("D MMMM YYYY")} />
        {data.medicamento && <ComponentText title={"Medicamento aplicado:"} text={data.medicamento} />}
        <ComponentText title={"Peso:"} text={data.peso + "Kg"} />
        {data.image && (
          <View style={{ flex: 1, alignItems: "center" }}>
            <Image style={styles.itemImage} source={{ uri: data.image }} />
          </View>
        )}
      </Card.Content>
      <Card.Actions>
        <IconButton
          icon="trash-can"
          iconColor={"#b91c1c"}
          mode="contained"
          onPress={() => deleteCarnet(data.id)}
        >
          Borrar
        </IconButton>
        {/* <Button
          icon="pencil"
          compact={true}
          onPress={() =>
            navigation.navigate(routes.CARNETS.AGREGAR_CARNET, { dataCarnet: null, idMascota: dataMascota.id })
          }
        >
          Editar
        </Button> */}
      </Card.Actions>
    </Card>
  );
}

const ComponentText = ({ title, text }) => (
  <View style={styles.itemTitle}>
    <Text variant="bodyMedium" style={styles.itemTitleText}>
      {title}
    </Text>
    <Text variant="bodyMedium">{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 80,
    paddingHorizontal: 10,
    gap: 20,
  },
  logoTop: {
    marginTop: 16,
    width: 500,
    height: 110,
    resizeMode: "contain",
  },
  nombre: {
    textAlign: "center",
    color: "#39CCE7",
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 20,
  },
  itemImage: {
    borderRadius: 10,
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginTop: 20,
    marginBottom: 10,
  },
  itemTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    flex: 1,
  },
  itemTitleText: {
    marginRight: 5,
    fontWeight: "bold",
  },
});
