import { StyleSheet, View, Pressable, Image, Alert } from "react-native";
import { Text, Card, Button, Divider } from "react-native-paper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { servicesFirebase, auth } from "../../services";
import { Background, Form, View as ViewUi } from "../../components/ui";
import { helpers } from "../../utilities";
import { routes } from "../../routes";
import { arrayMascotas } from "./constants/arrayMascotas";

export default function AgregarMascota({ navigation }) {
  //========================= Schema
  const schema = yup.object().shape({
    nombre: yup.string().required("Este campo es obligatorio"),
    idMascota: yup.string().required("Este campo es obligatorio"),
  });

  //=========================  Hook form
  const hookForm = useForm({
    defaultValues: {
      nombre: "",
      idMascota: null,
      selected: {},
    },
    resolver: yupResolver(schema),
  });

  //========================= Submit
  async function onSubmit(dataValues) {
    const values = testValues(dataValues);

    const response = await servicesFirebase.create("mascotasCarnets", values);

    if (!response) {
      Alert.alert("", "Error al cargar la información");
    }

    Alert.alert("", "Mascota creada con éxito");
    navigation.navigate(routes.CARNETS.LISTA_MASCOTAS);
  }

  function testValues(dataValues) {
    const userId = auth.currentUser.uid;

    const { selected, ...values } = dataValues;
    return helpers.trimObject({ ...values, idUsuario: userId });
  }

  function onError(errors) {
    Alert.alert("", "Debes de completar los campos requeridos");
  }

  function selectMascota(dataSelected) {
    hookForm.setValue("idMascota", dataSelected.id);
    hookForm.setValue("selected", dataSelected);
  }

  return (
    <Background.Image source={require("../../assets/fondos/menu.png")}>
      <ViewUi.Scroll.Parent>
        <Image style={styles.logoTop} source={require("../../assets/fondos/form.png")} />

        <View style={{ gap: 20 }}>
          <Card>
            <Card.Content>
              <Text variant="labelLarge" style={styles.labelTop}>
                Selecciona el avatar de tu mascota
              </Text>

              <View style={styles.cardContainer}>
                {arrayMascotas.ARRAY.map((data, index) => {
                  return (
                    <Pressable style={styles.card} key={index} onPress={() => selectMascota(data)}>
                      {hookForm.watch("idMascota") == data.id ? (
                        <Image style={styles.imgMascotaSelected} source={data.img} />
                      ) : (
                        <Image style={styles.imgMascota} source={data.img} />
                      )}
                    </Pressable>
                  );
                })}
              </View>
              <Text variant="labelLarge" style={styles.labelBottom}>
                {hookForm.watch("selected").nombre}
              </Text>
              <Divider style={{ marginTop: 20 }} />
              <Text variant="labelLarge" style={styles.labelBottomEscribenos}>
                {"Tu opinión nos importa mucho"}
              </Text>
              <Button
                mode="contained-tonal"
                onPress={() => {
                  navigation.navigate(routes.DRAWER.CONTACTOS);
                }}
              >
                Escribenos
              </Button>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content>
              <Form.Input hookForm={hookForm} name={"nombre"} label={"Nombre de tu mascota"} />
            </Card.Content>
          </Card>

          <Button icon="plus-circle" mode="contained" onPress={hookForm.handleSubmit(onSubmit, onError)}>
            Agregar mascota
          </Button>
        </View>
      </ViewUi.Scroll.Parent>
    </Background.Image>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    width: "25%",
    marginVertical: 10,
  },
  imgMascota: {
    width: "100%",
    height: 70,
    resizeMode: "contain",
    opacity: 0.3,
  },
  imgMascotaSelected: {
    width: "100%",
    height: 70,
    resizeMode: "contain",
    opacity: 1,
  },
  labelTop: {
    textAlign: "center",
    color: "#39CCE7",
    marginTop: 10,
    marginBottom: 20,
  },
  labelBottom: {
    textAlign: "center",
    color: "#39CCE7",
    marginTop: 20,
    marginBottom: 0,
  },
  labelBottomEscribenos: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  logoTop: {
    resizeMode: "contain",
    alignItems: "center",
    width: "100%",
    height: 80,
    marginBottom: 20,
  },
});
