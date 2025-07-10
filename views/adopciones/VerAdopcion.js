import { useState, useEffect } from "react";
import { Pressable, Linking } from "react-native";
import dayjs from "dayjs";

import { Background, View as ViewUi, List as ListUi } from "../../components/ui";

export default function VerAdopcion({ route }) {
  const { dataAdopciones } = route.params;

  const [adopciones, setAdopciones] = useState({});

  useEffect(() => {
    if (dataAdopciones) {
      const itemNew = {
        ...dataAdopciones,
        chosenDate: dataAdopciones?.chosenDate ? dataAdopciones.chosenDate.toDate() : new Date(),
      };
      setAdopciones(itemNew);
    }
  }, []);

  return (
    <Background.Image source={require("../../assets/fondos/menu4.png")}>
      <ListUi.Header image={adopciones.images} title={`Hola soy ${adopciones.name} `} />
      <ViewUi.Scroll.Parent>
        <ListUi.Parent>
          <ListUi.Item icon={"paw"} color={"#B26217"} title={"Soy"} subtitle={adopciones.genero} />
          <ListUi.Item
            icon={"map-marker"}
            color={"#FF7F37"}
            title={"Soy de la ciudad de: "}
            subtitle={adopciones.ciudad}
          />
          <Pressable
            onPress={() =>
              adopciones.direccion &&
              Linking.openURL("https://www.google.es/maps?q=" + adopciones.lat + "," + adopciones.lng)
            }
          >
            <ListUi.Item
              icon={"map-marker"}
              color={"#FF7F37"}
              title={"Me puedes encontrar en"}
              subtitle={adopciones.direccion}
            />
          </Pressable>
          <ListUi.Item
            icon={"calendar-month"}
            color={"green"}
            title={"Puedes encontrarme de"}
            subtitle={adopciones.horario}
          />

          <Pressable onPress={() => adopciones.requisitos && Linking.openURL(adopciones.requisitos)}>
            <ListUi.Item
              icon={"file"}
              color={"blue"}
              title={"Requisitos para irme contigo"}
              subtitle={adopciones.requisitos}
            />
          </Pressable>
          <Pressable
            onPress={() =>
              adopciones.telefono && Linking.openURL("http://api.whatsapp.com/send?phone=52" + adopciones.telefono)
            }
          >
            <ListUi.Item icon={"whatsapp"} color={"green"} title={"Pregunta por mi"} subtitle={adopciones.telefono} />
          </Pressable>
          {/* Funcion para abrir numero de telefono*/}
          <Pressable onPress={() => adopciones.telefono && Linking.openURL(`tel:${adopciones.telefono}`)}>
            <ListUi.Item icon={"phone"} color={"blue"} title={"Numero de Teléfono"} subtitle={adopciones.telefono} />
          </Pressable>
        </ListUi.Parent>
      </ViewUi.Scroll.Parent>
    </Background.Image>
  );
}
