import { useState, useEffect } from "react";
import useEdit from "../../hooks/useEdit";
import AgregarMascotaForm from "./components/AgregarMascotaForm";

export default function AgregarMascota({ navigation, route }) {
  const [mascota, setMascota] = useState({});
  const [loaded, setLoaded] = useState(false);

  //========================= Router
  const { dataMascota } = route.params;

  //========================= Hook edit
  const { isEdit } = useEdit(dataMascota);

  useEffect(() => {
    function get() {
      const item = {
        ...dataMascota,
        chosenDate: dataMascota.chosenDate ? dataMascota.chosenDate.toDate() : new Date(),
      };
      setMascota(item);
      setLoaded(true);
    }

    isEdit && get();
  }, []);

  return isEdit && !loaded ? null : (
    <AgregarMascotaForm navigation={navigation} isEdit={isEdit} data={isEdit ? mascota : {}} />
  );
}
