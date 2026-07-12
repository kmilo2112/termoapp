console.log("formato.js cargado");

//====================================================
// FORMATO DE NÚMEROS
//====================================================
//
// Todas las cantidades numéricas del programa
// se mostrarán con 2 cifras decimales.
//
//====================================================

function formatoNumero(valor) {

    //------------------------------------------
    // Validación
    //------------------------------------------

    if (

        valor === undefined ||

        valor === null ||

        isNaN(valor)

    ) {

        return "-";

    }

    //------------------------------------------
    // Formato
    //------------------------------------------

    return Number(valor).toFixed(2);

}