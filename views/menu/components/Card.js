import { StyleSheet, View, Image, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Card({ to, image, heightImage }) {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate(to)}>
      <View style={styles.container}>
        <Image source={image} style={{ ...styles.image, height: heightImage }} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width / 2,
  },
  image: {
    height: 180,
    resizeMode: "contain",
    width: "100%",
  },
});
