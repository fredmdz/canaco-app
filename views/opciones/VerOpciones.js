import { useEffect, useState } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { Text, Button, Card } from "react-native-paper";

import { servicesFirebase, servicesUsers, auth } from "../../services";
import { View as ViewUi, Background } from "../../components/ui";
import { helpers } from "../../utilities/helpers";

export default function VerOpciones() {
  const [data, setData] = useState({});

  useEffect(() => {
    get();
  }, []);

  async function get() {
    const userId = auth.currentUser.uid;
    const item = await servicesFirebase.getOne("usuarios", userId);
    setData(item);
  }

  function logout() {
    Alert.alert("", "¿Deseas cerrar tu sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Si ",
        onPress: () => {
          servicesUsers.logout();
        },
      },
    ]);
  }

  function deleteUser() {
    Alert.alert("", "¿Deseas eliminar tu cuenta permanentemente?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Si, Eliminar",
        onPress: async () => {
          Alert.alert("", "¿Todos tus datos seran borrados?", [
            {
              text: "Cancelar",
              style: "cancel",
            },
            {
              text: "Si, estoy seguro ",
              onPress: async () => {
                const userId = auth.currentUser.uid;
                await servicesFirebase.deleteUser(userId);
                await servicesFirebase.deleteUserData(userId);
              },
            },
          ]);
        },
      },
    ]);
  }

  return (
    <Background.Image source={require("../../assets/fondos/menu.png")}>
      <ViewUi.Scroll.Parent>
        <Image style={styles.logoTop} source={require("../../assets/fondos/form.png")} />

        <Card style={{ marginBottom: 20 }}>
          <Card.Content>
            <View style={styles.itemTitle}>
              <Text variant="titleMedium" style={styles.textTitle}>
                {"Correo:"}
              </Text>
              <Text variant="titleMedium" style={{}}>
                {!helpers.isObjectEmpty(data) && data.correo}
              </Text>
            </View>
            <View style={styles.itemTitle}>
              <Text variant="titleMedium" style={styles.textTitle}>
                {"Nombre:"}
              </Text>
              <Text variant="titleMedium" style={{}}>
                {!helpers.isObjectEmpty(data) && data.nombre}
              </Text>
            </View>
            <View style={styles.itemTitle}>
              <Text variant="titleMedium" style={styles.textTitle}>
                {"Apellidos:"}
              </Text>
              <Text variant="titleMedium" style={{}}>
                {!helpers.isObjectEmpty(data) && data.apellidos}
              </Text>
            </View>
          </Card.Content>
        </Card>
        <Card style={{ marginBottom: 20 }}>
          <Card.Content>
            <Text variant="titleMedium" style={{ textAlign: "center", marginBottom: 10 }}>
              Cerrar sesión
            </Text>
            <Button icon="account-arrow-right" mode="contained" onPress={() => logout()}>
              Cerrar
            </Button>
          </Card.Content>
        </Card>
        <Card style={{}}>
          <Card.Content>
            <Text variant="titleMedium" style={{ textAlign: "center", marginBottom: 10 }}>
              Eliminar mi cuenta
            </Text>
            <Button icon="account-remove" mode="contained" buttonColor="#ef4444" onPress={() => deleteUser()}>
              Eliminar
            </Button>
          </Card.Content>
        </Card>
      </ViewUi.Scroll.Parent>
    </Background.Image>
  );
}

const styles = StyleSheet.create({
  itemTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    flex: 1,
  },

  textTitle: {
    fontWeight: "bold",
    marginRight: 5,
  },
  logoTop: {
    resizeMode: "contain",
    alignItems: "center",
    width: "100%",
    height: 80,
    marginBottom: 20,
  },
});
