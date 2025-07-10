import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { routes } from "../../routes";

export default RightIcon = () => {
  const navigation = useNavigation();
  return <Icon name="home" size={30} color="#fff" onPress={() => navigation.navigate(routes.MENU)} />;
};
