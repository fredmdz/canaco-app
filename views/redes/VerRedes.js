import React from "react";
import { ScrollView, View, Text, Pressable, Image, Linking, StyleSheet, Dimensions } from "react-native";

const socialLinks = [
  { key: "facebook", name: "Facebook", url: "https://www.facebook.com/CANACOTUX/", image: require("../../assets/redes/face.png") },
  { key: "instagram", name: "Instagram", url: "https://www.instagram.com/canaco_tux/", image: require("../../assets/redes/insta.png") },
  { key: "twitter", name: "Twitter", url: "https://x.com/canacotux", image: require("../../assets/redes/twitter.png") },
  { key: "tiktok", name: "TikTok", url: "https://www.tiktok.com/@canacoservyturtux?_t=8UJSpesWIRK&_r=1", image: require("../../assets/redes/tiktok.png") },
  { key: "web", name: "Sitio Web", url: "https://canacotuxtla.org.mx/", image: require("../../assets/redes/canaco.png") },
  { key: "youtube", name: "YouTube", url: "https://www.youtube.com/channel/UCtnLeEME0y0ul7rkOLJaxFQ", image: require("../../assets/redes/youtube.png") },
];

const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const cardSize = (screenWidth - 60) / numColumns;

export default function VerRedes() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Consulta nuestras redes sociales</Text>
      <View style={styles.grid}>
        {socialLinks.map(({ key, name, url, image }) => (
          <Pressable
            key={key}
            style={[styles.card, { width: cardSize, height: cardSize }]}
            onPress={() => Linking.openURL(url)}
          >
            <Image source={image} style={styles.icon} />
            <Text style={styles.label}>{name}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#314c95",
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    // Sin sombra para todos los elementos, diseño uniforme:
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    borderWidth: 1,
    borderColor: "#E0E0E0", // Borde sutil para separar las tarjetas
  },
  icon: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#314c95",
    textAlign: "center",
  },
});
