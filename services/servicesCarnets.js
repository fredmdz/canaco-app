import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "./servicesFirebase";

const servicesCarnets = {
  getAllByUsuario: async function (idUsuario) {
    let items = [];
    try {
      const collectionRef = collection(db, `mascotasCarnets`);
      const consultUsuario = where("idUsuario", "==", idUsuario);
      const querySnapshot = await getDocs(query(collectionRef, consultUsuario));
      querySnapshot.forEach((doc) => {
        const item = { ...doc.data(), id: doc.id };
        items.push(item);
      });
    } catch (error) {
      console.error(`Error en: servicesCarnets.getAllByUsuario => ${error}`);
      items = null;
    }
    return items;
  },
};

export { servicesCarnets };
