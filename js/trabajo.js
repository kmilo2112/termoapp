console.log("trabajo.js cargado");
//========================================
// TRABAJO ISOBÁRICO
//========================================

function calcularTrabajoIsobarico() {

    //----------------------------------
    // Lectura de datos
    //----------------------------------

    let presion = parseFloat(document.getElementById("presion").value);

    let volumenInicial = parseFloat(document.getElementById("volumenInicial").value);

    let volumenFinal = parseFloat(document.getElementById("volumenFinal").value);

    let unidadPresion = document.getElementById("unidadPresion").value;

    let unidadVolumenInicial = document.getElementById("unidadVolumenInicial").value;

    let unidadVolumenFinal = document.getElementById("unidadVolumenFinal").value;

    let unidadResultado = document.getElementById("unidadResultado").value;

    //----------------------------------
    // Validación
    //----------------------------------

    if (

        isNaN(presion) ||

        isNaN(volumenInicial) ||

        isNaN(volumenFinal)

    ) {

        alert("Debe ingresar todos los datos.");

        return;

    }

    //----------------------------------
    // Conversión al SI
    //----------------------------------

    presion = presionAPa(

        presion,

        unidadPresion

    );

    volumenInicial = volumenAm3(

        volumenInicial,

        unidadVolumenInicial

    );

    volumenFinal = volumenAm3(

        volumenFinal,

        unidadVolumenFinal

    );

    //----------------------------------
    // Cálculo
    //----------------------------------

    const trabajoJ =

        presion *

        (volumenFinal - volumenInicial);

    //----------------------------------
    // Conversión del resultado
    //----------------------------------

    const trabajoFinal =

        energiaDesdeJ(

            trabajoJ,

            unidadResultado

        );

    //----------------------------------
    // Conclusión física
    //----------------------------------

    let conclusion = "";

    if (volumenFinal > volumenInicial) {

        conclusion =

            "El volumen aumentó. El sistema se expandió y realizó trabajo sobre los alrededores.";

    }

    else if (volumenFinal < volumenInicial) {

        conclusion =

            "El volumen disminuyó. El sistema fue comprimido y los alrededores realizaron trabajo sobre el sistema.";

    }

    else {

        conclusion =

            "No hubo cambio de volumen; por lo tanto, el trabajo fue cero.";

    }

    //----------------------------------
    // Mostrar resultado
    //----------------------------------

    document.getElementById("resultado").innerHTML = `

        <hr>

        <h2>Resultado</h2>

        <h3>Procedimiento</h3>

        <p>

        W = P (V₂ − V₁)

        </p>

        <hr>

        <h3>Conversión al SI</h3>

        <p>

        Presión = ${presion.toFixed(2)} Pa

        </p>

        <p>

        Volumen inicial = ${volumenInicial.toFixed(6)} m³

        </p>

        <p>

        Volumen final = ${volumenFinal.toFixed(6)} m³

        </p>

        <hr>

        <h3>Sustitución</h3>

        <p>

        W = (${presion.toFixed(2)})

        ×

        (${volumenFinal.toFixed(6)} − ${volumenInicial.toFixed(6)})

        </p>

        <hr>

        <h2>

        ${trabajoFinal.toFixed(3)}

        ${unidadResultado}

        </h2>

        <hr>

        <h3>Conclusión Física</h3>

        <p>

        ${conclusion}

        </p>

    `;

}
//========================================
// TRABAJO ISOCÓRICO
//========================================

function calcularTrabajoIsocorico() {

    document.getElementById("resultado").innerHTML = `

        <hr>

        <h2>Resultado</h2>

        <h3>Procedimiento</h3>

        <p>

        En un proceso isocórico:

        </p>

        <p>

        ΔV = 0

        </p>

        <p>

        W = P (V₂ − V₁)

        </p>

        <p>

        W = P (0)

        </p>

        <hr>

        <h2>

        0.00 J

        </h2>

        <hr>

        <h3>Conclusión Física</h3>

        <p>

        Como el volumen permaneció constante durante todo el proceso,

        no existió desplazamiento de la frontera del sistema.

        Por lo tanto, el trabajo realizado es igual a cero.

        </p>

    `;

}
//========================================
// TRABAJO ISOTÉRMICO
//========================================

