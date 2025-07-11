import { useState, useEffect } from "react";
import { Pressable, Linking, Text } from "react-native";
import dayjs from "dayjs";

import { Background, View as ViewUi, List as ListUi } from "../../components/ui";

export default function VerBeneficio({ route }) {
  const { dataBeneficios } = route.params;

  const [beneficios, setBeneficios] = useState({});

  useEffect(() => {
    if (dataBeneficios) {
      const itemNew = {
        ...dataBeneficios,
        chosenDate: dataBeneficios?.chosenDate ? dataBeneficios.chosenDate.toDate() : new Date(),
      };
      setBeneficios(itemNew);
    }
  }, []);

  return (
    <Background.Image source={require("../../assets/fondos/menu4.png")}>
      <ListUi.Header image={beneficios.images} title={`${beneficios.name}`} />
      <ViewUi.Scroll.Parent>
        <ListUi.Parent>
          <ListUi.Item
            icon={"paw"}
            color={"#B26217"}
            title={"Descripción del evento"}
            subtitle={<Text>{beneficios.especialidad}</Text>}
          />

          <Pressable
            onPress={() =>
              beneficios.direccion && Linking.openURL("https://www.google.es/maps?q=" + beneficios.lat + "," + beneficios.lng)
            }
          >
            <ListUi.Item
              icon={"map-marker"}
              color={"#FF7F37"}
              title={"Dirección "}
              subtitle={<Text>{beneficios.direccion}</Text>}
            />
          </Pressable>

          <ListUi.Item
            icon={"calendar-month"}
            color={"#FF7F37"}
            title={"Fecha"}
            subtitle={<Text>{beneficios.apellido}</Text>}
          />
          <ListUi.Item icon={"clock-outline"} color={"green"} title={"Horario"} subtitle={<Text>{beneficios.hor}</Text>} />
          <Pressable onPress={() => beneficios.web && Linking.openURL(beneficios.web)}>
            <ListUi.Item
              icon={"link-variant"}
              color={"blue"}
              title={"Página Web"}
              subtitle={<Text>{beneficios.web}</Text>}
            />
          </Pressable>

          <Pressable
            onPress={() =>
              beneficios.celular && Linking.openURL("http://api.whatsapp.com/send?phone=52" + beneficios.celular)
            }
          >
            <ListUi.Item
              icon={"whatsapp"}
              color={"green"}
              title={"Número de WhatsApp"}
              subtitle={<Text>{beneficios.celular}</Text>}
            />
          </Pressable>

          <Pressable onPress={() => beneficios.telefono && Linking.openURL(`tel:${beneficios.telefono}`)}>
            <ListUi.Item
              icon={"phone"}
              color={"blue"}
              title={"Numero de Teléfono"}
              subtitle={<Text>{beneficios.telefono}</Text>}
            />
          </Pressable>
        </ListUi.Parent>
      </ViewUi.Scroll.Parent>
    </Background.Image>
  );
}
