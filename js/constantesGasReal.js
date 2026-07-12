console.log("constantesGasReal.js cargado");

//====================================================
// CONSTANTES PARA GASES REALES
//====================================================
//
// Sistema Internacional (SI)
//
// Presión      -> Pa
// Volumen      -> m³
// Temperatura  -> K
// Cantidad     -> mol
//
// Van der Waals
// a  -> Pa·m⁶/mol²
// b  -> m³/mol
//
// Propiedades críticas
// Tc -> K
// Pc -> Pa
// Zc -> Adimensional
//
// NOTA:
// El coeficiente Virial B NO se almacena aquí,
// porque depende de la temperatura.
// El usuario lo ingresará directamente.
//
//====================================================

const GASES_REALES = {

    //------------------------------------------------
    // AIRE
    //------------------------------------------------

    aire: {

        nombre: "Aire",

        // Van der Waals
        a: 0.137,
        b: 3.64e-5,

        // Propiedades críticas
        Tc: 132.5,
        Pc: 3.77e6,
        Zc: 0.289

    },

    //------------------------------------------------
    // CO₂
    //------------------------------------------------

    co2: {

        nombre: "CO₂",

        // Van der Waals
        a: 0.364,
        b: 4.27e-5,

        // Propiedades críticas
        Tc: 304.2,
        Pc: 7.38e6,
        Zc: 0.274

    },

    //------------------------------------------------
    // VAPOR DE AGUA
    //------------------------------------------------

    vaporAgua: {

        nombre: "Vapor de agua",

        // Van der Waals
        a: 0.553,
        b: 3.04e-5,

        // Propiedades críticas
        Tc: 647.1,
        Pc: 22.064e6,
        Zc: 0.229

    }

};