function calcularTrabajoIsotermico() {

    //----------------------------------
    // Lectura de datos
    //----------------------------------

    let moles = parseFloat(document.getElementById("moles").value);

    let temperatura = parseFloat(document.getElementById("temperatura").value);

    let volumenInicial = parseFloat(document.getElementById("volumenInicial").value);

    let volumenFinal = parseFloat(document.getElementById("volumenFinal").value);

    let unidadMoles = document.getElementById("unidadMoles").value;

    let unidadTemperatura = document.getElementById("unidadTemperatura").value;

    let unidadVolumenInicial = document.getElementById("unidadVolumenInicial").value;

    let unidadVolumenFinal = document.getElementById("unidadVolumenFinal").value;

    let unidadResultado = document.getElementById("unidadResultado").value;

    //----------------------------------
    // Validación
    //----------------------------------

    if (

        isNaN(moles) ||

        isNaN(temperatura) ||

        isNaN(volumenInicial) ||

        isNaN(volumenFinal)

    ) {

        alert("Debe ingresar todos los datos.");

        return;

    }

    //----------------------------------
    // Conversión al SI
    //----------------------------------

    moles = molesAmol(moles, unidadMoles);

    temperatura = temperaturaAK(temperatura, unidadTemperatura);

    volumenInicial = volumenAm3(volumenInicial, unidadVolumenInicial);

    volumenFinal = volumenAm3(volumenFinal, unidadVolumenFinal);

    //----------------------------------
    // Constante universal
    //----------------------------------

    const R = CONSTANTES.R.J;

    //----------------------------------
    // Relación de volúmenes
    //----------------------------------

    const relacion = volumenFinal / volumenInicial;

    const ln = Math.log(relacion);

    //----------------------------------
    // Trabajo
    //----------------------------------

    const trabajoJ = moles * R * temperatura * ln;

    //----------------------------------
    // Conversión del resultado
    //----------------------------------

    const trabajoFinal = energiaDesdeJ(

        trabajoJ,

        unidadResultado

    );

    //----------------------------------
    // Conclusión Física
    //----------------------------------

    let conclusion = "";

    if (volumenFinal > volumenInicial) {

        conclusion =

            "El sistema se expandió a temperatura constante y realizó trabajo sobre los alrededores.";

    }

    else if (volumenFinal < volumenInicial) {

        conclusion =

            "El sistema fue comprimido a temperatura constante y los alrededores realizaron trabajo sobre él.";

    }

    else {

        conclusion =

            "No hubo cambio de volumen; por lo tanto, el trabajo es igual a cero.";

    }

    //----------------------------------
    // Mostrar resultado
    //----------------------------------

    document.getElementById("resultado").innerHTML = `

        <hr>

        <h2>Resultado</h2>

        <h3>Conversión al SI</h3>

        <p>Moles = ${moles.toFixed(4)} mol</p>

        <p>Temperatura = ${temperatura.toFixed(2)} K</p>

        <p>Volumen inicial = ${volumenInicial.toFixed(6)} m³</p>

        <p>Volumen final = ${volumenFinal.toFixed(6)} m³</p>

        <hr>

        <h3>Procedimiento</h3>

        <p>

        W = nRT ln(V₂/V₁)

        </p>

        <p>

        V₂/V₁ = ${relacion.toFixed(6)}

        </p>

        <p>

        ln(V₂/V₁) = ${ln.toFixed(6)}

        </p>

        <p>

        W = (${moles.toFixed(4)})

        ×

        (${R})

        ×

        (${temperatura.toFixed(2)})

        ×

        (${ln.toFixed(6)})

        </p>

        <hr>

        <h2>

        ${trabajoFinal.toFixed(3)}

        ${unidadResultado}

        </h2>

        <hr>

        <h3>Observaciones</h3>

        <ul>

            <li>La temperatura permanece constante.</li>

            <li>Para un gas ideal, ΔU = 0.</li>

            <li>Todo el calor transferido se convierte en trabajo.</li>

        </ul>

        <hr>

        <h3>Conclusión Física</h3>

        <p>

        ${conclusion}

        </p>

    `;

}
//========================================
// TRABAJO ADIABÁTICO
//========================================

