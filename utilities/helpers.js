import dayjs from "dayjs";

const helpers = {
  removeAccents: (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  },
  shuffle: (array) => {
    var m = array.length,
      t,
      i;

    // While there remain elements to shuffle...
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
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
    if (Object.keys(object).length === 0) {
      return true;
    } else {
      return false;
    }
  },

  isArrayEmpty(array) {
    if (array.length == 0) {
      return true;
    } else {
      return false;
    }
  },

  trimObject(object) {
    const newObject = object;
    for (const key in newObject) {
      if (typeof newObject[key] === "string") {
        newObject[key] = newObject[key].trim();
      }
    }
    return newObject;
  },

  isRangeDates(dateInit, dateEnd) {
    return dayjs().isBetween(dayjs(dateInit), dayjs(dateEnd), "day", "[]");
  },

  isRangeDistance(data) {
    const isActive = dayjs().isBetween(dayjs(data.fechaInicio.toDate()), dayjs(data.fechaFin.toDate()), "day", "[]");

    // if (isActive) {
    //   const thresholds = [
    //     //{ maxDistance: 20 },
    //     //{ maxDistance: 100 },
    //     { minDistance: 100, maxDistance: 120 },
    //   ];
    //   for (const threshold of thresholds) {
    //     if (km >= threshold.minDistance && km <= threshold.maxDistance) {
    //       // console.log("Esta es la fecha inicio: ", fechaInicio);
    //       // console.log("Esta es la fecha final: ", fechaFin);
    //       // console.log("Esta es la fecha actual: ", dayjs());
    //       return true;
    //     }
    //   }
    // }
    return isActive;
  },
};

export { helpers };
