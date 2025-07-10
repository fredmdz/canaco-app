import { View } from "react-native";

export default function ListParent({ children }) {
  return <View style={{ gap: 5 }}>{children}</View>;
}