function calcularTrabajoAdiabatico() {

    //----------------------------------
    // Lectura de datos
    //----------------------------------

    let presionInicial = parseFloat(document.getElementById("presionInicial").value);

    let presionFinal = parseFloat(document.getElementById("presionFinal").value);

    let volumenInicial = parseFloat(document.getElementById("volumenInicial").value);

    let volumenFinal = parseFloat(document.getElementById("volumenFinal").value);

    let gamma = parseFloat(document.getElementById("gamma").value);

    let unidadPresionInicial = document.getElementById("unidadPresionInicial").value;

    let unidadPresionFinal = document.getElementById("unidadPresionFinal").value;

    let unidadVolumenInicial = document.getElementById("unidadVolumenInicial").value;

    let unidadVolumenFinal = document.getElementById("unidadVolumenFinal").value;

    let unidadResultado = document.getElementById("unidadResultado").value;

    //----------------------------------
    // Validación
    //----------------------------------

    if (

        isNaN(presionInicial) ||

        isNaN(presionFinal) ||

        isNaN(volumenInicial) ||

        isNaN(volumenFinal) ||

        isNaN(gamma)

    ) {

        alert("Debe ingresar todos los datos.");

        return;

    }

    if (gamma == 1) {

        alert("γ no puede ser igual a 1.");

        return;

    }

    //----------------------------------
    // Conversión al SI
    //----------------------------------

    presionInicial = presionAPa(presionInicial, unidadPresionInicial);

    presionFinal = presionAPa(presionFinal, unidadPresionFinal);

    volumenInicial = volumenAm3(volumenInicial, unidadVolumenInicial);

    volumenFinal = volumenAm3(volumenFinal, unidadVolumenFinal);

    //----------------------------------
    // Cálculo
    //----------------------------------

    const trabajoJ =

        ((presionFinal * volumenFinal) -

            (presionInicial * volumenInicial))

        /

        (1 - gamma);

    //----------------------------------
    // Conversión
    //----------------------------------

    const trabajoFinal = energiaDesdeJ(

        trabajoJ,

        unidadResultado

    );

    //----------------------------------
    // Interpretación
    //----------------------------------

    let conclusion = "";

    if (trabajoJ > 0) {

        conclusion =

            "El sistema realizó trabajo durante el proceso adiabático.";

    }

    else if (trabajoJ < 0) {

        conclusion =

            "Se realizó trabajo sobre el sistema durante el proceso adiabático.";

    }

    else {

        conclusion =

            "El trabajo es igual a cero.";

    }

    //----------------------------------
    // Mostrar resultado
    //----------------------------------

    document.getElementById("resultado").innerHTML = `

        <hr>

        <h2>Resultado</h2>

        <h3>Conversión al SI</h3>

        <p>

        P₁ = ${presionInicial.toFixed(2)} Pa

        </p>

        <p>

        P₂ = ${presionFinal.toFixed(2)} Pa

        </p>

        <p>

        V₁ = ${volumenInicial.toFixed(6)} m³

        </p>

        <p>

        V₂ = ${volumenFinal.toFixed(6)} m³

        </p>

        <p>

        γ = ${gamma}

        </p>

        <hr>

        <h3>Procedimiento</h3>

        <p>

        W = (P₂V₂ − P₁V₁)/(1 − γ)

        </p>

        <p>

        W =

        (

        (${presionFinal.toFixed(2)} × ${volumenFinal.toFixed(6)})

        −

        (${presionInicial.toFixed(2)} × ${volumenInicial.toFixed(6)})

        )

        /

        (1 − ${gamma})

        </p>

        <hr>

        <h2>

        ${trabajoFinal.toFixed(3)}

        ${unidadResultado}

        </h2>

        <hr>

        <h3>Observaciones</h3>

        <ul>

            <li>No existe transferencia de calor (Q = 0).</li>

            <li>La energía cambia únicamente por el trabajo realizado.</li>

            <li>γ representa la relación Cp/Cv.</li>

        </ul>

        <hr>

        <h3>Conclusión Física</h3>

        <p>

        ${conclusion}

        </p>

    `;

}
//========================================
// TRABAJO POLITRÓPICO
//========================================

