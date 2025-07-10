import { useState, useEffect } from "react";
import { Pressable, Linking, Text } from "react-native";
import dayjs from "dayjs";

import { Background, View as ViewUi, List as ListUi } from "../../components/ui";

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
  }, []);

  return (
    <Background.Image source={require("../../assets/fondos/menu4.png")}>
      <ListUi.Header image={eventos.images} title={`${eventos.name}`} />
      <ViewUi.Scroll.Parent>
        <ListUi.Parent>
          <ListUi.Item
            icon={"paw"}
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
              title={"Dirección "}
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
              title={"Numero de Teléfono"}
              subtitle={<Text>{eventos.telefono}</Text>}
            />
          </Pressable>
        </ListUi.Parent>
      </ViewUi.Scroll.Parent>
    </Background.Image>
  );
}
