import { useState, useEffect } from "react";
import { Pressable, Linking, Text, StyleSheet, Platform, View, SafeAreaView } from "react-native";
import dayjs from "dayjs";
import 'dayjs/locale/es'; // Import Spanish locale for dayjs
dayjs.locale('es'); // Set locale to Spanish


import { View as ViewUi, List as ListUi } from "../../components/ui";

export default function VerCurso({ route }) {
  const { dataCursos } = route.params; 

  const [cursoDetalle, setCursoDetalle] = useState({});

  useEffect(() => {
    if (dataCursos) {
      // Format dates for display, if they exist and are Timestamps
      const fechaInicioFormateada = dataCursos.fechaInicio?.toDate ? dayjs(dataCursos.fechaInicio.toDate()).format('DD MMMM YYYY') : 'Fecha no disponible';
      const fechaFinFormateada = dataCursos.fechaFin?.toDate ? dayjs(dataCursos.fechaFin.toDate()).format('DD MMMM YYYY') : 'Fecha no disponible';

      setCursoDetalle({
        ...dataCursos,
        fechaInicioFormateada: fechaInicioFormateada,
        fechaFinFormateada: fechaFinFormateada,
      });
    }
  }, [dataCursos]);

  // Functions to handle link actions
  const handleInscripcion = () => {
    if (cursoDetalle.linkInscripcion) {
      Linking.openURL(cursoDetalle.linkInscripcion)
        .catch(err => console.error("No se pudo abrir el enlace de inscripción:", err));
    } else {
      alert("No hay un enlace de inscripción disponible.");
    }
  };

  const handleOpenMap = () => {
    const address = cursoDetalle.lugar;
    if (address) {
      const encodedAddress = encodeURIComponent(address);
      const mapUrl = Platform.select({
        ios: `maps:0,0?q=${encodedAddress}`,
        android: `geo:0,0?q=${encodedAddress}`,
        default: `http://maps.google.com/?q=${encodedAddress}`, // Fallback for other platforms/simulators
      });

      Linking.openURL(mapUrl)
        .catch(err => {
          console.error('Error al intentar abrir el mapa:', err);
          alert('No se pudo abrir la aplicación de mapas. Asegúrate de tener una instalada.');
        });
    } else {
      alert('No hay ubicación disponible para este curso.');
    }
  };

  // --- NUEVAS FUNCIONES PARA CONTACTO ---
  const handleWhatsApp = () => {
    // Asumiendo que cursoDetalle.contacto es el número.
    // Limpiamos el número por si tiene espacios, guiones o paréntesis.
    const numeroLimpio = cursoDetalle.contacto ? cursoDetalle.contacto.replace(/[^0-9]/g, '') : '';
    // Agrega el prefijo de país si no lo tiene. Para México es 52.
    // Esto es una suposición, si tu admin ya lo incluye, ajusta.
    const numeroWhatsApp = numeroLimpio.startsWith('52') ? numeroLimpio : `52${numeroLimpio}`;

    if (numeroLimpio) {
      Linking.openURL(`http://api.whatsapp.com/send?phone=${numeroWhatsApp}`)
        .catch(err => {
          console.error('Error al intentar abrir WhatsApp:', err);
          alert('No se pudo abrir WhatsApp. Asegúrate de tener la aplicación instalada y un número válido.');
        });
    } else {
      alert('No hay un número de contacto de WhatsApp disponible.');
    }
  };

  const handleCall = () => {
    const numeroLimpio = cursoDetalle.contacto ? cursoDetalle.contacto.replace(/[^0-9]/g, '') : '';
    if (numeroLimpio) {
      Linking.openURL(`tel:${numeroLimpio}`)
        .catch(err => {
          console.error('Error al intentar hacer la llamada:', err);
          alert('No se pudo iniciar la llamada. Asegúrate de tener un número de teléfono válido.');
        });
    } else {
      alert('No hay un número de teléfono disponible para llamar.');
    }
  };
  // --- FIN NUEVAS FUNCIONES ---

  if (!cursoDetalle || Object.keys(cursoDetalle).length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <ViewUi.Scroll.Parent>
          <Text style={styles.loadingText}>Cargando detalles del curso...</Text>
        </ViewUi.Scroll.Parent>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ListUi.Header
        image={cursoDetalle.imagen || 'https://via.placeholder.com/400'} // Fallback if no image
        title={`${cursoDetalle.nombre || 'Curso sin nombre'}`} // Fallback if no name
      />

      <ViewUi.Scroll.Parent>
        <ListUi.Parent>      
          {cursoDetalle.descripcionCompleta && (
            <ListUi.Item
              icon={"text-box-multiple-outline"}
              color={"#B26217"}
              title={"Descripción del Curso"}
              subtitle={<Text style={styles.subtitleText}>{cursoDetalle.descripcionCompleta}</Text>}
            />
          )}

          {cursoDetalle.ponente && (
            <ListUi.Item
              icon={"account-tie"}
              color={"#4285F4"}
              title={"Ponente"}
              subtitle={<Text style={styles.subtitleText}>{cursoDetalle.ponente}</Text>}
            />
          )}

          {(cursoDetalle.fechaInicioFormateada || cursoDetalle.fechaFinFormateada) && (
             <ListUi.Item
               icon={"calendar-month"}
               color={"#FF7F37"}
               title={"Fechas"}
               subtitle={
                 <Text style={styles.subtitleText}>
                    Del {cursoDetalle.fechaInicioFormateada} al {cursoDetalle.fechaFinFormateada}
                 </Text>
               }
             />
           )}

          {cursoDetalle.horario && (
            <ListUi.Item
              icon={"clock-outline"}
              color={"green"}
              title={"Horario"}
              subtitle={<Text style={styles.subtitleText}>{cursoDetalle.horario}</Text>}
            />
          )}

          {cursoDetalle.modalidad && (
            <ListUi.Item
              icon={cursoDetalle.modalidad?.toLowerCase() === 'presencial' ? 'map-marker' : 'laptop'} // Dynamic icon based on modality
              color={"#8E44AD"}
              title={"Modalidad"}
              subtitle={<Text style={styles.subtitleText}>{cursoDetalle.modalidad}</Text>}
            />
          )}

          {/* Cost */}
          {cursoDetalle.costo !== undefined && (
            <ListUi.Item
              icon={"currency-usd"}
              color={"#27AE60"}
              title={"Costo"}
              subtitle={<Text style={styles.subtitleText}>${typeof cursoDetalle.costo === 'number' ? cursoDetalle.costo.toFixed(2) : cursoDetalle.costo}</Text>}
            />
          )}

          {/* Registration Link */}
          {cursoDetalle.linkInscripcion && (
            <Pressable onPress={handleInscripcion}>
              <ListUi.Item
                icon={"link-variant"}
                color={"blue"}
                title={"Enlace de Inscripción"}
                subtitle={<Text style={[styles.subtitleText, styles.linkText]}>{cursoDetalle.linkInscripcion}</Text>}
              />
            </Pressable>
          )}

          {/* Location (if in-person) */}
          {cursoDetalle.lugar && cursoDetalle.modalidad?.toLowerCase() === 'presencial' && (
            <Pressable onPress={handleOpenMap}>
              <ListUi.Item
                icon={"map-marker"}
                color={"#FF7F37"}
                title={"Ubicación"}
                subtitle={<Text style={[styles.subtitleText, styles.linkText]}>{cursoDetalle.lugar}</Text>}
              />
            </Pressable>
          )}

          {cursoDetalle.contacto && ( 
            <View>
              <Pressable onPress={handleWhatsApp}>
                <ListUi.Item
                  icon={"whatsapp"}
                  color={"green"}
                  title={"Contacto WhatsApp"}
                  subtitle={<Text style={[styles.subtitleText, styles.linkText]}>{cursoDetalle.contacto}</Text>}
                />
              </Pressable>
              <Pressable onPress={handleCall}>
                <ListUi.Item
                  icon={"phone"}
                  color={"blue"}
                  title={"Contacto Teléfono"}
                  subtitle={<Text style={[styles.subtitleText, styles.linkText]}>{cursoDetalle.contacto}</Text>}
                />
              </Pressable>
            </View>
          )}

        </ListUi.Parent>
      </ViewUi.Scroll.Parent>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Un color de fondo claro por defecto
  },
  subtitleText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  linkText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 50,
  }
});