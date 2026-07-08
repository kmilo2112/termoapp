//========================================
// CALCULAR PRESIÓN
//========================================

function calcularPresion() {

    //----------------------------------
    // Lectura de datos
    //----------------------------------

    let volumen = parseFloat(document.getElementById("volumen").value);
    let temperatura = parseFloat(document.getElementById("temperatura").value);
    let moles = parseFloat(document.getElementById("moles").value);

    let unidadVolumen = document.getElementById("unidadVolumen").value;
    let unidadTemperatura = document.getElementById("unidadTemperatura").value;
    let unidadMoles = document.getElementById("unidadMoles").value;
    let unidadResultado = document.getElementById("unidadResultado").value;

    //----------------------------------
    // Validación
    //----------------------------------

    if (isNaN(volumen) || isNaN(temperatura) || isNaN(moles)) {

        alert("Debe ingresar todos los datos.");

        return;

    }

    //----------------------------------
    // Conversión al SI
    //----------------------------------

    volumen = volumenAm3(volumen, unidadVolumen);

    temperatura = temperaturaAK(temperatura, unidadTemperatura);

    moles = molesAmol(moles, unidadMoles);

    //----------------------------------
    // Constante universal
    //----------------------------------

    const R = CONSTANTES.R.J;

    //----------------------------------
    // Cálculo
    //----------------------------------

    const presionPa = (moles * R * temperatura) / volumen;

    //----------------------------------
    // Conversión del resultado
    //----------------------------------

    const presionFinal = presionDesdePa(presionPa, unidadResultado);

    //----------------------------------
    // Mostrar resultado
    //----------------------------------

    document.getElementById("resultado").innerHTML = `

        <hr>

        <h2>Resultado</h2>

        <h3>Ley del Gas Ideal</h3>

        <p><b>Ecuación:</b> PV = nRT</p>

        <p><b>Despeje:</b> P = nRT / V</p>

        <hr>

        <h3>Conversión al SI</h3>

        <table style="width:100%; border-collapse:collapse;">

            <tr>

                <th align="left">Variable</th>

                <th align="right">Valor SI</th>

            </tr>

            <tr>

                <td>Volumen</td>

                <td align="right">${volumen.toFixed(6)} m³</td>

            </tr>

            <tr>

                <td>Temperatura</td>

                <td align="right">${temperatura.toFixed(2)} K</td>

            </tr>

            <tr>

                <td>Moles</td>

                <td align="right">${moles.toFixed(4)} mol</td>

            </tr>

        </table>

        <hr>

        <h3>Sustitución</h3>

        <p>

        P = (${moles.toFixed(4)}) × (${R}) × (${temperatura.toFixed(2)})

        ÷ (${volumen.toFixed(6)})

        </p>

        <hr>

        <h2>

        ${presionFinal.toFixed(3)} ${unidadResultado}

        </h2>

        <hr>

        <p>

        <b>Interpretación:</b><br>

        Esta es la presión absoluta del gas ideal bajo las condiciones especificadas.

        </p>

    `;

}

//========================================
// CALCULAR VOLUMEN
//========================================

function calcularVolumen() {

    //----------------------------------
    // Lectura de datos
    //----------------------------------

    let presion = parseFloat(document.getElementById("presion").value);
    let temperatura = parseFloat(document.getElementById("temperatura").value);
    let moles = parseFloat(document.getElementById("moles").value);

    let unidadPresion = document.getElementById("unidadPresion").value;
    let unidadTemperatura = document.getElementById("unidadTemperatura").value;
    let unidadMoles = document.getElementById("unidadMoles").value;
    let unidadResultado = document.getElementById("unidadResultado").value;

    //----------------------------------
    // Validación
    //----------------------------------

    if (isNaN(presion) || isNaN(temperatura) || isNaN(moles)) {

        alert("Debe ingresar todos los datos.");

        return;

    }

    //----------------------------------
    // Conversión al SI
    //----------------------------------

    presion = presionAPa(presion, unidadPresion);

    temperatura = temperaturaAK(temperatura, unidadTemperatura);

    moles = molesAmol(moles, unidadMoles);

    //----------------------------------
    // Constante universal
    //----------------------------------

    const R = CONSTANTES.R.J;

    //----------------------------------
    // Cálculo
    //----------------------------------

    const volumenM3 = (moles * R * temperatura) / presion;

    //----------------------------------
    // Conversión del resultado
    //----------------------------------

    let volumenFinal = volumenM3;

    if (unidadResultado == "L") {

        volumenFinal = volumenM3 * 1000;

    }

    if (unidadResultado == "cm3") {

        volumenFinal = volumenM3 * 1000000;

    }

    //----------------------------------
    // Mostrar resultado
    //----------------------------------

    document.getElementById("resultado").innerHTML = `

        <hr>

        <h2>Resultado</h2>

        <h3>Ley del Gas Ideal</h3>

        <p><b>Ecuación:</b> PV=nRT</p>

        <p><b>Despeje:</b> V=nRT/P</p>

        <hr>

        <h3>Conversión al SI</h3>

        <table style="width:100%;border-collapse:collapse">

            <tr>

                <th align="left">Variable</th>

                <th align="right">Valor SI</th>

            </tr>

            <tr>

                <td>Presión</td>

                <td align="right">${presion.toFixed(2)} Pa</td>

            </tr>

            <tr>

                <td>Temperatura</td>

                <td align="right">${temperatura.toFixed(2)} K</td>

            </tr>

            <tr>

                <td>Moles</td>

                <td align="right">${moles.toFixed(4)} mol</td>

            </tr>

        </table>

        <hr>

        <h3>Sustitución</h3>

        <p>

        V = (${moles.toFixed(4)}) × (${R}) × (${temperatura.toFixed(2)})

        ÷ (${presion.toFixed(2)})

        </p>

        <hr>

        <h2>

        ${volumenFinal.toFixed(6)} ${unidadResultado}

        </h2>

        <hr>

        <p>

        <b>Interpretación:</b><br>

        Este es el volumen ocupado por el gas ideal para las condiciones especificadas.

        </p>

    `;

}
//========================================
// CALCULAR TEMPERATURA
//========================================

