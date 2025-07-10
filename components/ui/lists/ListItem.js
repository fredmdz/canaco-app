import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function ListItem({ title, subtitle, icon, color }) {
  return (
    <View style={styles.item}>
      <Icon name={icon} size={32} color={color} />
      <View>
        <Text variant="labelLarge" style={styles.title}>
          {title}
        </Text>
        <Text variant="labelLarge" style={styles.subTitle}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingRight: 70,
    backgroundColor: "rgba(245, 245, 245, 0.7)",
    // marginVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#78EBFF",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  subTitle: {
    marginTop: 10,
    color: "#333",
    fontSize: 14,
  },
});
