import { useEffect, useState } from "react";
import { Image, View, Text } from "react-native";
import { Background, View as ViewUi, List as ListUi } from "../../components/ui";

function VerContacto({ route }) {
  const { dataContacto } = route.params;

  const [contacto, setContacto] = useState({});

  useEffect(() => {
    if (dataContacto) {
      setContacto(dataContacto);
    }
  }, [dataContacto]);

  return (
      <ViewUi.Scroll.Parent>

        {/* Header personalizado con logo y título */}
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#314c95", marginBottom: 5 }}>
            {contacto.nombre || "Contacto"}
          </Text>
          <Image
            source={require("../../assets/login/logo1.png")}
            style={{ width: 350, height: 200, resizeMode: "contain" }}
          />
        </View>

        <ViewUi.Child>
          <ListUi.Parent>
            <ListUi.Item icon={"phone"} color={"blue"} title={"Teléfono"} subtitle={contacto.telefono || "-"} />
            <ListUi.Item icon={"email"} color={"green"} title={"Correo"} subtitle={contacto.correo || "-"} />
            <ListUi.Item icon={"map-marker"} color={"orange"} title={"Dirección"} subtitle={contacto.direccion || "-"} />
          </ListUi.Parent>
        </ViewUi.Child>

      </ViewUi.Scroll.Parent>
  );
}

export default VerContacto;
