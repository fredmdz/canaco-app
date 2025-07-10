import { useEffect, useState } from "react";
import { StyleSheet, View, Image, Pressable, Linking } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { servicesFirebase } from "../../../services/";
import useLocationUser from "../../../hooks/useLocationUser";
import { helpers } from "../../../utilities";

export default function CarouselImages({ width }) {
  const [anuncios, setAnuncios] = useState([]);

  //========================= Hook location
  // const { location } = useLocationUser();

  //========================= Get
  useEffect(() => {
    async function getAll() {
      const items = await servicesFirebase.getAll("banners");
      const itemsNew = items.filter((data) => helpers.isRangeDates(data.fechaInicio.toDate(), data.fechaFin.toDate()));
      setAnuncios(itemsNew);
    }
    getAll();
  }, []);

  return (
    <Carousel
      loop
      width={width}
      height={width >= 600 ? 300 : width / 2}
      autoPlay={true}
      autoPlayInterval={2500}
      data={anuncios}
      scrollAnimationDuration={1000}
      renderItem={({ item }) => {
        return (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#78EBFF",
            }}
          >
            <Pressable onPress={() => Linking.openURL(item.web)}>
              <Image source={{ uri: item.images }} style={styles.image} />
            </Pressable>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
});
