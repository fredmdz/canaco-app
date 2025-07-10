import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "./servicesFirebase";

const servicesMascotas = {
  getAllByUsuario: async function (idUsuario) {
    let items = [];
    try {
      const collectionRef = collection(db, `mascotas`);
      const consultUsuario = where("idUsuario", "==", idUsuario);
      const querySnapshot = await getDocs(query(collectionRef, consultUsuario));
      querySnapshot.forEach((doc) => {
        const item = { ...doc.data(), id: doc.id };
        items.push(item);
      });
    } catch (error) {
      console.error(`Error en: servicesMascotas.getAllByUsuario => ${error}`);
      items = null;
    }
    return items;
  },

  getAllCarnetsByMascota: async function (idMascota) {
    let items = [];
    try {
      const collectionRef = collection(db, `carnets`);
      const consultMascota = where("idMascota", "==", idMascota);
      const querySnapshot = await getDocs(query(collectionRef, consultMascota));
      querySnapshot.forEach((doc) => {
        const item = { ...doc.data(), id: doc.id };
        items.push(item);
      });
    } catch (error) {
      console.error(`Error en: servicesMascotas.getAllByUsuario => ${error}`);
      items = null;
    }
    return items;
  },
};

export { servicesMascotas };
