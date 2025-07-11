import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { View as ViewUi, Background } from "../../components/ui";
import Card from "./components/Card";

export default function Menu() {
  const empresas = [
    {
      title: "TEC SA de CV",
      description: "Soluciones confiables para tu negocio.",
      image: require("../../assets/menu/empresa1.jpg"),
    },
    {
      title: "Laboratorio ROVISAN",
      description: "Análisis clínicos con descuento.",
      image: require("../../assets/menu/empresa2.jpg"),
    },
    {
      title: "Passionaria Floreria's",
      description: "Passionaria Floreria's.",
      image: require("../../assets/menu/empresa3.jpg"),
    },
    {
      title: "Mezcal Mononegro ",
      description: "Mezcal Mononegro.",
      image: require("../../assets/menu/empresa4.jpg"),
    },
    {
      title: "Maxifarmacias",
      description: " ¡Especialidad a tu alcance!.",
      image: require("../../assets/menu/empresa5.jpg"),
    },
    {
      title: "J.A. Gordillo",
      description: "Sector Asegurador y Afianzador.",
      image: require("../../assets/menu/empresa6.jpg"),
    },
  ];

  return (
      <ViewUi.Scroll.ParentFull>
        <View style={styles.container}>
          {empresas.map((empresa, index) => (
            <View key={index} style={styles.card}>
              <Card image={empresa.image} heightImage={100} />
              <Text style={styles.title}>{empresa.title}</Text>
              <Text style={styles.description}>{empresa.description}</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Ver más</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ViewUi.Scroll.ParentFull>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 20,
    gap: 16,
  },
  card: {
    width: "47%",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingBottom: 16,
    alignItems: "center",
  },
  title: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    color: "#2c3e50",
  },
  description: {
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 10,
    color: "#606060",
    marginTop: 6,
  },
  button: {
    marginTop: 12,
    backgroundColor: "#1a237e",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});
