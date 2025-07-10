import { useState, useEffect } from "react";
import { Pressable, Linking } from "react-native";
import dayjs from "dayjs";

import { Background, View as ViewUi, List as ListUi } from "../../components/ui";

export default function VerMascota({ route }) {
  const [mascota, setMascota] = useState({});

  //========================= Router
  const { dataMascota } = route.params;

  useEffect(() => {
    function get() {
      const item = {
        ...dataMascota,
        chosenDate: dataMascota?.chosenDate ? dataMascota.chosenDate.toDate() : new Date(),
      };
      setMascota(item);
    }
    dataMascota && get();
  }, []);

  return (
    <Background.Image source={require("../../assets/fondos/menu4.png")}>
      <ListUi.Header image={mascota.image} title={`Nombre: ${mascota.name} `} subtitle={`Raza: ${mascota.raza} `} />
      <ViewUi.Scroll.Parent>
        <ListUi.Parent>
          <ListUi.Item icon={"gender-male-female"} color={"#f43f5e"} title={"Sexo"} subtitle={mascota.sexo} />
          <ListUi.Item icon={"scale-balance"} color={"#3b82f6"} title={"Peso"} subtitle={mascota.peso + " Kg"} />
          <ListUi.Item icon={"paw"} color={"#3b82f6"} title={"Características"} subtitle={mascota.description} />
          <ListUi.Item
            icon={"calendar"}
            color={"#22c55e"}
            title={"Fecha de nacimiento"}
            subtitle={dayjs(mascota.chosenDate).format("D MMMM YYYY")}
          />
          <Pressable
            onPress={() =>
              mascota.celular && Linking.openURL("http://api.whatsapp.com/send?phone=52" + mascota.celular)
            }
          >
            <ListUi.Item icon={"whatsapp"} color={"#22c55e"} title={"Whatsapp"} subtitle={mascota.celular} />
          </Pressable>
        </ListUi.Parent>
      </ViewUi.Scroll.Parent>
    </Background.Image>
  );
}
