import { StyleSheet, View, Image, Alert } from "react-native";
import { Card, Button } from "react-native-paper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { servicesFirebase, auth } from "../../../services";
import { Background, View as ViewUi, Form } from "../../../components/ui/";
import Map from "./Map";
import { helpers } from "../../../utilities";
import { routes } from "../../../routes";
import { razas } from "../constants/razas";

export default function AgregarMascotaForm({ navigation, isEdit, data }) {
  //========================= Schema
  const schema = yup.object().shape({
    name: yup.string().required("Este campo es obligatorio"),
    raza: yup.string().required("Este campo es obligatorio"),
    sexo: yup.string().required("Este campo es obligatorio"),
    peso: yup.string().required("Este campo es obligatorio"),
    description: yup.string().required("Este campo es obligatorio"),
    image: yup.string().required("Este campo es obligatorio"),
  });

  //=========================  Hook form
  const hookForm = useForm({
    defaultValues: {
      name: data.name ?? "",
      raza: data.raza ?? null,
      sexo: data.sexo ?? null,
      chosenDate: data.chosenDate ?? new Date(),
      peso: data.peso ?? "",
      description: data.description ?? "",
      celular: data.celular ?? "",
      image: data.image ?? null,
      lastLat: data.lastLat ?? 0,
      lastLong: data.lastLong ?? 0,
    },
    resolver: yupResolver(schema),
  });

  //========================= Submit
  async function onSubmit(dataValues) {
    let response = null;
    const values = testValues(dataValues);

    if (isEdit) {
      response = await servicesFirebase.edit("mascotas", data.id, values);
    } else {
      response = await servicesFirebase.create("mascotas", values);
    }

    if (!response) {
      Alert.alert("", "Error al cargar la información");
    }

    Alert.alert("", `Mascota ${isEdit ? "editada" : "creada"} con éxito`);
    navigation.navigate(routes.MIS_MASCOTAS.LISTA_MASCOTAS);
  }

  function testValues(dataValues) {
    const userId = auth.currentUser.uid;

    const values = {
      ...dataValues,
      idUsuario: userId,
    };

    return helpers.trimObject(values);
  }

  function onError(errors) {
    Alert.alert("", "Debes de completar los campos requeridos");
  }

  return (
    <Background.Image source={require("../../../assets/fondos/menu.png")}>
      <ViewUi.Scroll.Parent>
        <Image style={styles.logoTop} source={require("../../../assets/fondos/form.png")} />

        <View style={{ gap: 20 }}>
          <Card>
            <Card.Content>
              <View style={{ gap: 20 }}>
                <Form.Input hookForm={hookForm} name={"name"} label={"Nombre"} />

                <Form.Picker hookForm={hookForm} name={"raza"} label={"Razaerwer"}>
                  <Form.PickerItem label="Escoge una raza" value="" />
                  {razas.ARRAY.map((data) => (
                    <Form.PickerItem key={data.name} label={data.name} value={data.name} />
                  ))}
                </Form.Picker>

                <Form.Picker hookForm={hookForm} name={"sexo"} label={"Sexo"}>
                  <Form.PickerItem label="Escoge un sexo" />
                  <Form.PickerItem label={"Hembra"} value={"Hembra"} />
                  <Form.PickerItem label={"Macho"} value={"Macho"} />
                </Form.Picker>
              </View>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <View style={{ gap: 20 }}>
                <Form.PickerDate hookForm={hookForm} name={"chosenDate"} label={"Cumpleaños"} />
                <Form.Input
                  hookForm={hookForm}
                  name={"peso"}
                  label={"Peso de tu mascota en kg."}
                  keyboardType="number-pad"
                />
                <Form.Input
                  hookForm={hookForm}
                  name={"description"}
                  label={"Características"}
                  multiline={true}
                  numberOfLines={4}
                />
              </View>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Form.Image hookForm={hookForm} label={"Foto de tu mascota"} name={"image"} folder={"mascotas"} />
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Form.Input
                hookForm={hookForm}
                name={"celular"}
                label={"Teléfono celular"}
                keyboardType="phone-pad"
                style={{ marginBottom: 10 }}
              />
              <Button
                icon="alert"
                mode="outlined"
                onPress={() =>
                  Alert.alert(
                    "",
                    "El número de contacto es OPCIONAL, sin embargo, sin el no podrán contactarte para socializar"
                  )
                }
              >
                Advertencia: El número de contacto ...
              </Button>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Map hookForm={hookForm} lat={"lastLat"} long={"lastLong"} />
            </Card.Content>
          </Card>
          <Button icon="plus-circle" mode="contained" onPress={hookForm.handleSubmit(onSubmit, onError)}>
            {`${isEdit ? "Editar" : "Agregar"} mascota`}
          </Button>
        </View>
      </ViewUi.Scroll.Parent>
    </Background.Image>
  );
}

const styles = StyleSheet.create({
  logoTop: {
    resizeMode: "contain",
    alignItems: "center",
    width: "100%",
    height: 80,
    marginBottom: 20,
  },
});
