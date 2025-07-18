import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween'; // Importar el plugin isBetween
dayjs.extend(isBetween); // Extender dayjs con el plugin

const helpers = {
  removeAccents: (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  },
  shuffle: (array) => {
    var m = array.length,
      t,
      i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  },

  formatStringWithYear(date) {
    const opc = {
      year: "numeric",
      month: "long",
      day: "2-digit",
    };
    return date.toLocaleDateString(undefined, opc);
  },

  isObjectEmpty(object) {
    return Object.keys(object).length === 0; // Simplificado
  },

  isArrayEmpty(array) {
    return array.length === 0; // Simplificado
  },

  trimObject(object) {
    const newObject = { ...object }; // Crear una copia para evitar mutar el original directamente
    for (const key in newObject) {
      if (typeof newObject[key] === "string") {
        newObject[key] = newObject[key].trim();
      }
    }
    return newObject;
  },

  // === CÓDIGO CORREGIDO PARA isRangeDates ===
  isRangeDates(dateInit, dateEnd) {
    const now = dayjs(); // Fecha y hora actual
    const startOfDayNow = dayjs().startOf('day'); // Inicio del día actual
    const endOfDayNow = dayjs().endOf('day');   // Fin del día actual

    const eventStart = dayjs(dateInit).startOf('day'); // Inicio del día del evento
    const eventEnd = dayjs(dateEnd).endOf('day');   // Fin del día del evento

    // Un evento es "vigente" o "futuro" si:
    // 1. Su rango de fechas (fechaInicio al fechaFin) incluye el día actual, O
    // 2. Su fecha de inicio es después del día actual.
    const isCurrentlyActive = now.isBetween(eventStart, eventEnd, 'day', '[]'); // El evento está activo hoy
    const isFutureEvent = eventStart.isAfter(endOfDayNow); // El evento empieza después de hoy

    return isCurrentlyActive || isFutureEvent;
  },
  // ===========================================

  isRangeDistance(data) {
    // Esta función parece ser para otra cosa (distancia) y está comentada.
    // La dejaremos tal cual, ya que el problema estaba en isRangeDates.
    const isActive = dayjs().isBetween(dayjs(data.fechaInicio.toDate()), dayjs(data.fechaFin.toDate()), "day", "[]");
    return isActive;
  },
};

export { helpers };