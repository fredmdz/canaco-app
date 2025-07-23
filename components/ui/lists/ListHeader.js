import { useState } from "react";
import { StyleSheet, Image, View, Pressable, Modal, TouchableOpacity, Platform } from "react-native";
import { Text } from "react-native-paper";
import ImageViewer from "react-native-image-zoom-viewer";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function ListHeader({ image, title, subtitle, titleStyle, subtitleStyle }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.header}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {subtitle ? <Text style={[styles.subTitle, subtitleStyle]}>{subtitle}</Text> : null}
      <Pressable onPress={() => setModalVisible(true)}>
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      </Pressable>

      {/* Modal para mostrar la imagen de manera más detallada */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <TouchableOpacity style={styles.backButton} onPress={() => setModalVisible(false)}>
            <Icon name="close" size={24} color="white" />
          </TouchableOpacity>
          <ImageViewer
            imageUrls={[{ url: image }]}
            onCancel={() => setModalVisible(false)} // cierra el modal cuando se cancela
            renderIndicator={() => null} // oculta el indicador de carga
            enableSwipeDown={true}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { marginHorizontal: 10, marginTop: 20, marginBottom: 10, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#444" },
  subTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10, color: "#666" },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 40 : 30,
    left: 15,
    zIndex: 1,
    padding: 8,
  },
  modal: {
    flex: 1,
    backgroundColor: "black",
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 10,
    resizeMode: "cover",
  },
});
