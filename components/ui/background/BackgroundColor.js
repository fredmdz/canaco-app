import { View } from "react-native";

export default function BackgroundColor({ children, color }) {
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        backgroundColor: color,
      }}
    >
      {children}
    </View>
  );
}
