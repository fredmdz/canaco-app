import { Image, View } from "react-native";
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer";
import { Text } from "react-native-paper";

import Menu from "../views/menu/Menu";
import Redes from "../views/redes/VerRedes";
import NavigationEventos from "./modules/NavigationEventos";
import NavigationBeneficios from "./modules/NavigationBeneficios";
import NavigationCursos from "./modules/NavigationCursos";
import NavigationContactos from "./modules/NavigationContactos";
import NavigationOpciones from "./modules/NavigationOpciones";
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
        component={Menu}
        options={{
          title: "Empresas",
          drawerLabel: () => <ItemMenuText text={"Empresas"} />,
          drawerIcon: () => <ItemMenuLogo img={require("../assets/menu/drawer/empresas.png")} />,
        }}
      />
      <Drawer.Screen
        name={routes.DRAWER.EVENTOS}
        component={NavigationEventos}
        options={{
          headerShown: false,
          drawerLabel: () => <ItemMenuText text={"Eventos"} />,
          drawerIcon: () => <ItemMenuLogo img={require("../assets/menu/drawer/eventos.png")} />,
        }}
      />
      <Drawer.Screen
        name={routes.DRAWER.BENEFICIOS}
        component={NavigationBeneficios}
        options={{
          headerShown: false,
          drawerLabel: () => <ItemMenuText text={"Beneficios"} />,
          drawerIcon: () => <ItemMenuLogo img={require("../assets/menu/drawer/beneficios.png")} />,
        }}
      />
      <Drawer.Screen
        name={routes.DRAWER.CURSOS}
        component={NavigationCursos}
        options={{
          headerShown: false,
          drawerLabel: () => <ItemMenuText text={"Cursos"} />,
          drawerIcon: () => <ItemMenuLogo img={require("../assets/menu/drawer/cursos.png")} />,
        }}
      />
      <Drawer.Screen
        name={routes.REDES}
        component={Redes}
        options={{
          title: "Redes sociales",
          drawerLabel: () => <ItemMenuText text={"Redes sociales"} />,
          drawerIcon: () => <ItemMenuLogo img={require("../assets/menu/drawer/redes.png")} />,
        }}
      />
       <Drawer.Screen
        name={routes.DRAWER.CONTACTOS}
        component={NavigationContactos}
        options={{
          headerShown: false,
          drawerLabel: () => <ItemMenuText text={"Contáctanos"} />,
          drawerIcon: () => <ItemMenuLogo img={require("../assets/menu/drawer/contactanos.png")} />,
        }}
      />

       <Drawer.Screen
        name={routes.DRAWER.OPCIONES}
        component={NavigationOpciones}
        options={{
          headerShown: false,
          drawerLabel: () => <ItemMenuText text={"Opciones"} />,
          drawerIcon: () => <ItemMenuLogo img={require("../assets/menu/drawer/opciones.png")} />,
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

const ItemMenuLogo = ({ img }) => {
  return (
    <Image
      source={img}
      resizeMode="contain"
      style={{
        width: 32,
        height: 32,
      }}
    />
  );
};

const ItemMenuText = ({ text }) => {
  return <Text style={{ color: "#314c95", fontSize: 16, marginLeft: -18 }}>{text}</Text>;
};

