import { useState, useEffect } from "react";
import { Pressable, Linking, Text, StyleSheet, Platform } from "react-native";
import dayjs from "dayjs";
import 'dayjs/locale/es';
dayjs.locale('es');

import { View as ViewUi, List as ListUi } from "../../components/ui";

export default function VerCurso({ route }) {
  const { dataCursos } = route.params;

  const [cursoDetalle, setCursoDetalle] = useState({});

  useEffect(() => {
    if (dataCursos) {
      const fechaInicioFormateada = dataCursos.fechaInicio?.toDate ? dayjs(dataCursos.fechaInicio.toDate()).format('DD MMMM YYYY') : 'Fecha no disponible';
      const fechaFinFormateada = dataCursos.fechaFin?.toDate ? dayjs(dataCursos.fechaFin.toDate()).format('DD MMMM YYYY') : 'Fecha no disponible';

      setCursoDetalle({
        ...dataCursos,
        fechaInicioFormateada,
        fechaFinFormateada,
      });
    }
  }, [dataCursos]);

  const handleInscripcion = () => {
    if (cursoDetalle.linkInscripcion) {
      Linking.openURL(cursoDetalle.linkInscripcion).catch(err => console.error("No se pudo abrir el enlace de inscripción:", err));
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
        default: `http://maps.google.com/?q=${encodedAddress}`,
      });
      Linking.openURL(mapUrl).catch(() => alert('No se pudo abrir la aplicación de mapas.'));
    } else {
      alert('No hay ubicación disponible para este curso.');
    }
  };

  const handleWhatsApp = () => {
    const numeroLimpio = cursoDetalle.contacto ? cursoDetalle.contacto.replace(/[^0-9]/g, '') : '';
    const numeroWhatsApp = numeroLimpio.startsWith('52') ? numeroLimpio : `52${numeroLimpio}`;
    if (numeroLimpio) {
      Linking.openURL(`http://api.whatsapp.com/send?phone=${numeroWhatsApp}`).catch(() => alert('No se pudo abrir WhatsApp.'));
    } else {
      alert('No hay un número de contacto de WhatsApp disponible.');
    }
  };

  const handleCall = () => {
    const numeroLimpio = cursoDetalle.contacto ? cursoDetalle.contacto.replace(/[^0-9]/g, '') : '';
    if (numeroLimpio) {
      Linking.openURL(`tel:${numeroLimpio}`).catch(() => alert('No se pudo iniciar la llamada.'));
    } else {
      alert('No hay un número de teléfono disponible para llamar.');
    }
  };

  if (!cursoDetalle || Object.keys(cursoDetalle).length === 0) {
    return (
      <ViewUi.Scroll.Parent style={styles.container}>
        <Text style={styles.loadingText}>Cargando detalles del curso...</Text>
      </ViewUi.Scroll.Parent>
    );
  }

  return (
    <ViewUi.Scroll.Parent style={styles.container}>
      {/* Header con imagen y título */}
      <ListUi.Header 
        image={cursoDetalle.imagen || 'https://via.placeholder.com/350x200?text=Sin+Imagen'} 
        title={cursoDetalle.nombre || 'Curso sin nombre'} 
        titleStyle={styles.titleText} 
      />

      {/* Contenido con estilo tipo evento/contacto */}
      <ListUi.Parent style={styles.listContainer}>
        {cursoDetalle.descripcionCompleta && (
          <ListUi.Item
            icon={"text-box-multiple-outline"}
            color={"#314c95"}
            title={<Text style={styles.sectionTitle}>Descripción del Curso</Text>}
            subtitle={<Text style={styles.subtitleBlack}>{cursoDetalle.descripcionCompleta}</Text>}
          />
        )}

        {cursoDetalle.ponente && (
          <ListUi.Item
            icon={"account-tie"}
            color={"#314c95"}
            title={<Text style={styles.sectionTitle}>Ponente</Text>}
            subtitle={<Text style={styles.subtitleBlack}>{cursoDetalle.ponente}</Text>}
          />
        )}

        {(cursoDetalle.fechaInicioFormateada || cursoDetalle.fechaFinFormateada) && (
          <ListUi.Item
            icon={"calendar-month"}
            color={"#314c95"}
            title={<Text style={styles.sectionTitle}>Fechas</Text>}
            subtitle={
              <Text style={styles.subtitleBlack}>
                Del {cursoDetalle.fechaInicioFormateada} al {cursoDetalle.fechaFinFormateada}
              </Text>
            }
          />
        )}

        {cursoDetalle.horario && (
          <ListUi.Item
            icon={"clock-outline"}
            color={"#314c95"}
            title={<Text style={styles.sectionTitle}>Horario</Text>}
            subtitle={<Text style={styles.subtitleBlack}>{cursoDetalle.horario}</Text>}
          />
        )}

        {cursoDetalle.modalidad && (
          <ListUi.Item
            icon={cursoDetalle.modalidad?.toLowerCase() === 'presencial' ? 'map-marker' : 'laptop'}
            color={"#314c95"}
            title={<Text style={styles.sectionTitle}>Modalidad</Text>}
            subtitle={<Text style={styles.subtitleBlack}>{cursoDetalle.modalidad}</Text>}
          />
        )}

        {cursoDetalle.costo !== undefined && (
          <ListUi.Item
            icon={"currency-usd"}
            color={"#314c95"}
            title={<Text style={styles.sectionTitle}>Costo</Text>}
            subtitle={
              <Text style={styles.subtitleBlack}>
                ${typeof cursoDetalle.costo === 'number' ? cursoDetalle.costo.toFixed(2) : cursoDetalle.costo}
              </Text>
            }
          />
        )}

        {cursoDetalle.linkInscripcion && (
          <Pressable onPress={handleInscripcion}>
            <ListUi.Item
              icon={"link-variant"}
              color={"#314c95"}
              title={<Text style={styles.sectionTitle}>Enlace de Inscripción</Text>}
              subtitle={<Text style={[styles.subtitleBlack, { fontSize: 15 }]}>{cursoDetalle.linkInscripcion}</Text>}
            />
          </Pressable>
        )}

        {cursoDetalle.lugar && cursoDetalle.modalidad?.toLowerCase() === 'presencial' && (
          <Pressable onPress={handleOpenMap}>
            <ListUi.Item
              icon={"map-marker"}
              color={"#314c95"}
              title={<Text style={styles.sectionTitle}>Ubicación</Text>}
              subtitle={<Text style={styles.linkText}>{cursoDetalle.lugar}</Text>}
            />
          </Pressable>
        )}

        {cursoDetalle.contacto && (
          <>
            <Pressable onPress={handleWhatsApp}>
              <ListUi.Item
                icon={"whatsapp"}
                color={"#314c95"} // Icono WhatsApp azul, igual que otros
                title={<Text style={styles.sectionTitle}>Contacto WhatsApp</Text>}
                subtitle={<Text style={styles.linkText}>{cursoDetalle.contacto}</Text>}
              />
            </Pressable>

            <Pressable onPress={handleCall}>
              <ListUi.Item
                icon={"phone"}
                color={"#314c95"}
                title={<Text style={styles.sectionTitle}>Contacto Teléfono</Text>}
                subtitle={<Text style={styles.linkText}>{cursoDetalle.contacto}</Text>}
              />
            </Pressable>
          </>
        )}
      </ListUi.Parent>
    </ViewUi.Scroll.Parent>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f4f7',
    paddingBottom: 30,
  },
  listContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e6ec',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
    marginHorizontal: 25,
    marginTop: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#314c95",
    marginBottom: 10,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#34495e',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#314c95',
  },
  subtitleBlack: {
    fontSize: 17,
    color: 'black',
  },
  linkText: {
    fontSize: 17,
    color: '#314c95',
    textDecorationLine: 'underline',
  },
  loadingText: {
    fontSize: 18,
    color: '#4a6572',
    textAlign: 'center',
    marginTop: 50,
  },
});
