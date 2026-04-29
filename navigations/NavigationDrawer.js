import { Image, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer";
import { Text } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext'; 

// --- Importación de vistas ---
import VerInicio from "../views/inicio/VerInicio";
import VerAfiliacion from "../views/afiliacion/VerAfiliacion";

// --- Stack Navigators (módulos) ---
import NavigationEventos from "./modules/NavigationEventos";
import NavigationCursos from "./modules/NavigationCursos";
import NavigationContactos from "./modules/NavigationContactos";
import NavigationOpciones from "./modules/NavigationOpciones";
import NavigationEmpresas from "./modules/NavigationEmpresas";
import NavigationOfertas from "./modules/NavigationOfertas";
import NavigationRedes from "./modules/NavigationRedes";

// --- Configuración de rutas y opciones ---
import { routes } from "../routes"; 
import { optionsScreen } from "./constants/optionsScreen"; 

const Drawer = createDrawerNavigator();

export default function NavigationDrawer() {
  const { userData, loadingUser } = useContext(UserContext); 

  // Si los datos del usuario aún se están cargando, muestra un indicador
  if (loadingUser) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#314c95" />
        <Text style={styles.loadingText}>Cargando datos de usuario...</Text>
      </View>
    );
  }

  // Determina si el usuario es afiliado Y su membresía no está caducada
  const canAccessAffiliateContent = userData?.isAffiliate && userData?.affiliationStatusDisplay?.status !== 'expired';
  // Determina si el usuario NO es afiliado (para mostrarle la opción de afiliación)
  const isNotAffiliate = !userData?.isAffiliate;


  return (
    <Drawer.Navigator
      initialRouteName={routes.DRAWER.INICIO}
      screenOptions={optionsScreen.OPTIONS_DRAWER}
      drawerContent={(props) => <MenuScroll {...props} />}
    >
      <Drawer.Screen
        name={routes.DRAWER.INICIO}
        component={VerInicio}
        options={{
          title: "CANACO SERVYTUR",
          drawerLabel: () => <ItemMenuText text={"Inicio"} />,
          headerShown: true,
          drawerIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: 'normal',
          },
        }}
      />

      {/* Empresas: Mostrar SOLO si es afiliado Y su membresía NO está caducada */}
      {canAccessAffiliateContent && ( // <-- Lógica corregida aquí
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
      )}

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

      {/* Promociones: Mostrar SOLO si es afiliado Y su membresía NO está caducada */}
      {canAccessAffiliateContent && ( // <-- Lógica corregida aquí
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
      )}

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

      {/* Afiliación: Mostrar SOLO si NO es afiliado */}
      {isNotAffiliate && ( // <-- Lógica corregida aquí
        <Drawer.Screen
          name={routes.DRAWER.AFILIACION}
          component={VerAfiliacion}
          options={({ navigation }) => ({
            title: "Afiliación",
            drawerLabel: () => <ItemMenuText text={"Afiliación"} />,
            drawerIcon: ({ color, size }) => (
              <Icon name="account-group" size={size} color={color} />
            ),
            headerShown: true,
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: 'normal',
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 15 }}
              >
                <Icon
                  name="arrow-left"
                  size={30}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            ),
          })}
        />
      )}

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

const MenuScroll = (props) => {
    const { loadingUser } = useContext(UserContext); // También puedes usar isAffiliate o affiliationStatusDisplay aquí si quisieras personalizar el encabezado del drawer

    if (loadingUser) {
        return (
            <View style={styles.loadingContainerMenu}>
                <ActivityIndicator size="small" color="#314c95" />
                <Text style={styles.loadingTextMenu}>Cargando menú...</Text>
            </View>
        );
    }
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.logoContainer}>
                <Image
                    source={require("../assets/login/logo1.png")}
                    resizeMode="contain"
                    style={styles.logo}
                />
            </View>
            <DrawerItemList {...props} />
            <Text style={styles.footerText}>{"CANACO SERVYTUR"}</Text>
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
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
    paddingTop: 35,
  },
  logo: {
    width: 250,
    height: 140,
  },
  footerText: {
    color: "#314c95",
    fontSize: 14,
    paddingTop: 30,
    paddingBottom: 10,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#314c95',
  },
  loadingContainerMenu: {
      paddingVertical: 20,
      alignItems: 'center',
      justifyContent: 'center',
  },
  loadingTextMenu: {
      marginTop: 10,
      fontSize: 14,
      color: '#666',
  }
});