function calcularTrabajoPolitropico() {

    //----------------------------------
    // Lectura de datos
    //----------------------------------

    let presionInicial = parseFloat(document.getElementById("presionInicial").value);

    let presionFinal = parseFloat(document.getElementById("presionFinal").value);

    let volumenInicial = parseFloat(document.getElementById("volumenInicial").value);

    let volumenFinal = parseFloat(document.getElementById("volumenFinal").value);

    let n = parseFloat(document.getElementById("n").value);

    let unidadPresionInicial = document.getElementById("unidadPresionInicial").value;

    let unidadPresionFinal = document.getElementById("unidadPresionFinal").value;

    let unidadVolumenInicial = document.getElementById("unidadVolumenInicial").value;

    let unidadVolumenFinal = document.getElementById("unidadVolumenFinal").value;

    let unidadResultado = document.getElementById("unidadResultado").value;

    //----------------------------------
    // Validación
    //----------------------------------

    if (

        isNaN(presionInicial) ||

        isNaN(presionFinal) ||

        isNaN(volumenInicial) ||

        isNaN(volumenFinal) ||

        isNaN(n)

    ) {

        alert("Debe ingresar todos los datos.");

        return;

    }

    if (n == 1) {

        alert("Para n = 1 debe utilizar el proceso isotérmico.");

        return;

    }

    //----------------------------------
    // Conversión al SI
    //----------------------------------

    presionInicial = presionAPa(presionInicial, unidadPresionInicial);

    presionFinal = presionAPa(presionFinal, unidadPresionFinal);

    volumenInicial = volumenAm3(volumenInicial, unidadVolumenInicial);

    volumenFinal = volumenAm3(volumenFinal, unidadVolumenFinal);

    //----------------------------------
    // Cálculo
    //----------------------------------

    const trabajoJ =

        (

            (presionFinal * volumenFinal)

            -

            (presionInicial * volumenInicial)

        )

        /

        (1 - n);

    //----------------------------------
    // Conversión
    //----------------------------------

    const trabajoFinal = energiaDesdeJ(

        trabajoJ,

        unidadResultado

    );

    //----------------------------------
    // Conclusión Física
    //----------------------------------

    let conclusion = "";

    if (trabajoJ > 0) {

        conclusion =

            "El sistema realizó trabajo durante el proceso politrópico.";

    }

    else if (trabajoJ < 0) {

        conclusion =

            "Los alrededores realizaron trabajo sobre el sistema.";

    }

    else {

        conclusion =

            "El trabajo es igual a cero.";

    }

    //----------------------------------
    // Mostrar resultado
    //----------------------------------

    document.getElementById("resultado").innerHTML = `

        <hr>

        <h2>Resultado</h2>

        <h3>Conversión al SI</h3>

        <p>

        P₁ = ${presionInicial.toFixed(2)} Pa

        </p>

        <p>

        P₂ = ${presionFinal.toFixed(2)} Pa

        </p>

        <p>

        V₁ = ${volumenInicial.toFixed(6)} m³

        </p>

        <p>

        V₂ = ${volumenFinal.toFixed(6)} m³

        </p>

        <p>

        n = ${n}

        </p>

        <hr>

        <h3>Procedimiento</h3>

        <p>

        W = (P₂V₂ − P₁V₁)/(1 − n)

        </p>

        <p>

        W =

        (

        (${presionFinal.toFixed(2)} × ${volumenFinal.toFixed(6)})

        −

        (${presionInicial.toFixed(2)} × ${volumenInicial.toFixed(6)})

        )

        /

        (1 − ${n})

        </p>

        <hr>

        <h2>

        ${trabajoFinal.toFixed(3)}

        ${unidadResultado}

        </h2>

        <hr>

        <h3>Observaciones</h3>

        <ul>

            <li>El proceso cumple la relación PVⁿ = constante.</li>

            <li>Cuando n = 0 el proceso es isobárico.</li>

            <li>Cuando n = 1 el proceso es isotérmico.</li>

            <li>Cuando n = γ el proceso es adiabático.</li>

        </ul>

        <hr>

        <h3>Conclusión Física</h3>

        <p>

        ${conclusion}

        </p>

    `;

}
