const routes = {
  MENU: "menu", // This route name is typically used for your initial screen (e.g., NavigationEmpresas)

  START: {
    INDEX: "start",
    LOGIN: "login",
    REGISTER: "register",
    FORGOT_PASSWORD: "forgotPassword",
  },

  DRAWER: {
    OPCIONES: "drawerOpciones",
    EVENTOS: "drawerEventos",
    // BENEFICIOS: "drawerBeneficios", // <-- REMOVED this line as per your request
    CURSOS: "drawerCursos",
    CONTACTOS: "drawerContactos",
    PREGUNTAS: "drawerPreguntas",
    OFERTAS: "drawerOfertas", // <-- TYPO CORRECTED: "dreawerOfertas" to "drawerOfertas"
    REDES: "drawerRedes", // <-- ADDED: The name for the Redes Social drawer item
  },

  EVENTOS: {
    LISTA_EVENTOS: "listaEventos",
    VER_EVENTO: "verEvento",
  },

  // Removed the duplicate 'OFERTAS' object that had only two properties.
  // The complete 'OFERTAS' object is kept below.

  CURSOS: {
    LISTA_CURSOS: "listaCursos",
    VER_CURSO: "verCurso",
  },

  CONTACTOS: {
    LISTA_CONTACTOS: "listaContactos",
    VER_CONTACTO: "verContacto",
    VER_FORMULARIO: "verFormulario",
  },

  // --- Complete OFERTAS object ---
  OFERTAS: {
    LISTA_OFERTAS: "listaOfertas",
    VER_OFERTA: "verOferta",
  },

  // --- REDES Sociales (Internal Stack Navigator Routes) ---
  REDES: { // This object defines the screens *inside* your NavigationRedes Stack
    VER_REDES: "verRedes", // This is the actual screen name for your VerRedes.js component
  },

  OPCIONES: {
    VER_OPCIONES: "verOpciones",
  },
};

export { routes };