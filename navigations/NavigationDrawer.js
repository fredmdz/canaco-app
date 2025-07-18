import { Image, View, StyleSheet } from "react-native";
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer";
import { Text } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

// Tus Stack Navigators (módulos)
import NavigationEventos from "./modules/NavigationEventos";
import NavigationCursos from "./modules/NavigationCursos";
import NavigationContactos from "./modules/NavigationContactos";
import NavigationOpciones from "./modules/NavigationOpciones";
import NavigationEmpresas from "./modules/NavigationEmpresas";
import NavigationOfertas from "./modules/NavigationOfertas";
import NavigationRedes from "./modules/NavigationRedes"; 

import { routes } from "../routes";
import { optionsScreen } from "./constants/optionsScreen";

const Drawer = createDrawerNavigator();

export default function NavigationDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName={routes.MENU}
      screenOptions={optionsScreen.OPTIONS_DRAWER}
      drawerContent={(props) => <MenuScroll {...props} />}
    >
      <Drawer.Screen
        name={routes.MENU}
        component={NavigationEmpresas}
        options={{
          title: "Empresas",
          drawerLabel: () => <ItemMenuText text={"Empresas"} />,
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Icon name="domain" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={routes.DRAWER.EVENTOS}
        component={NavigationEventos}
        options={{
          headerShown: false,
          drawerLabel: () => <ItemMenuText text={"Eventos"} />,
          drawerIcon: ({ color, size }) => (
            <Icon name="calendar-month" size={size} color={color} />
          ),
        }}
      />
    
      <Drawer.Screen
        name={routes.DRAWER.CURSOS}
        component={NavigationCursos}
        options={{
          headerShown: false,
          drawerLabel: () => <ItemMenuText text={"Cursos"} />,
          drawerIcon: ({ color, size }) => ( 
            <Icon name="book-open" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name={routes.DRAWER.OFERTAS}
        component={NavigationOfertas}
        options={{
          headerShown: false,
          drawerLabel: () => <ItemMenuText text={"Promociones"} />,
          drawerIcon: ({ color, size }) => (
            <Icon name="tag-multiple" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={routes.DRAWER.CONTACTOS}
        component={NavigationContactos}
        options={{
          headerShown: false,
          drawerLabel: () => <ItemMenuText text={"Directorio"} />,
          drawerIcon: ({ color, size }) => (
            <Icon name="phone" size={size} color={color} />
          ),
        }}
      />
      
      <Drawer.Screen
        name={routes.DRAWER.REDES} 
        component={NavigationRedes}
        options={{
          title: "Redes sociales",
          drawerLabel: () => <ItemMenuText text={"Redes sociales"} />,
          drawerIcon: ({ color, size }) => (
            <Icon name="share-variant" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name={routes.DRAWER.OPCIONES}
        component={NavigationOpciones}
        options={{
          headerShown: false,
          drawerLabel: () => <ItemMenuText text={"Opciones"} />,
          drawerIcon: ({ color, size }) => (
            <Icon name="cog" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const MenuScroll = ({ ...props }) => {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 40,
          paddingTop: 40,
        }}
      >
        <Image
          source={require("../assets/login/logo1.png")}
          resizeMode="contain"
          style={{
            width: 400,
            height: 150,
          }}
        />
      </View>
      <DrawerItemList {...props} />
      <Text style={{ color: "#314c95", fontSize: 14, paddingTop: 30, paddingBottom: 10, textAlign: "center" }}>
        {"CANACO SERVYTUR"}
      </Text>
    </DrawerContentScrollView>
  );
};

const ItemMenuText = ({ text }) => {
  return <Text style={styles.itemMenuText}>{text}</Text>;
};

const styles = StyleSheet.create({
  itemMenuText: {
    color: "#314c95",
    fontSize: 16,
    marginLeft: -18,
  },
});