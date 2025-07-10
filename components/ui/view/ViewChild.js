import { View, StyleSheet } from "react-native";

export default function ViewChild({ children }) {
  return <View style={styles.viewContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  viewContainer: {
    // marginTop: 20,
    // marginBottom: 20,
    marginHorizontal: 10,
  },
});
