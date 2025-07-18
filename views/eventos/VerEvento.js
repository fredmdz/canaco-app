import { useState, useEffect } from "react";
import { Pressable, Linking, Text } from "react-native";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

import { View as ViewUi, List as ListUi } from "../../components/ui";

export default function VerEvento({ route }) {
  const { dataEventos } = route.params;

  const [eventos, setEventos] = useState({});

  useEffect(() => {
    if (dataEventos) {
      const itemNew = {
        ...dataEventos,
        chosenDate: dataEventos.fechaInicio && typeof dataEventos.fechaInicio.toDate === 'function'
                    ? dataEventos.fechaInicio.toDate()
                    : new Date(),
      };
      setEventos(itemNew);
    }
  }, [dataEventos]);

  // Función para abrir la dirección en Google Maps usando el texto
  const openAddressInMaps = () => {
    if (eventos.direccion) {
      // Codifica la dirección para que sea una URL válida
      const encodedAddress = encodeURIComponent(eventos.direccion);
      // Construye la URL de búsqueda de Google Maps
      const mapsUrl = `https://www.google.es/maps/search/?api=1&query=${encodedAddress}`;
      Linking.openURL(mapsUrl).catch(err => console.error('No se pudo abrir Google Maps:', err));
    } else {
      console.log('No hay dirección para abrir en el mapa.');
    }
  };

  return (
    <ViewUi.Scroll.Parent>
      <ListUi.Header image={eventos.images || 'https://via.placeholder.com/200'} title={`${eventos.name || 'Evento sin título'}`} />

      <ListUi.Parent>
        <ListUi.Item
          icon={"information-outline"}
          color={"#B26217"}
          title={"Descripción del evento"}
          subtitle={<Text>{eventos.especialidad || 'Sin descripción.'}</Text>}
        />

        {/* CAMBIO AQUÍ: Llamar a la nueva función openAddressInMaps */}
        <Pressable onPress={openAddressInMaps}>
          <ListUi.Item
            icon={"map-marker"}
            color={"#FF7F37"}
            title={"Dirección "}
            subtitle={<Text>{eventos.direccion || 'Sin dirección.'}</Text>}
          />
        </Pressable>

        <ListUi.Item
          icon={"calendar-month"}
          color={"#FF7F37"}
          title={"Fecha"}
          subtitle={
            <Text>
              {eventos.fechaInicio && typeof eventos.fechaInicio.toDate === 'function'
                ? dayjs(eventos.fechaInicio.toDate()).format('DD/MM/YYYY')
                : 'N/A'}
              {eventos.fechaFin && typeof eventos.fechaFin.toDate === 'function'
                ? ` - ${dayjs(eventos.fechaFin.toDate()).format('DD/MM/YYYY')}`
                : ''}
            </Text>
          }
        />

        <ListUi.Item
          icon={"clock-outline"}
          color={"green"}
          title={"Horario"}
          subtitle={<Text>{eventos.hor || 'Sin horario.'}</Text>}
        />

        {eventos.web && eventos.web.trim() !== '' && (
          <Pressable onPress={() => Linking.openURL(eventos.web)}>
            <ListUi.Item
              icon={"link-variant"}
              color={"blue"}
              title={"Página Web"}
              subtitle={<Text>{eventos.web}</Text>}
            />
          </Pressable>
        )}

        <Pressable
          onPress={() =>
            eventos.celular && Linking.openURL("http://api.whatsapp.com/send?phone=52" + eventos.celular)
          }
        >
          <ListUi.Item
            icon={"whatsapp"}
            color={"green"}
            title={"Número de WhatsApp"}
            subtitle={<Text>{eventos.celular || 'No disponible.'}</Text>}
          />
        </Pressable>

        <Pressable onPress={() => eventos.telefono && Linking.openURL(`tel:${eventos.telefono}`)}>
          <ListUi.Item
            icon={"phone"}
            color={"blue"}
            title={"Número de Teléfono"}
            subtitle={<Text>{eventos.telefono || 'No disponible.'}</Text>}
          />
        </Pressable>
      </ListUi.Parent>
    </ViewUi.Scroll.Parent>
  );
}