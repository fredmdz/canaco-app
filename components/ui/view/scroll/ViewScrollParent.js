import { ScrollView, View, StyleSheet } from "react-native";

export default function ViewScrollParent({ children }) {
  return (
    <View style={styles.scrollContainer}>
      <ScrollView>
        <View style={styles.scroll}>{children}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 10,
  },
});
