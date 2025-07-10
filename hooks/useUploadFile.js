import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { servicesFirebase, storage } from "../services";

function useUploadFile() {
  /*
   * file: Archivo
   * folder: Nombre de la carpeta
   */
  async function uploadFile(file, folder) {
    const blob = await toBlob(file);
    const nameFile = `${randomID()}-${getNameFile(file)}`;

    const refFile = `${folder}/${nameFile}`;
    const refFirebase = ref(storage, refFile);
    const uploadTask = uploadBytesResumable(refFirebase, blob);

    return new Promise((resolve, reject) => {
      return uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          reject(`Error en: uploadFile => ${error}`);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({ url, refFile });
          console.log(`File disponible en: ${url}`);
        }
      );
    });
  }

  /**
   * refFile: Referencia del archivo
   */
  async function deleteFile(refFile) {
    let response = null;
    try {
      const refFirebase = ref(storage, refFile);
      response = await deleteObject(refFirebase);
      console.log(`File eliminado: ${refFile}`);
    } catch (error) {
      console.error(`Error en: deleteFile => ${error}`);
    }
    return response;
  }

  function randomID() {
    return Date.now().toString(36).slice(-3);
  }

  async function toBlob(file) {
    return fetch(file).then((r) => r.blob());
  }

  function getNameFile(file) {
    return file.substring(file.lastIndexOf("/") + 1);
  }

  return {
    uploadFile,
    deleteFile,
  };
}

export default useUploadFile;
