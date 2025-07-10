import { View, Image, StyleSheet, Alert } from "react-native";
import { Button, Card } from "react-native-paper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { servicesUsers } from "../../services";
import { Form, Background } from "../../components/ui/";
import { helpers } from "../../utilities";

export default function Register() {
  //========================= Schema
  const schema = yup.object().shape({
    correo: yup.string().required("Este campo es obligatorio"),
    password: yup.string().required("Este campo es obligatorio"),
    nombre: yup.string().required("Este campo es obligatorio"),
    apellidos: yup.string().required("Este campo es obligatorio"),
  });

  //=========================  Hook form
  const hookForm = useForm({
    defaultValues: {
      correo: "",
      password: "",
      nombre: "",
      apellidos: "",
    },
    resolver: yupResolver(schema),
  });

  //========================= Submit
  async function onSubmit(dataValues) {
    const values = testValues(dataValues);
    const responseCreate = await servicesUsers.create(values.correo, values.password);
    const responseInfo = await servicesUsers.createInfo(responseCreate.uid, values);

    if (!responseCreate && !responseInfo) {
      Alert.alert("", "Error al crear la cuenta");
      return;
    }

    Alert.alert("", "¡Bienvenido a MasHuezus!");
  }

  function testValues(dataValues) {
    return helpers.trimObject(dataValues);
  }

  function onError(errors) {
    Alert.alert("", "Debes de completar los campos requeridos");
  }

  return (
    <Background.Image source={require("../../assets/fondos/city2.png")}>
      <View>
        <Image style={styles.logo} source={require("../../assets/login/logo7.png")} />
        <Card style={{ margin: 10 }}>
          <Card.Content style={{ gap: 20 }}>
            <Form.Input hookForm={hookForm} name={"correo"} label={"Correo"} keyboardType={"email-address"} />
            <Form.Input hookForm={hookForm} name={"password"} label={"Contraseña"} secureTextEntry={true} />
            <Form.Input hookForm={hookForm} name={"nombre"} label={"Nombre"} />
            <Form.Input hookForm={hookForm} name={"apellidos"} label={"Apellidos"} />

            <Button
              icon="check"
              mode="contained"
              buttonColor="#0088cd"
              onPress={hookForm.handleSubmit(onSubmit, onError)}
            >
              Registrarse
            </Button>
          </Card.Content>
        </Card>
      </View>
    </Background.Image>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
