import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const LeftIcon = () => {
  const navigation = useNavigation();
  return (
    <Icon name="arrow-left" size={30} color="#fff" style={{ marginRight: 20 }} onPress={() => navigation.goBack()} />
  );
};

export default LeftIcon;
