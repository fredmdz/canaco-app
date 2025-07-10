import { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, Card } from "react-native-paper";

import { Background, View as ViewUi } from "../../components/ui";

export default function VerPregunta({ route }) {
  const { dataPregunta } = route.params;

  const [pregunta, setPregunta] = useState({});

  useEffect(() => {
    if (dataPregunta) {
      setPregunta(dataPregunta);
    }
  }, []);

  return (
    <Background.Image source={require("../../assets/fondos/menu4.png")}>
      <ViewUi.Scroll.Parent>
        <View style={{ gap: 10 }}>
          <Card>
            <Card.Content>
              <Text variant="titleMedium">{pregunta.preg}</Text>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Text variant="bodyMedium">{pregunta.res}</Text>
            </Card.Content>
          </Card>
        </View>
      </ViewUi.Scroll.Parent>
    </Background.Image>
  );
}
