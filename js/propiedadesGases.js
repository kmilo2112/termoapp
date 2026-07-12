//=====================================
// PROPIEDADES DE GASES
//=====================================
//
// Todas las propiedades están expresadas
// en unidades del Sistema Internacional.
//
// Masa molar -> kg/kmol
// R           -> J/(kg·K)
// Cp          -> J/(kg·K)
// Cv          -> J/(kg·K)
// γ           -> Cp/Cv
//
//=====================================

const GASES = {

    //=================================
    // AIRE
    //=================================

    aire: {

        nombre: "Aire",

        formula: "Air",

        masaMolar: 28.97,

        R: 287.05,

        Cp: 1005,

        Cv: 718,

        gamma: 1.40

    },

    //=================================
    // NITRÓGENO
    //=================================

    nitrogeno: {

        nombre: "Nitrógeno",

        formula: "N₂",

        masaMolar: 28.0134,

        R: 296.80,

        Cp: 1040,

        Cv: 743,

        gamma: 1.399

    },

    //=================================
    // DIÓXIDO DE CARBONO
    //=================================

    co2: {

        nombre: "Dióxido de carbono",

        formula: "CO₂",

        masaMolar: 44.01,

        R: 188.92,

        Cp: 844,

        Cv: 655,

        gamma: 1.288

    },

    //=================================
    // VAPOR DE AGUA
    //=================================

    vaporAgua: {

        nombre: "Vapor de agua",

        formula: "H₂O",

        masaMolar: 18.015,

        R: 461.52,

        Cp: 1996,

        Cv: 1535,

        gamma: 1.30

    },

    //=================================
    // PERSONALIZADO
    //=================================

    personalizado: {

        nombre: "Personalizado",

        formula: "-",

        masaMolar: null,

        R: null,

        Cp: null,

        Cv: null,

        gamma: null

    }

};

//=====================================
// OBTENER PROPIEDADES DE UN GAS
//=====================================

function obtenerGas(nombre) {

    return GASES[nombre];

}

//=====================================
// OBTENER LISTA DE GASES
//=====================================

function listaGases() {

    return Object.keys(GASES);

}