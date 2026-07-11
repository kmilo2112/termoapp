//=====================================
// PROPIEDADES DEL GAS IDEAL
//=====================================

const propiedadesGasIdeal = [

    //=================================
    // PRESIÓN
    //=================================

    {

        id: "presion",

        nombre: "Presión",

        descripcion: "Calcula la presión de un gas ideal.",

        ecuacion: "PV=nRT",

        resultado: ["Pa", "kPa", "MPa", "bar", "atm", "mmHg"],

        entradas: [

            {
                id: "volumen",
                nombre: "Volumen",
                unidades: ["m3", "L", "cm3"]
            },

            {
                id: "temperatura",
                nombre: "Temperatura",
                unidades: ["K", "°C"]
            },

            {
                id: "moles",
                nombre: "Cantidad de sustancia",
                unidades: ["mol", "kmol"]
            }

        ]

    },

    //=================================
    // VOLUMEN
    //=================================

    {

        id: "volumen",

        nombre: "Volumen",

        descripcion: "Calcula el volumen de un gas ideal.",

        ecuacion: "PV=nRT",

        resultado: ["m3", "L", "cm3"],

        entradas: [

            {
                id: "presion",
                nombre: "Presión",
                unidades: ["Pa", "kPa", "MPa", "bar", "atm", "mmHg"]
            },

            {
                id: "temperatura",
                nombre: "Temperatura",
                unidades: ["K", "°C"]
            },

            {
                id: "moles",
                nombre: "Cantidad de sustancia",
                unidades: ["mol", "kmol"]
            }

        ]

    },

    //=================================
    // TEMPERATURA
    //=================================

    {

        id: "temperatura",

        nombre: "Temperatura",

        descripcion: "Calcula la temperatura de un gas ideal.",

        ecuacion: "PV=nRT",

        resultado: ["K", "°C"],

        entradas: [

            {
                id: "presion",
                nombre: "Presión",
                unidades: ["Pa", "kPa", "MPa", "bar", "atm", "mmHg"]
            },

            {
                id: "volumen",
                nombre: "Volumen",
                unidades: ["m3", "L", "cm3"]
            },

            {
                id: "moles",
                nombre: "Cantidad de sustancia",
                unidades: ["mol", "kmol"]
            }

        ]

    },

    //=================================
    // MOLES
    //=================================

    {

        id: "moles",

        nombre: "Número de moles",

        descripcion: "Calcula la cantidad de sustancia.",

        ecuacion: "PV=nRT",

        resultado: ["mol", "kmol"],

        entradas: [

            {
                id: "presion",
                nombre: "Presión",
                unidades: ["Pa", "kPa", "MPa", "bar", "atm", "mmHg"]
            },

            {
                id: "volumen",
                nombre: "Volumen",
                unidades: ["m3", "L", "cm3"]
            },

            {
                id: "temperatura",
                nombre: "Temperatura",
                unidades: ["K", "°C"]
            }

        ]

    }

];