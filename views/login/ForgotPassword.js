import { View, Image, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Button, Card } from "react-native-paper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { servicesUsers } from "../../services";
import { Form, Background } from "../../components/ui/";
import { helpers } from "../../utilities";

export default function ForgotPassword() {
  // Schema
  const schema = yup.object().shape({
    correo: yup.string().required("Este campo es obligatorio"),
  });

  // Hook form
  const hookForm = useForm({
    defaultValues: { correo: "" },
    resolver: yupResolver(schema),
  });

  // Submit
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
    <Background.Image source={require("../../assets/fondos/city2.png")} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ width: "100%", maxWidth: 400, alignItems: "center" }}>
            <Image
              source={require("../../assets/login/logo1.png")}
              style={{ width: 400, height: 200, marginBottom: 20 }}
              resizeMode="contain"
            />

            <Card style={{ width: "100%" }}>
              <Card.Content style={{ gap: 20 }}>
                <Form.Input
                  hookForm={hookForm}
                  name={"correo"}
                  label={"Correo"}
                  keyboardType={"email-address"}
                />

                <Button
                  icon="check"
                  mode="contained"
                  buttonColor="#314c95"
                  onPress={hookForm.handleSubmit(onSubmit, onError)}
                >
                  Recuperar contraseña
                </Button>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Background.Image>
  );
}
