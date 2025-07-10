import { View, Image, StyleSheet, Alert } from "react-native";
import { Button, Card } from "react-native-paper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { servicesUsers } from "../../services";
import { Form, Background } from "../../components/ui/";
import { helpers } from "../../utilities";

export default function Login() {
  //========================= Schema
  const schema = yup.object().shape({
    correo: yup.string().required("Este campo es obligatorio"),
    password: yup.string().required("Este campo es obligatorio"),
  });

  //=========================  Hook form
  const hookForm = useForm({
    defaultValues: {
      correo: "",
      password: "",
      showPass: false,
    },
    resolver: yupResolver(schema),
  });

  //========================= Submit
  async function onSubmit(dataValues) {
    const values = testValues(dataValues);
    const response = await servicesUsers.login(values.correo, values.password);

    if (!response) {
      Alert.alert("", "Error al iniciar sesion");
      return;
    }

    Alert.alert("", "¡Bienvenido!");
  }

  function testValues(dataValues) {
    const { showPass, ...values } = dataValues;
    return helpers.trimObject(values);
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
            <Form.Input
              hookForm={hookForm}
              name={"password"}
              label={"Contraseña"}
              secureTextEntry={hookForm.watch("showPass") ? false : true}
            />
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Button
                mode="text"
                onPress={() => {
                  hookForm.setValue("showPass", !hookForm.getValues("showPass"));
                }}
              >
                Ver Contraseña
              </Button>
            </View>
            <Button
              icon="check"
              mode="contained"
              buttonColor="#0088cd"
              onPress={hookForm.handleSubmit(onSubmit, onError)}
            >
              Entrar
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
