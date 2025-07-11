import { View, StyleSheet, Alert } from "react-native";
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

  //========================= Hook form
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
      Alert.alert("", "Error al iniciar sesión");
      return;
    }

    Alert.alert("", "¡Bienvenido!");
  }

  function testValues(dataValues) {
    const { showPass, ...values } = dataValues;
    return helpers.trimObject(values);
  }

  function onError(errors) {
    Alert.alert("", "Debes completar los campos requeridos");
  }

  return (
    <Background.Image source={require("../../assets/fondos/city2.png")}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Form.Input
              hookForm={hookForm}
              name={"correo"}
              label={"Correo"}
              keyboardType={"email-address"}
            />
            <Form.Input
              hookForm={hookForm}
              name={"password"}
              label={"Contraseña"}
              secureTextEntry={!hookForm.watch("showPass")}
            />
            <View style={styles.togglePass}>
              <Button
                mode="text"
                onPress={() =>
                  hookForm.setValue(
                    "showPass",
                    !hookForm.getValues("showPass")
                  )
                }
              >
                Ver Contraseña
              </Button>
            </View>
            <Button
              icon="check"
              mode="contained"
              buttonColor="#314c95"
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
  container: {
    flex: 1,
    justifyContent: "center", // Centrado vertical
    alignItems: "center",     // Centrado horizontal
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    margin: 10,
  },
  cardContent: {
    gap: 20,
  },
  togglePass: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
