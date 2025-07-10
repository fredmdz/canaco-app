import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./servicesFirebase";

const servicesUsers = {
  //========================= Iniciar sesión
  login: async function (email, password) {
    let response = null;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        response = user;
      }
    } catch (error) {
      console.error(`Error en: servicesUsers.login => ${error}`);
      response = null;
    }
    return response;
  },

  //========================= Cerrar sesión
  logout: async function () {
    let response = null;
    try {
      await signOut(auth);
      response = true;
      console.log(`Cerrando sesion`);
    } catch (error) {
      console.error(`Error en: servicesUsers.logout => ${error}`);
      response = null;
    }
    return response;
  },

  resetPassword: async function (email) {
    try {
      const response = await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      console.error(`Error en: servicesUsers.resetPassword => ${error}`);
      throw new Error(error);
    }
  },

  //=========================  Crear cuenta en firebase
  create: async function (email, password) {
    let response = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        response = user;
      }
    } catch (error) {
      console.error(`Error en: servicesUsers.create => ${error}`);
      response = null;
    }
    return response;
  },

  //========================= Crear info cuenta base de datos
  createInfo: async function (idUser, usuario) {
    let response = null;
    const { password, ...data } = usuario;
    try {
      const docRef = doc(db, `usuarios/${idUser}`);
      await setDoc(docRef, data);
      if (docRef.id) {
        console.log(`Documento escrito con el id: ${docRef.id} en servicesUsers.createInfo`);
        response = docRef.id;
      }
    } catch (error) {
      console.error(`Error en: servicesUsers.createInfo => ${error}`);
      response = null;
    }
    return response;
  },
};

export { servicesUsers };
