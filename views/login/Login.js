import {
  View,
  StyleSheet,
  Alert,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, Card } from "react-native-paper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { servicesUsers } from "../../services";
import { Form, Background } from "../../components/ui/";
import { helpers } from "../../utilities";

export default function Login() {
  const schema = yup.object().shape({
    correo: yup.string().required("Este campo es obligatorio"),
    password: yup.string().required("Este campo es obligatorio"),
  });

  const hookForm = useForm({
    defaultValues: {
      correo: "",
      password: "",
      showPass: false,
    },
    resolver: yupResolver(schema),
  });

  async function onSubmit(dataValues) {
    const values = testValues(dataValues);
    const response = await servicesUsers.login(values.correo, values.password);

    if (!response) {
      Alert.alert("", "Error al iniciar sesión");
      return;
    }

    if (response.emailVerified) {
      Alert.alert("", "¡Bienvenido A CANACO SERVYTUR!");
    } else {
      // No mostramos bienvenida si no está verificado,
      // la pantalla de VerifyEmail se encargará de informarle.
      console.log("Usuario logueado pero no verificado.");
    }
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
        keyboardVerticalOffset={80}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <Card style={styles.card}>
                <Card.Content style={styles.cardContent}>
                  <Form.Input
                    hookForm={hookForm}
                    name="correo"
                    label="Correo"
                    keyboardType="email-address"
                  />
                  <Form.Input
                    hookForm={hookForm}
                    name="password"
                    label="Contraseña"
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
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Background.Image>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
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
