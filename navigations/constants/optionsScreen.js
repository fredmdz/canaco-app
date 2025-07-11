import RightIcon from "../../components/icons/RightIcon";
import LeftIcon from "../../components/icons/LeftIcon";

const optionsScreen = {
  OPTIONS_STACK: {
    headerStyle: { backgroundColor: "#314c95" },
    headerTintColor: "#fff",
    headerRight: RightIcon,
    headerLeft: LeftIcon,
  },

  OPTIONS_LOGIN: {
    headerStyle: { backgroundColor: "#314c95" },
    headerTintColor: "#fff",
  },

  OPTIONS_DRAWER: {
    headerStyle: { backgroundColor: "#314c95" },
    headerTintColor: "#fff",
    drawerActiveTintColor: "#fff",
    drawerLabelStyle: {
      color: "#fff",
    },
    drawerActiveBackgroundColor: "#00000030",
    drawerStyle: {
      backgroundColor: "#ffffffff",
      color: "#fff",
      width: 250,
    },
    drawerItemStyle: {
      padding: 0,
      marginVertical: 4,
    },
  },
};

export { optionsScreen };
