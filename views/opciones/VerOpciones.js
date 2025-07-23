import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Alert, ActivityIndicator } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { servicesFirebase, servicesUsers, auth } from "../../services";
import { View as ViewUi } from "../../components/ui";

export default function VerOpciones() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userId = auth?.currentUser?.uid;
      if (!userId) {
        throw new Error("No hay usuario autenticado");
      }

      const data = await servicesFirebase.getOne("usuarios", userId);
      
      if (!data) {
        throw new Error("No se encontraron datos del usuario");
      }

      setUserData(data);
    } catch (err) {
      console.error("Error al cargar datos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar tu sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, cerrar",
          onPress: async () => {
            try {
              await servicesUsers.logout();
            } catch (err) {
              Alert.alert("Error", "No se pudo cerrar la sesión");
            }
          }
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Eliminar cuenta",
      "Esta acción eliminará permanentemente tu cuenta y todos tus datos",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Continuar", onPress: () => confirmAccountDeletion() }
      ]
    );
  };

  const confirmAccountDeletion = () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás completamente seguro? Esta acción no se puede deshacer",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar definitivamente",
          onPress: async () => {
            try {
              setDeleting(true);
              const userId = auth?.currentUser?.uid;
              if (!userId) throw new Error("Usuario no identificado");

              await servicesFirebase.delete("usuarios", userId);
              const user = auth.currentUser;
              await user.delete();

              Alert.alert(
                "Cuenta eliminada", 
                "Tu cuenta ha sido eliminada exitosamente",
                [{ text: "OK", onPress: () => servicesUsers.logout() }]
              );
            } catch (err) {
              console.error("Error al eliminar cuenta:", err);
              Alert.alert("Error", err.message || "No se pudo eliminar la cuenta");
            } finally {
              setDeleting(false);
            }
          }
        }
      ]
    );
  };

  if (loading || deleting) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#314c95" />
        {deleting && <Text style={styles.loadingText}>Eliminando cuenta...</Text>}
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button mode="contained" onPress={fetchUserData} style={styles.retryButton}>
          Reintentar
        </Button>
      </View>
    );
  }

  return (
    <ViewUi.Scroll.Parent style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/login/logo1.png")}
        resizeMode="contain"
      />

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Datos de tu cuenta</Text>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Correo:</Text>
            <Text style={styles.value}>{userData?.correo || "No disponible"}</Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>{userData?.nombre || "No disponible"}</Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.label}>Apellidos:</Text>
            <Text style={styles.value}>{userData?.apellidos || "No disponible"}</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Cerrar sesión</Text>
          <Button
            icon="logout"
            mode="contained"
            buttonColor="#314c95"
            textColor="#fff"
            onPress={handleLogout}
            style={styles.button}
          >
            Cerrar sesión
          </Button>
        </Card.Content>
      </Card>

      <Card style={[styles.card, styles.dangerCard]}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Eliminar cuenta</Text>
          <Button
            icon="delete"
            mode="contained"
            buttonColor="#ff4444"
            textColor="#fff"
            onPress={handleDeleteAccount}
            style={styles.button}
          >
            Eliminar cuenta
          </Button>
        </Card.Content>
      </Card>
    </ViewUi.Scroll.Parent>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f4f7',
    paddingHorizontal: 20,
    paddingBottom: 30
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#f0f4f7'
  },
  loadingText: {
    marginTop: 10,
    color: "#4a6572",
    fontSize: 16
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: '#f0f4f7'
  },
  errorText: {
    color: "#ff4444",
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16
  },
  retryButton: {
    backgroundColor: "#314c95"
  },
  logo: {
    width: "100%",
    height: 110,
    marginBottom: 25,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    paddingHorizontal: 5
  },
  dangerCard: {
    borderColor: "#ff4444",
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#314c95",
    marginBottom: 15,
    textAlign: "center"
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea"
  },
  label: {
    fontWeight: "bold",
    width: 100,
    color: "#34495e",
    fontSize: 15
  },
  value: {
    flex: 1,
    color: "#000000",
    fontSize: 15
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 8
  }
});
