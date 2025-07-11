import { useState, useEffect } from "react";
import { Pressable, Linking, Text } from "react-native";
import dayjs from "dayjs";

import { Background, View as ViewUi, List as ListUi } from "../../components/ui";

export default function VerCurso({ route }) {
  const { dataCursos } = route.params;

  const [cursos, setCursos] = useState({});

  useEffect(() => {
    if (dataCursos) {
      const itemNew = {
        ...dataCursos,
        chosenDate: dataCursos?.chosenDate ? dataCursos.chosenDate.toDate() : new Date(),
      };
      setCursos(itemNew);
    }
  }, []);

  return (
    <Background.Image source={require("../../assets/fondos/menu4.png")}>
      <ListUi.Header image={cursos.images} title={`${cursos.name}`} />
      <ViewUi.Scroll.Parent>
        <ListUi.Parent>
          <ListUi.Item
            icon={"paw"}
            color={"#B26217"}
            title={"Descripción del evento"}
            subtitle={<Text>{cursos.especialidad}</Text>}
          />

          <Pressable
            onPress={() =>
              cursos.direccion && Linking.openURL("https://www.google.es/maps?q=" + cursos.lat + "," + cursos.lng)
            }
          >
            <ListUi.Item
              icon={"map-marker"}
              color={"#FF7F37"}
              title={"Dirección "}
              subtitle={<Text>{cursos.direccion}</Text>}
            />
          </Pressable>

          <ListUi.Item
            icon={"calendar-month"}
            color={"#FF7F37"}
            title={"Fecha"}
            subtitle={<Text>{cursos.apellido}</Text>}
          />
          <ListUi.Item icon={"clock-outline"} color={"green"} title={"Horario"} subtitle={<Text>{cursos.hor}</Text>} />
          <Pressable onPress={() => cursos.web && Linking.openURL(cursos.web)}>
            <ListUi.Item
              icon={"link-variant"}
              color={"blue"}
              title={"Página Web"}
              subtitle={<Text>{cursos.web}</Text>}
            />
          </Pressable>

          <Pressable
            onPress={() =>
              cursos.celular && Linking.openURL("http://api.whatsapp.com/send?phone=52" + cursos.celular)
            }
          >
            <ListUi.Item
              icon={"whatsapp"}
              color={"green"}
              title={"Número de WhatsApp"}
              subtitle={<Text>{cursos.celular}</Text>}
            />
          </Pressable>

          <Pressable onPress={() => cursos.telefono && Linking.openURL(`tel:${cursos.telefono}`)}>
            <ListUi.Item
              icon={"phone"}
              color={"blue"}
              title={"Numero de Teléfono"}
              subtitle={<Text>{cursos.telefono}</Text>}
            />
          </Pressable>
        </ListUi.Parent>
      </ViewUi.Scroll.Parent>
    </Background.Image>
  );
}
