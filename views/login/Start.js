import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Image,
} from "react-native";
import { Button, Card } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { routes } from "../../routes";

export default function Start({ navigation }) {
  return (
    <ImageBackground
      source={require("../../assets/fondos/city2.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>

          <Image
            source={require("../../assets/login/logo1.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Button
                icon={() => <Icon name="arrow-right" size={20} color="#fff" />}
                mode="contained"
                buttonColor="#314c95"
                style={styles.button}
                onPress={() => navigation.navigate(routes.START.LOGIN)}
              >
                <Text style={{ color: "#fff" }}>Entrar</Text>
              </Button>

              <Button
                icon={() => <Icon name="account" size={20} color="#fff" />}
                mode="contained"
                buttonColor="#314c95"
                style={styles.button}
                onPress={() => navigation.navigate(routes.START.REGISTER)}
              >
                <Text style={{ color: "#fff" }}>Registrar</Text>
              </Button>

              <Pressable
                style={styles.forgotPressable}
                onPress={() => navigation.navigate(routes.START.FORGOT_PASSWORD)}
              >
                <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
              </Pressable>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  innerContainer: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  logo: {
    width: 380,
    height: 220,
    marginBottom: 0,
  },
  card: {
    width: "100%",
    paddingVertical: 30,
    backgroundColor: "#ffffffdd", // Fondo blanco semitransparente
    borderRadius: 15,
    elevation: 0,
    shadowColor: "transparent",
  },
  cardContent: {
    alignItems: "center",
    gap: 15,
  },
  button: {
    width: "100%",
    justifyContent: "center",
  },
  forgotPressable: {
    width: "100%",
    alignItems: "center",
    marginTop: 25,
    paddingHorizontal: 10,  
  },
  forgotText: {
    color: "#314c95",
    fontSize: 16,
    textDecorationLine: "underline",
    textAlign: "center", 
     width: "100%",
  },
});
