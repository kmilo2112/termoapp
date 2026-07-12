console.log("entalpia.js cargado");

//====================================================
// ENTALPÍA
//====================================================
//
// ΔH = m Cp ΔT
//
//====================================================



//====================================================
// MENÚ
//====================================================

function entalpia() {

    contenido.innerHTML = `

    <h2>

    🔥 Entalpía

    </h2>

    <hr>

    <p>

    Seleccione el método de cálculo.

    </p>

    <div class="lista">

        <div class="item"

        onclick="entalpiaCp()">

            🔥 Usando Cp

            <br>

            <small>

            ΔH = mCpΔT

            </small>

        </div>

        <div class="item"

        onclick="entalpiaMoles()">

            🧪 Usando moles

            <br>

            <small>

            ΔH = nCpΔT

            </small>

        </div>

    </div>

    <br>

    <button onclick="gasIdeal()">

        ← Volver

    </button>

    `;

}
//====================================================
// ENTALPÍA CON Cp
//====================================================

function entalpiaCp() {

    contenido.innerHTML = `

    <h2>

    🔥 Entalpía usando Cp

    </h2>

    <hr>

    <p>

    La entalpía representa el contenido energético
    de un sistema a presión constante.

    </p>

    <hr>

    <h2>

    ΔH = m Cp (T₂ − T₁)

    </h2>

    <hr>

    <label>

    <b>Gas</b>

    </label>

    <select id="gas">

        <option value="aire">

        Aire

        </option>

        <option value="nitrogeno">

        Nitrógeno

        </option>

        <option value="co2">

        CO₂

        </option>

        <option value="vaporAgua">

        Vapor de agua

        </option>

    </select>

    <br><br>

    <label>

    <b>Masa</b>

    </label>

    <input id="masa" type="number">

    <select id="unidadMasa">

        <option value="kg">

        kg

        </option>

        <option value="g">

        g

        </option>

    </select>

    <br><br>

    <label>

    <b>Temperatura inicial</b>

    </label>

    <input id="temperaturaInicial" type="number">

    <select id="unidadTemperatura">

        <option value="°C">

        °C

        </option>

        <option value="K">

        K

        </option>

    </select>

    <br><br>

    <label>

    <b>Temperatura final</b>

    </label>

    <input id="temperaturaFinal" type="number">

    <select id="unidadTemperaturaFinal">

        <option value="°C">

        °C

        </option>

        <option value="K">

        K

        </option>

    </select>

    <br><br>

    <label>

    <b>Unidad del resultado</b>

    </label>

    <select id="unidadResultado">

        <option value="J">

        J

        </option>

        <option value="kJ">

        kJ

        </option>

    </select>

    <br><br>

    <button

    onclick="resolverEntalpiaCp()">

    Calcular

    </button>

    <button

    onclick="entalpia()">

    ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//====================================================
// RESOLVER ENTALPÍA CON Cp
//====================================================

function resolverEntalpiaCp() {

    //----------------------------------
    // Gas seleccionado
    //----------------------------------

    const gas = GASES[
        document.getElementById("gas").value
    ];

    const cp = gas.Cp;

    //----------------------------------
    // Lectura de datos
    //----------------------------------

    let masa = parseFloat(
        document.getElementById("masa").value
    );

    let t1 = parseFloat(
        document.getElementById("temperaturaInicial").value
    );

    let t2 = parseFloat(
        document.getElementById("temperaturaFinal").value
    );

    //----------------------------------
    // Validación
    //----------------------------------

    if (
        isNaN(masa) ||
        isNaN(t1) ||
        isNaN(t2)
    ) {

        alert("Ingrese todos los datos.");

        return;

    }

    //----------------------------------
    // Conversión de masa
    //----------------------------------

    if (
        document.getElementById("unidadMasa").value == "g"
    ) {

        masa /= 1000;

    }

    //----------------------------------
    // Conversión de temperatura
    //----------------------------------

    t1 = temperaturaAK(

        t1,

        document.getElementById("unidadTemperatura").value

    );

    t2 = temperaturaAK(

        t2,

        document.getElementById("unidadTemperaturaFinal").value

    );

    //----------------------------------
    // Cálculo
    //----------------------------------

    const deltaT = t2 - t1;

    let entalpia = masa * cp * deltaT;

    //----------------------------------
    // Conversión
    //----------------------------------

    let unidad =

        document.getElementById("unidadResultado").value;

    if (unidad == "kJ") {

        entalpia /= 1000;

    }

    //----------------------------------
    // Interpretación
    //----------------------------------

    let interpretacion = "";

    if (entalpia > 0) {

        interpretacion = "La entalpía aumentó.";

    }

    else if (entalpia < 0) {

        interpretacion = "La entalpía disminuyó.";

    }

    else {

        interpretacion = "La entalpía permaneció constante.";

    }

    //----------------------------------
    // Resultado
    //----------------------------------

    document.getElementById("resultado").innerHTML = `

    <hr>

    <h2>Resultado</h2>

    <p>

    <b>Gas:</b>

    ${gas.nombre}

    </p>

    <p>

    <b>Cp utilizado:</b>

    ${cp} J/(kg·K)

    </p>

    <p>

    <b>ΔT:</b>

    ${deltaT.toFixed(2)} K

    </p>

    <hr>

    <h2>

    ΔH =

    ${entalpia.toFixed(3)}

    ${unidad}

    </h2>

    <hr>

    <p>

    ${interpretacion}

    </p>

    `;

}
//====================================================
// ENTALPÍA USANDO MOLES
//====================================================

function entalpiaMoles() {

    contenido.innerHTML = `

    <h2>

    🧪 Entalpía usando moles

    </h2>

    <hr>

    <p>

    Cuando la cantidad de sustancia está expresada
    en moles se utiliza:

    </p>

    <h2>

    ΔH = n Cp (T₂ − T₁)

    </h2>

    <hr>

    <label>

    <b>Gas</b>

    </label>

    <select id="gas">

        <option value="aire">Aire</option>

        <option value="nitrogeno">Nitrógeno</option>

        <option value="co2">CO₂</option>

        <option value="vaporAgua">Vapor de agua</option>

    </select>

    <br><br>

    <label>

    <b>Número de moles</b>

    </label>

    <input id="moles" type="number">

    <br><br>

    <label>

    <b>Temperatura inicial</b>

    </label>

    <input id="temperaturaInicial" type="number">

    <select id="unidadTemperatura">

        <option value="°C">°C</option>

        <option value="K">K</option>

    </select>

    <br><br>

    <label>

    <b>Temperatura final</b>

    </label>

    <input id="temperaturaFinal" type="number">

    <select id="unidadTemperaturaFinal">

        <option value="°C">°C</option>

        <option value="K">K</option>

    </select>

    <br><br>

    <label>

    <b>Unidad del resultado</b>

    </label>

    <select id="unidadResultado">

        <option value="J">J</option>

        <option value="kJ">kJ</option>

    </select>

    <br><br>

    <button

    onclick="resolverEntalpiaMoles()">

    Calcular

    </button>

    <button

    onclick="entalpia()">

    ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//====================================================
// RESOLVER ENTALPÍA CON MOLES
//====================================================

function resolverEntalpiaMoles() {

    //----------------------------------
    // Gas
    //----------------------------------

    const gas = GASES[
        document.getElementById("gas").value
    ];

    //----------------------------------
    // Cp molar
    //----------------------------------

    const cp =

        gas.Cp * gas.masaMolar / 1000;

    //----------------------------------
    // Lectura
    //----------------------------------

    let n = parseFloat(

        document.getElementById("moles").value

    );

    let t1 = parseFloat(

        document.getElementById("temperaturaInicial").value

    );

    let t2 = parseFloat(

        document.getElementById("temperaturaFinal").value

    );

    //----------------------------------
    // Validación
    //----------------------------------

    if (

        isNaN(n) ||

        isNaN(t1) ||

        isNaN(t2)

    ) {

        alert("Ingrese todos los datos.");

        return;

    }

    //----------------------------------
    // Conversión
    //----------------------------------

    t1 = temperaturaAK(

        t1,

        document.getElementById("unidadTemperatura").value

    );

    t2 = temperaturaAK(

        t2,

        document.getElementById("unidadTemperaturaFinal").value

    );

    //----------------------------------
    // Cálculo
    //----------------------------------

    const deltaT = t2 - t1;

    let entalpia =

        n *

        cp *

        deltaT;

    //----------------------------------
    // Conversión
    //----------------------------------

    let unidad =

        document.getElementById("unidadResultado").value;

    if (unidad == "kJ") {

        entalpia /= 1000;

    }

    //----------------------------------
    // Mostrar resultado
    //----------------------------------

    document.getElementById("resultado").innerHTML = `

    <hr>

    <h2>

    Resultado

    </h2>

    <p>

    <b>Gas:</b>

    ${gas.nombre}

    </p>

    <p>

    <b>Cp molar:</b>

    ${cp.toFixed(2)}

    J/(mol·K)

    </p>

    <p>

    <b>ΔT:</b>

    ${deltaT.toFixed(2)}

    K

    </p>

    <hr>

    <h2>

    ΔH =

    ${entalpia.toFixed(3)}

    ${unidad}

    </h2>

    `;

}