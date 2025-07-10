import { StyleSheet, View, Dimensions } from "react-native";

import { View as ViewUi, Background } from "../../components/ui";
import CarouselImages from "./components/CarouselImages";
import Card from "./components/Card";
import { routes } from "../../routes";

export default function Menu() {
  // Saca las dimensiones de la imagen
  const width = Dimensions.get("window").width;
  let heightImage = 210;
  if (width >= 600) {
    heightImage = 300;
  } else if (width >= 1400) {
    heightImage = 400;
  } else if (width >= 1600) {
    heightImage = 500;
  } else if (width >= 2000) {
    heightImage = 600;
  }

  return (
    <Background.Image source={require("../../assets/fondos/menu3.png")}>
      <ViewUi.Scroll.ParentFull>
        <View style={styles.parentContainer}>
          <Card
            to={routes.DRAWER.MIS_MASCOTAS}
            image={require("../../assets/menu/mascota.png")}
            heightImage={heightImage}
          />
          <Card to={routes.DRAWER.CLUB_RAZAS} image={require("../../assets/menu/club.png")} heightImage={heightImage} />
          <Card to={routes.DRAWER.CARNETS} image={require("../../assets/menu/carnet.png")} heightImage={heightImage} />
          <Card
            to={routes.DRAWER.VETERINARIOS}
            image={require("../../assets/menu/veterinarios.png")}
            heightImage={heightImage}
          />
          <Card to={routes.DRAWER.EVENTOS} image={require("../../assets/menu/eventos.png")} heightImage={heightImage} />
          <Card
            to={routes.DRAWER.CONTACTOS}
            image={require("../../assets/menu/contactanos.png")}
            heightImage={heightImage}
          />
          <Card
            to={routes.DRAWER.PREGUNTAS}
            image={require("../../assets/menu/preguntas.png")}
            heightImage={heightImage}
          />
          <Card
            to={routes.DRAWER.ADOPCIONES}
            image={require("../../assets/menu/adopciones.png")}
            heightImage={heightImage}
          />
          <Card to={routes.DRAWER.TAXIS} image={require("../../assets/menu/taxi.png")} heightImage={heightImage} />
          <Card to={routes.DRAWER.OFERTAS} image={require("../../assets/menu/ofertas.png")} heightImage={heightImage} />
        </View>
        <View style={{ backgroundColor: "#777" }}>
          <CarouselImages width={width} />
        </View>
      </ViewUi.Scroll.ParentFull>
    </Background.Image>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    marginTop: 20,
  },
});
