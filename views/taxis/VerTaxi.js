import { useState, useEffect } from "react";
import { Pressable, Linking } from "react-native";
import dayjs from "dayjs";

import { Background, View as ViewUi, List as ListUi } from "../../components/ui";
export default function VerTaxi({ route }) {
  const { dataTaxi } = route.params;
  const [taxi, setTaxis] = useState({});

  useEffect(() => {
    if (dataTaxi) {
      const itemNew = {
        ...dataTaxi,
        chosenDate: dataTaxi?.chosenDate ? dataTaxi.chosenDate.toDate() : new Date(),
      };
      setTaxis(itemNew);
    }
  }, []);

  return (
    <Background.Image source={require("../../assets/fondos/menu4.png")}>
      <ListUi.Header image={taxi.images} title={`${taxi.name} `} />
      <ViewUi.Scroll.Parent>
        <ListUi.Parent>
          <ListUi.Item
            icon={"taxi"}
            color={"#B26217"}
            title={"Características de la Unidad"}
            subtitle={taxi.especialidad}
          />

          {/* funcion para abrir telefono matutino*/}
          <Pressable onPress={() => taxi.celular && Linking.openURL(`tel:${taxi.celular}`)}>
            <ListUi.Item icon={"phone"} color={"blue"} title={"Número de Contacto Matutino"} subtitle={taxi.celular} />
          </Pressable>

          {/* funcion para abrir telefono vespertino*/}
          <Pressable onPress={() => taxi.telefono && Linking.openURL(`tel:${taxi.telefono}`)}>
            <ListUi.Item
              icon={"phone"}
              color={"orange"}
              title={"Número de Contacto Vespertino"}
              subtitle={taxi.telefono}
            />
          </Pressable>

          <ListUi.Item icon={"taxi"} color={"#B26217"} title={"Número Económico"} subtitle={taxi.apellido} />
          <ListUi.Item icon={"taxi"} color={"#B26217"} title={"Número de Placas"} subtitle={taxi.direccion} />

          {/*<Pressable
            onPress={() => taxi.ciudad && Linking.openURL("https://www.google.es/maps?q=" + taxi.lat + "," + taxi.lng)}
  > */}
          <ListUi.Item icon={"map-marker"} color={"#FF7F37"} title={"Ciudad"} subtitle={taxi.ciudad} />
         {/* </Pressable> */}
        </ListUi.Parent>
      </ViewUi.Scroll.Parent>
    </Background.Image>
  );
}
