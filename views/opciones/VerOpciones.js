import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Alert, ActivityIndicator } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { servicesFirebase, servicesUsers, auth } from "../../services";
import { View as ViewUi, Background } from "../../components/ui";

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
              console.error("Error en logout:", err);
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

              // 1. Eliminar datos de Firestore
              const deleteDataResult = await servicesFirebase.delete("usuarios", userId);
              if (!deleteDataResult) throw new Error("No se pudieron eliminar los datos");

              // 2. Eliminar usuario de Authentication
              const user = auth.currentUser;
              await user.delete();

              // 3. Redirigir después de eliminar
              Alert.alert(
                "Cuenta eliminada", 
                "Tu cuenta ha sido eliminada exitosamente",
                [{ text: "OK", onPress: () => servicesUsers.logout() }]
              );
            } catch (err) {
              console.error("Error al eliminar cuenta:", err);
              Alert.alert(
                "Error", 
                err.message || "No se pudo completar la eliminación de la cuenta"
              );
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
          {deleting && <Text style={{ marginTop: 10 }}>Eliminando cuenta...</Text>}
        </View>
    );
  }

  if (error) {
    return (
      
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button
            mode="contained"
            onPress={fetchUserData}
            style={styles.retryButton}
          >
            Reintentar
          </Button>
        </View>
      
    );
  }

  return (
      <ViewUi.Scroll.Parent>
        <Image
          style={styles.logo}
          source={require("../../assets/login/logo1.png")}
          resizeMode="contain"
        />

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.dataRow}>
              <Text variant="titleMedium" style={styles.label}>Correo:</Text>
              <Text variant="bodyMedium" style={styles.value}>
                {userData?.correo || "No disponible"}
              </Text>
            </View>

            <View style={styles.dataRow}>
              <Text variant="titleMedium" style={styles.label}>Nombre:</Text>
              <Text variant="bodyMedium" style={styles.value}>
                {userData?.nombre || "No disponible"}
              </Text>
            </View>

            <View style={styles.dataRow}>
              <Text variant="titleMedium" style={styles.label}>Apellidos:</Text>
              <Text variant="bodyMedium" style={styles.value}>
                {userData?.apellidos || "No disponible"}
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Cerrar sesión
            </Text>
            <Button
              icon="logout"
              mode="contained"
              onPress={handleLogout}
              style={styles.button}
            >
              Cerrar sesión
            </Button>
          </Card.Content>
        </Card>

        <Card style={[styles.card, styles.dangerCard]}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Eliminar cuenta
            </Text>
            <Button
              icon="delete"
              mode="contained"
              buttonColor="#ff4444"
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

// Tus estilos permanecen igual
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  errorText: {
    color: "red",
    marginBottom: 20,
    textAlign: "center"
  },
  retryButton: {
    marginTop: 10
  },
  logo: {
    width: "100%",
    height: 80,
    marginBottom: 20
  },
  card: {
    marginBottom: 20,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "rgba(255, 255, 255, 0.9)"
  },
  dangerCard: {
    borderColor: "#ff4444",
    borderWidth: 1
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8
  },
  label: {
    fontWeight: "bold",
    width: 100,
    color: "#333"
  },
  value: {
    flex: 1,
    color: "#555"
  },
  sectionTitle: {
    textAlign: "center",
    marginBottom: 12,
    color: "#314c95"
  },
  button: {
    marginTop: 5
  }
});