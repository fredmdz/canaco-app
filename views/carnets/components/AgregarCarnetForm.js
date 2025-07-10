import { View, Alert, StyleSheet, Image } from "react-native";
import { Card, Button } from "react-native-paper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { servicesFirebase } from "../../../services";
import { Background, View as ViewUi, Form } from "../../../components/ui/";
import { helpers } from "../../../utilities";
import { routes } from "../../../routes";

export default function AgregarCarnetForm({ navigation, isEdit, idMascota, dataMascota, data }) {
  //========================= Schema
  const schema = yup.object().shape({
    motivo: yup.string().required("Este campo es obligatorio"),
    peso: yup.string().required("Este campo es obligatorio"),
  });

  //=========================  Hook form
  const hookForm = useForm({
    defaultValues: {
      fechaCita: data.fechaCita ?? new Date(),
      fechaProxCita: data.fechaProxCita ?? new Date(),
      medicamento: data.medicamento ?? null,
      motivo: data.motivo ?? "",
      peso: data.peso ?? "",
      image: data.image ?? null,
    },
    resolver: yupResolver(schema),
  });

  //========================= Submit
  async function onSubmit(dataValues) {
    let response = null;
    const values = testValues(dataValues);

    if (isEdit) {
      // response = await servicesFirebase.edit("mascotas", data.id, values);
    } else {
      response = await servicesFirebase.create("carnets", values);
    }

    if (!response) {
      Alert.alert("", "Error al cargar la información");
    }

    Alert.alert("", `Carnet ${isEdit ? "editado" : "creado"} con éxito`);
    navigation.navigate(routes.CARNETS.LISTA_CARNETS, { dataMascota: dataMascota });
  }

  function testValues(dataValues) {
    return helpers.trimObject({
      idMascota: idMascota,
      ...dataValues,
    });
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
                <Form.Input
                  hookForm={hookForm}
                  name={"motivo"}
                  label={"Motivo de la visita"}
                  multiline={true}
                  numberOfLines={4}
                />
                <Form.Input
                  hookForm={hookForm}
                  name={"medicamento"}
                  label={"Medicamento aplicado"}
                  multiline={true}
                  numberOfLines={4}
                />
                <Form.Input
                  hookForm={hookForm}
                  name={"peso"}
                  label={"Peso de tu mascota en kg."}
                  keyboardType="number-pad"
                />
              </View>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content>
              <View style={{ gap: 20 }}>
                <Form.PickerDate hookForm={hookForm} name={"fechaCita"} label={"Fecha de cita"} />
                <Form.PickerDate hookForm={hookForm} name={"fechaProxCita"} label={"Fecha prox. cita"} />
              </View>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content>
              <Form.Image hookForm={hookForm} label={"Foto"} name={"image"} folder={"carnets"} />
            </Card.Content>
          </Card>

          <Button icon="plus-circle" mode="contained" onPress={hookForm.handleSubmit(onSubmit, onError)}>
            {`${isEdit ? "Editar" : "Agregar"} carnet`}
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
