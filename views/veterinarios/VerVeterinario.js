import { useState, useEffect } from "react";
import { Pressable, Linking } from "react-native";

import { Background, View as ViewUi, List as ListUi } from "../../components/ui";

export default function VerVeterinario({ route }) {
  const [veterinario, setVeterinarios] = useState({});

  //========================= Router
  const { dataVeterinarios } = route.params;

  useEffect(() => {
    function get() {
      const item = {
        ...dataVeterinarios,
        chosenDate: dataVeterinarios?.chosenDate ? dataVeterinarios.chosenDate.toDate() : new Date(),
      };
      setVeterinarios(item);
    }
    dataVeterinarios && get();
  }, []);


  
  return ( 
  <Background.Image source={require("../../assets/fondos/menu4.png")}>

     <ListUi.Header image={veterinario.images} title={` ${veterinario.name}`} /> 
     <ViewUi.Scroll.Parent>
        <ListUi.Parent>
          <ListUi.Item icon={"hospital-building"} color={"#B26217"} title={"Nombre de la Veterinaria"} subtitle={veterinario.nombrev} />
          <ListUi.Item icon={"paw"} color={"green"} title={"Especialidad"} subtitle={veterinario.especialidad} />
          <ListUi.Item icon={"calendar-month"} color={"orange"} title={"Horario"} subtitle={veterinario.horario} />
          {/* Fucion para abrir maps*/}
          <Pressable
            onPress={() =>
              veterinario.direccion &&
              Linking.openURL("https://www.google.es/maps?q=" + veterinario.lat + "," + veterinario.lng)
            }
          >
            <ListUi.Item icon={"map-marker"} color={"#FF7F37"} title={"Dirección"} subtitle={veterinario.direccion} />
          </Pressable>

          <Pressable
            onPress={() =>
              veterinario.celular && Linking.openURL("http://api.whatsapp.com/send?phone=52" + veterinario.celular)
            }
          >
            <ListUi.Item icon={"whatsapp"} color={"#22c55e"} title={"WhatsApp"} subtitle={veterinario.celular} />
          </Pressable>
          {/* Funcion para abrir numero de telefono*/}
          <Pressable onPress={() => veterinario.telefono && Linking.openURL(`tel:${veterinario.telefono}`)}>
            <ListUi.Item icon={"phone"} color={"blue"} title={"Número de Teléfono"} subtitle={veterinario.telefono} />
          </Pressable>
          {/* Funcion para abrir numero de telefono extra*/}
          <Pressable onPress={() => veterinario.telefonoextra && Linking.openURL(`tel:${veterinario.telefonoextra}`)}>
            <ListUi.Item
              icon={"phone"}
              color={"blue"}
              title={"Número de Teléfono Extra"}
              subtitle={veterinario.telefonoextra}
            />
          </Pressable>

          <ListUi.Item icon={"dog-service"} color={"cyan"} title={"Servicios"} subtitle={veterinario.servicios} />
        </ListUi.Parent>
      </ViewUi.Scroll.Parent>
    </Background.Image>
  );
}
