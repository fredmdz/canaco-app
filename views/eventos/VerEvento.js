import { useState, useEffect } from "react";
import { Pressable, Linking, Text, Image, View } from "react-native";

import { View as ViewUi, List as ListUi } from "../../components/ui";

export default function VerEvento({ route }) {
  const { dataEventos } = route.params;

  const [eventos, setEventos] = useState({});

  useEffect(() => {
    if (dataEventos) {
      const itemNew = {
        ...dataEventos,
        chosenDate: dataEventos?.chosenDate ? dataEventos.chosenDate.toDate() : new Date(),
      };
      setEventos(itemNew);
    }
  }, [dataEventos]);

  return (
    <ViewUi.Scroll.Parent>
      {/* Título grande y centrado */}
      <View style={{ alignItems: "center", marginTop: 20, marginBottom: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#314c95", marginBottom: 5 }}>
          {eventos.name || "Evento"}
        </Text>
        <Image
          source={require("../../assets/login/logo1.png")}
          style={{ width: 350, height: 200, resizeMode: "contain" }}
        />
      </View>

      <ListUi.Parent>
        <ListUi.Item
          icon={"information-outline"}
          color={"#B26217"}
          title={"Descripción del evento"}
          subtitle={<Text>{eventos.especialidad}</Text>}
        />

        <Pressable
          onPress={() =>
            eventos.direccion && Linking.openURL("https://www.google.es/maps?q=" + eventos.lat + "," + eventos.lng)
          }
        >
          <ListUi.Item
            icon={"map-marker"}
            color={"#FF7F37"}
            title={"Dirección"}
            subtitle={<Text>{eventos.direccion}</Text>}
          />
        </Pressable>

        <ListUi.Item
          icon={"calendar-month"}
          color={"#FF7F37"}
          title={"Fecha"}
          subtitle={<Text>{eventos.apellido}</Text>}
        />
        <ListUi.Item icon={"clock-outline"} color={"green"} title={"Horario"} subtitle={<Text>{eventos.hor}</Text>} />

        <Pressable onPress={() => eventos.web && Linking.openURL(eventos.web)}>
          <ListUi.Item
            icon={"link-variant"}
            color={"blue"}
            title={"Página Web"}
            subtitle={<Text>{eventos.web}</Text>}
          />
        </Pressable>

        <Pressable
          onPress={() =>
            eventos.celular && Linking.openURL("http://api.whatsapp.com/send?phone=52" + eventos.celular)
          }
        >
          <ListUi.Item
            icon={"whatsapp"}
            color={"green"}
            title={"Número de WhatsApp"}
            subtitle={<Text>{eventos.celular}</Text>}
          />
        </Pressable>

        <Pressable onPress={() => eventos.telefono && Linking.openURL(`tel:${eventos.telefono}`)}>
          <ListUi.Item
            icon={"phone"}
            color={"blue"}
            title={"Número de Teléfono"}
            subtitle={<Text>{eventos.telefono}</Text>}
          />
        </Pressable>
      </ListUi.Parent>
    </ViewUi.Scroll.Parent>
  );
}
