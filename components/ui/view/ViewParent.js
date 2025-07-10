import { View, StyleSheet } from "react-native";

export default function ViewParent({ children }) {
  return <View style={styles.viewContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 10,
  },
});
