import { useState } from "react";
import { View, Alert, Image, StyleSheet } from "react-native";
import { Button, Text, ActivityIndicator, useTheme } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import useUploadFile from "../../../hooks/useUploadFile";

export default function FormImage({ hookForm, label, name, formik, folder, ...props }) {
  const [isUploadImage, setIsUploadImage] = useState(false); // si esta subiendo imagen

  //========================= Hook agregar archivo
  const { uploadFile } = useUploadFile();

  //========================= Theme
  const theme = useTheme();

  //========================= Fotos e imagenes
  async function pickImage() {
    const response = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!response.granted) {
      Alert.alert("", "Debes de proporcionar permisos para abrir la gelería");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.canceled) {
      handleImagePicked(result);
    }
  }

  async function takePhoto() {
    let result = await ImagePicker.launchCameraAsync({
      quality: 0.5,
    });
    if (!result.canceled) {
      handleImagePicked(result);
    }
  }

  async function handleImagePicked(result) {
    try {
      setIsUploadImage(true);
      const response = await uploadFile(result.assets[0].uri, folder);
      Alert.alert("", "¡La foto fue agregada con éxito!");
      hookForm.setValue(name, response.url, { shouldValidate: true });
    } catch (e) {
      Alert.alert("", "Hubo un error al subir la foto");
    } finally {
      setIsUploadImage(false);
    }
  }

  return (
    <View>
      <Text variant="labelLarge" style={styles.label}>
        {label}
      </Text>
      <Button
        icon="camera"
        mode="contained-tonal"
        onPress={takePhoto}
        style={{ marginBottom: 5 }}
        buttonColor={hookForm.formState.errors[name] && "#A81C1D"}
        textColor={hookForm.formState.errors[name] && "#fff"}
      >
        Toma una fotografía
      </Button>
      <Button
        icon="view-gallery"
        mode="contained-tonal"
        onPress={pickImage}
        buttonColor={hookForm.formState.errors[name] && "#A81C1D"}
        textColor={hookForm.formState.errors[name] && "#fff"}
      >
        Escoge de la galería
      </Button>
      {hookForm.formState.errors[name] && (
        <Text variant="labelLarge" style={styles.labelError}>
          {hookForm.formState.errors[name].message}
        </Text>
      )}
      {isUploadImage && (
        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <Text variant="labelLarge" style={{ textAlign: "center", marginBottom: 12 }}>
            Cargando imagen
          </Text>
          <ActivityIndicator size={30} />
        </View>
      )}
      <View style={{ alignItems: "center" }}>
        {!isUploadImage && hookForm.watch(name) != null && (
          <Image
            source={{ uri: hookForm.watch(name) }}
            style={{
              height: 350,
              width: "80%",
              resizeMode: "cover",
              borderRadius: theme.roundness * 3,
              marginTop: 20,
            }}
            {...props}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
    marginBottom: 5,
  },
  labelError: {
    textAlign: "center",
    color: "#A81C1D",
    marginTop: 5,
  },
});
