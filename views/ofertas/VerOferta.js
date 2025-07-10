import { useState, useEffect } from "react";
import { Pressable, Linking } from "react-native";
import dayjs from "dayjs";

import { Background, View as ViewUi, List as ListUi } from "../../components/ui";

export default function VerOferta({ route }) {
  const { dataOferta } = route.params;
  const [oferta, setListOfertas] = useState({});

  useEffect(() => {
    if (dataOferta) {
      const itemNew = {
        ...dataOferta,
        chosenDate: dataOferta?.chosenDate ? dataOferta.chosenDate.toDate() : new Date(),
      };
      setListOfertas(itemNew);
    }
  }, []);

 /* console.log(dataOferta); */
  return (
  <Background.Image source={require("../../assets/fondos/menu4.png")}>
      <ListUi.Header image={oferta.images} title={` ${oferta.apellido} `} subtitle={` ${oferta.name} `} />
     <ViewUi.Scroll.Parent>
        <ListUi.Parent>
          <ListUi.Item icon={"shopping"} color={"#B26217"} title={"Promoción"} subtitle={oferta.especialidad} />

          {/* Funcion para abrir Link de la pagina*/}
          <Pressable
            onPress={() =>
              oferta.pag && Linking.openURL(oferta.pag)
            }
          >
         <ListUi.Item icon={"link-variant"} color={"blue"} title={"Más Promociones"} subtitle={oferta.pag} />          
          </Pressable>

          {/* funcion para abrir Maps*/}
          <Pressable
            onPress={() =>
              oferta.direccion && Linking.openURL("https://www.google.es/maps?q=" + oferta.lat + "," + oferta.lng)
            }
          >
        <ListUi.Item icon={"map-marker"} color={"#FF7F37"} title={"Dirección"} subtitle={oferta.direccion}/>          
          </Pressable>
      
            {/* Funcion Para abrir WhatsApp*/}
          <Pressable
            onPress={() =>
              oferta.telefono && Linking.openURL("http://api.whatsapp.com/send?phone=52" + oferta.telefono)
            }
          >
         <ListUi.Item icon={"whatsapp"} color={"green"} title={"Número de WhatsApp"} subtitle={oferta.telefono} /> 
          </Pressable>

          <ListUi.Item icon={"calendar-month"} color={"#B26217"} title={"Vigencia"} subtitle={oferta.celular} />

          <Pressable
            onPress={() =>
              oferta.telefono && Linking.openURL(  `tel:${oferta.telefono}`)
            }
          >             
          <ListUi.Item icon={"phone"} color={"blue"} title={"Número de Teléfono"} subtitle={oferta.telefono} />
          </Pressable>
            
            
        </ListUi.Parent>
      </ViewUi.Scroll.Parent>

  </Background.Image>
  );
}
