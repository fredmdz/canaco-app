import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

function VerFormulario({ route }) {
  const { tipo } = route.params;

  return (
    <View style={{ flex: 1 }}>
      {tipo == "pregunta" && <WebView source={{ uri: `https://mashuezus.com/apppreguntas/preguntas` }} />}
      {tipo == "veterinario" && <WebView source={{ uri: `https://mashuezus.com/apppreguntas/veterinarios` }} />}
      {tipo == "taxi" && <WebView source={{ uri: `https://mashuezus.com/apppreguntas/taxis` }} />}
    </View>
  );
}
export default VerFormulario;
