import { useState, useEffect } from "react";
import useEdit from "../../hooks/useEdit";
import AgregarCarnetForm from "./components/AgregarCarnetForm";

export default function AgregarCarnet({ navigation, route }) {
  const [carnet, setCarnet] = useState({});
  const [loaded, setLoaded] = useState(false);

  //========================= Router
  const { dataCarnet, dataMascota, idMascota } = route.params;

  //========================= Hook edit
  const { isEdit } = useEdit(dataCarnet);

  useEffect(() => {
    function get() {
      const item = {
        ...dataCarnet,
        fechaCita: dataCarnet.fechaCita ? dataCarnet.fechaCita.toDate() : new Date(),
        fechaProxCita: dataCarnet.fechaProxCita ? dataCarnet.fechaProxCita.toDate() : new Date(),
      };
      setCarnet(item);
      setLoaded(true);
    }

    isEdit && get();
  }, []);

  return isEdit && !loaded ? null : (
    <AgregarCarnetForm
      navigation={navigation}
      isEdit={isEdit}
      idMascota={idMascota}
      dataMascota={dataMascota}
      data={isEdit ? carnet : {}}
    />
  );
}
