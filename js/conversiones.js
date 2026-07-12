//=====================================
// CONVERSIONES DE PRESIÓN
// TODAS LAS CONVERSIONES INTERNAS SERÁN A Pa
//=====================================

function presionAPa(valor, unidad) {

    switch (unidad) {

        case "Pa":
            return valor;

        case "kPa":
            return valor * 1000;

        case "MPa":
            return valor * 1000000;

        case "bar":
            return valor * 100000;

        case "atm":
            return valor * 101325;

        case "mmHg":
            return valor * 133.322368;

        default:
            return valor;

    }

}

//=====================================
// CONVERTIR DESDE Pa
//=====================================

function presionDesdePa(valor, unidad) {

    switch (unidad) {

        case "Pa":
            return valor;

        case "kPa":
            return valor / 1000;

        case "MPa":
            return valor / 1000000;

        case "bar":
            return valor / 100000;

        case "atm":
            return valor / 101325;

        case "mmHg":
            return valor / 133.322368;

        default:
            return valor;

    }

}

//=====================================
// TEMPERATURA
// TODAS LAS CONVERSIONES INTERNAS SERÁN A K
//=====================================

function temperaturaAK(valor, unidad) {

    switch (unidad) {

        case "K":
            return valor;

        case "°C":
            return valor + 273.15;

        default:
            return valor;

    }

}

//=====================================
// VOLUMEN
// TODAS LAS CONVERSIONES INTERNAS SERÁN A m³
//=====================================

function volumenAm3(valor, unidad) {

    switch (unidad) {

        case "m3":
            return valor;

        case "L":
            return valor / 1000;

        case "cm3":
            return valor / 1000000;

        default:
            return valor;

    }

}

//=====================================
// MOLES
// TODAS LAS CONVERSIONES INTERNAS SERÁN A mol
//=====================================

function molesAmol(valor, unidad) {

    switch (unidad) {

        case "mol":
            return valor;

        case "kmol":
            return valor * 1000;

        default:
            return valor;

    }

}
//=====================================
// ENERGÍA
// TODAS LAS CONVERSIONES INTERNAS SERÁN A J
//=====================================

function energiaDesdeJ(valor, unidad) {

    switch (unidad) {

        case "J":
            return valor;

        case "kJ":
            return valor / 1000;

        default:
            return valor;

    }

}