import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { collection, addDoc, getDocs, doc, updateDoc, getDoc, deleteDoc, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvrmocWYpxvNmEZqYfkfeYZJMCCxXkXwM",
  authDomain: "canaco-81fd8.firebaseapp.com",
  projectId: "canaco-81fd8",
  storageBucket: "canaco-81fd8.firebasestorage.app",
  messagingSenderId: "768157776458",
  appId: "1:768157776458:web:eeaf9839397be40d5584b3",
  measurementId: "G-WVTD1XJ8YZ"
};

//=========================  Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

const servicesFirebase = {
  //========================= Generales
  getAll: async function (collectionName) {
    let items = [];
    try {
      const collectionRef = collection(db, collectionName);
      const querySnapshot = await getDocs(collectionRef);
      querySnapshot.forEach((doc) => {
        const item = { ...doc.data(), id: doc.id };
        items.push(item);
      });
    } catch (error) {
      console.error(`Error en: servicesFirebase.getAll.${collectionName} => ${error}`);
      items = null;
    }
    return items;
  },

  getOne: async function (collectionName, id) {
    let item = null;
    try {
      const docRef = doc(db, `${collectionName}/${id}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.data()) {
        item = { ...docSnap.data(), id: docRef.id };
      }
    } catch (error) {
      console.error(`Error en: servicesFirebase.getOne.${collectionName} => ${error}`);
      item = null;
    }
    return item;
  },

  create: async function (collectionName, data) {
    let response = null;
    try {
      const collectionRef = collection(db, collectionName);
      const docRef = await addDoc(collectionRef, data);
      if (docRef.id) {
        console.log(`Documento escrito con el id: ${docRef.id} en servicesFirebase.create.${collectionName}`);
        response = docRef.id;
      }
    } catch (error) {
      console.error(`Error en: servicesFirebase.create.${collectionName} => ${error}`);
      response = null;
    }
    return response;
  },

  edit: async function (collectionName, id, data) {
    let response = null;
    try {
      const docRef = doc(db, `${collectionName}/${id}`);
      await updateDoc(docRef, data);
      if (docRef.id) {
        console.log(`Documento editado con el id: ${docRef.id} en servicesFirebase.edit.${collectionName}`);
        response = docRef.id;
      }
    } catch (error) {
      console.error(`Error en: servicesFirebase.edit.${collectionName} => ${error}`);
      response = null;
    }
    return response;
  },

  delete: async function (collectionName, id) {
    let response = null;
    try {
      const docRef = doc(db, `${collectionName}/${id}`);
      await deleteDoc(docRef);
      if (docRef.id) {
        console.log(`Documento eliminado con el id: ${docRef.id} en servicesFirebase.delete.${collectionName}`);
        response = docRef.id;
      }
    } catch (error) {
      console.error(`Error en: servicesFirebase.delete.${collectionName} => ${error}`);
      response = null;
    }
    return response;
  },
};

export { servicesFirebase, app, auth, db, storage };
