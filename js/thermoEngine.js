const ThermoEngine = {

    resolver(propiedad, datos) {

        switch (propiedad) {

            case "presion":

                return calcularPresion(datos);

            case "volumen":

                return calcularVolumen(datos);

            case "temperatura":

                return calcularTemperatura(datos);

            case "moles":

                return calcularMoles(datos);

            case "trabajo":

                return calcularTrabajo(datos);

            case "calor":

                return calcularCalor(datos);

            case "energiaInterna":

                return calcularEnergiaInterna(datos);

            case "entalpia":

                return calcularEntalpia(datos);

            case "entropia":

                return calcularEntropia(datos);

            case "gibbs":

                return calcularGibbs(datos);

            default:

                return null;

        }

    }

};