function calcularTemperatura() {

    let presion = parseFloat(document.getElementById("presion").value);
    let volumen = parseFloat(document.getElementById("volumen").value);
    let moles = parseFloat(document.getElementById("moles").value);

    let unidadPresion = document.getElementById("unidadPresion").value;
    let unidadVolumen = document.getElementById("unidadVolumen").value;
    let unidadMoles = document.getElementById("unidadMoles").value;
    let unidadResultado = document.getElementById("unidadResultado").value;

    if (isNaN(presion) || isNaN(volumen) || isNaN(moles)) {

        alert("Debe ingresar todos los datos.");

        return;

    }

    presion = presionAPa(presion, unidadPresion);

    volumen = volumenAm3(volumen, unidadVolumen);

    moles = molesAmol(moles, unidadMoles);

    const R = CONSTANTES.R.J;

    const temperaturaK = (presion * volumen) / (moles * R);

    let temperaturaFinal = temperaturaK;

    if (unidadResultado == "°C") {

        temperaturaFinal = temperaturaK - 273.15;

    }

    document.getElementById("resultado").innerHTML = `

    <hr>

    <h2>Resultado</h2>

    <h3>Ley del Gas Ideal</h3>

    <p><b>Ecuación:</b> PV=nRT</p>

    <p><b>Despeje:</b> T=PV/(nR)</p>

    <hr>

    <h3>Sustitución</h3>

    <p>

    T = (${presion.toFixed(2)}) × (${volumen.toFixed(6)})

    ÷ ((${moles.toFixed(4)}) × (${R}))

    </p>

    <hr>

    <h2>

    ${temperaturaFinal.toFixed(2)} ${unidadResultado}

    </h2>

    <hr>

    <p>

    <b>Interpretación:</b><br>

    Esta es la temperatura del gas ideal para las condiciones dadas.

    </p>

    `;

}

//========================================
// CALCULAR MOLES
//========================================

function calcularMoles() {

    let presion = parseFloat(document.getElementById("presion").value);
    let volumen = parseFloat(document.getElementById("volumen").value);
    let temperatura = parseFloat(document.getElementById("temperatura").value);

    let unidadPresion = document.getElementById("unidadPresion").value;
    let unidadVolumen = document.getElementById("unidadVolumen").value;
    let unidadTemperatura = document.getElementById("unidadTemperatura").value;
    let unidadResultado = document.getElementById("unidadResultado").value;

    if (isNaN(presion) || isNaN(volumen) || isNaN(temperatura)) {

        alert("Debe ingresar todos los datos.");

        return;

    }

    presion = presionAPa(presion, unidadPresion);

    volumen = volumenAm3(volumen, unidadVolumen);

    temperatura = temperaturaAK(temperatura, unidadTemperatura);

    const R = CONSTANTES.R.J;

    const moles = (presion * volumen) / (R * temperatura);

    let resultado = moles;

    if (unidadResultado == "kmol") {

        resultado = moles / 1000;

    }

    document.getElementById("resultado").innerHTML = `

    <hr>

    <h2>Resultado</h2>

    <h3>Ley del Gas Ideal</h3>

    <p><b>Ecuación:</b> PV=nRT</p>

    <p><b>Despeje:</b> n=PV/(RT)</p>

    <hr>

    <h3>Sustitución</h3>

    <p>

    n = (${presion.toFixed(2)}) × (${volumen.toFixed(6)})

    ÷ ((${R}) × (${temperatura.toFixed(2)}))

    </p>

    <hr>

    <h2>

    ${resultado.toFixed(4)} ${unidadResultado}

    </h2>

    <hr>

    <p>

    <b>Interpretación:</b><br>

    Esta es la cantidad de sustancia del gas ideal.

    </p>

    `;

}