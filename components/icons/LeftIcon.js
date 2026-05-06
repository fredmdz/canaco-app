import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const LeftIcon = ({ canGoBack, customNavigation }) => {
  const navigation = useNavigation();
  const nav = customNavigation || navigation;

  const handlePress = () => {
    if (canGoBack) {
      nav.goBack();
    } else {
      nav.navigate("drawerInicio");
    }
  };

  return (
    <Icon
      name="arrow-left"
      size={30}
      color="#fff"
      style={{ marginRight: 20 }}
      onPress={handlePress}
    />
  );
};

export default LeftIcon;
