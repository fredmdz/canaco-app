import { View, StyleSheet, Dimensions } from "react-native";
import { ActivityIndicator } from "react-native-paper";
const { height } = Dimensions.get("window");

export default function PreLoader() {
  return (
    <View style={styles.preloader}>
      <ActivityIndicator size={"large"} />
    </View>
  );
}

const styles = StyleSheet.create({
  preloader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height,
  },
});
