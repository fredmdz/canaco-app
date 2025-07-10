import { View, Image, StyleSheet, Alert } from "react-native";
import { Button, Card } from "react-native-paper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { servicesUsers } from "../../services";
import { Form, Background } from "../../components/ui/";
import { helpers } from "../../utilities";

export default function ForgotPassword() {
  //========================= Schema
  const schema = yup.object().shape({
    correo: yup.string().required("Este campo es obligatorio"),
  });

  //=========================  Hook form
  const hookForm = useForm({
    defaultValues: {
      correo: "",
    },
    resolver: yupResolver(schema),
  });

  //========================= Submit
  async function onSubmit(dataValues) {
    const values = testValues(dataValues);
    const response = await servicesUsers.resetPassword(values.correo);

    if (!response) {
      Alert.alert("", "Error al mandar el correo");
      return;
    }

    Alert.alert("", "Por favor revisa tu correo electrónico y cambia la contraseña");
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
        <Image style={styles.logo} source={require("../../assets/login/logo8.png")} />
        <Card style={{ margin: 10 }}>
          <Card.Content style={{ gap: 20 }}>
            <Form.Input hookForm={hookForm} name={"correo"} label={"Correo"} keyboardType={"email-address"} />

            <Button
              icon="check"
              mode="contained"
              buttonColor="#0088cd"
              onPress={hookForm.handleSubmit(onSubmit, onError)}
            >
              Recuperar contraseña
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
