import { Image, View } from "react-native";
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer";
import { Text } from "react-native-paper";

import Menu from "../views/menu/Menu";
import Redes from "../views/redes/VerRedes";
import NavigationMisMascotas from "./modules/NavigationMisMascotas";
import NavigationClubRazas from "./modules/NavigationClubRazas";
import NavigationCarnets from "./modules/NavigationCarnets";
import NavigationVeterinarios from "./modules/NavigationVeterinarios";
import NavigationEventos from "./modules/NavigationEventos";
import NavigationContactos from "./modules/NavigationContactos";
import NavigationPreguntas from "./modules/NavigationPreguntas";
import NavigationAdopciones from "./modules/NavigationAdopciones";
import NavigationTaxis from "./modules/NavigationTaxis";
import NavigationOfertas from "./modules/NavigationOfertas";
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
          title: "Mashuezus",
          drawerLabel: () => <ItemMenuText text={"Inicio"} />,
          drawerIcon: () => <ItemMenuLogo img={require("../assets/menu/drawer/inicio.png")} />,
        }}
      />
      <Drawer.Screen
        name={routes.DRAWER.MIS_MASCOTAS}
        component={NavigationMisMascotas}
        options={{
          headerShown: false,
          drawerLabel: () => <ItemMenuText text={"Mis mascotas"} />,
          drawerIcon: () => <ItemMenuLogo img={require("../assets/menu/drawer/mascota.png")} />,
        }}
      />
      <Drawer.Screen
        name={routes.DRAWER.CLUB_RAZAS}
        component={NavigationClubRazas}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          drawerLabel: () => <ItemMenuText text={"Club de razas"} />,
          drawerIcon: () => <ItemMenuLogo img={require("../assets/menu/drawer/club.png")} />,
        }}
      />
      <Drawer.Screen
        name={routes.DRAWER.CARNETS}
        component={NavigationCarnets}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          drawerLabel: () => <ItemMenuText text={"Carnets"} />,
          drawerIcon: () => <ItemMenuLogo img={require("../assets/menu/drawer/carnet.png")} />,
        }}
      />
      <Drawer.Screen
        name={routes.DRAWER.VETERINARIOS}
        component={NavigationVeterinarios}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          drawerLabel: () => <ItemMenuText text={"Veterinarios"} />,
          drawerIcon: () => <ItemMenuLogo img={require("../assets/menu/drawer/veterinarios.png")} />,
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
        name={routes.DRAWER.CONTACTOS}
        component={NavigationContactos}
        options={{
          headerShown: false,
          drawerLabel: () => <ItemMenuText text={"Contactanos"} />,
          drawerIcon: () => <ItemMenuLogo img={require("../assets/menu/drawer/contactanos.png")} />,
        }}
      />
      <Drawer.Screen
        name={routes.DRAWER.PREGUNTAS}
        component={NavigationPreguntas}
        options={{
          headerShown: false,
          drawerLabel: () => <ItemMenuText text={"Preguntas"} />,
          drawerIcon: () => <ItemMenuLogo img={require("../assets/menu/drawer/preguntas.png")} />,
        }}
      />
      <Drawer.Screen
        name={routes.DRAWER.ADOPCIONES}
        component={NavigationAdopciones}
        options={{
          headerShown: false,
          drawerLabel: () => <ItemMenuText text={"Adopciones"} />,
          drawerIcon: () => <ItemMenuLogo img={require("../assets/menu/drawer/adopciones.png")} />,
        }}
      />
      <Drawer.Screen
        name={routes.DRAWER.TAXIS}
        component={NavigationTaxis}
        options={{
          headerShown: false,
          drawerLabel: () => <ItemMenuText text={"Transporte"} />,
          drawerIcon: () => <ItemMenuLogo img={require("../assets/menu/drawer/taxi.png")} />,
        }}
      />
      <Drawer.Screen
        name={routes.DRAWER.OFERTAS}
        component={NavigationOfertas}
        options={{
          headerShown: false,
          drawerLabel: () => <ItemMenuText text={"Ofertas"} />,
          drawerIcon: () => <ItemMenuLogo img={require("../assets/menu/drawer/ofertas.png")} />,
        }}
      />
      <Drawer.Screen
        name={routes.REDES}
        component={Redes}
        options={{
          title: "Redes sociales",
          drawerLabel: () => <ItemMenuText text={"Redes sociales"} />,
          drawerIcon: () => <ItemMenuLogo img={require("../assets/menu/drawer/face.png")} />,
        }}
      />
      <Drawer.Screen
        name={routes.DRAWER.OPCIONES}
        component={NavigationOpciones}
        options={{
          headerShown: false,
          drawerLabel: () => <ItemMenuText text={"Opciones de la app"} />,
          drawerIcon: () => <ItemMenuLogo img={require("../assets/menu/drawer/opciones.png")} />,
        }}
      />
    </Drawer.Navigator>
  );
}

const MenuScroll = ({ ...props }) => {
  return (
    <DrawerContentScrollView props>
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
          source={require("../assets/menu/drawer/logo.png")}
          resizeMode="contain"
          style={{
            width: 120,
            height: 120,
          }}
        />
      </View>
      <DrawerItemList {...props} />
      <Text style={{ color: "#fff", fontSize: 14, paddingTop: 30, paddingBottom: 10, textAlign: "center" }}>
        {"Mashuezus"}
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
  return <Text style={{ color: "#fff", fontSize: 16, marginLeft: -18 }}>{text}</Text>;
};
