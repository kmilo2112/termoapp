console.log("entropia.js cargado");

//====================================================
// ENTROPÍA
//====================================================
//
// ΔS
//
//====================================================



//====================================================
// MENÚ
//====================================================

function entropia() {

    contenido.innerHTML = `

    <h2>

    🌡️ Entropía

    </h2>

    <hr>

    <p>

    Seleccione el método de cálculo.

    </p>

    <div class="lista">

        <div class="item"

        onclick="entropiaTemperatura()">

            🌡️ Temperatura

            <br>

            <small>

            ΔS = mCp ln(T₂/T₁)

            </small>

        </div>

        <div class="item"

        onclick="entropiaPresion()">

            ⚙ Temperatura y Presión

            <br>

            <small>

            ΔS = mCp ln(T₂/T₁)-mR ln(P₂/P₁)

            </small>

        </div>

        <div class="item"

        onclick="entropiaVolumen()">

            📦 Temperatura y Volumen

            <br>

            <small>

            ΔS = mCv ln(T₂/T₁)+mR ln(V₂/V₁)

            </small>

        </div>

        <div class="item"

        onclick="entropiaMoles()">

            🧪 Usando moles

            <br>

            <small>

            ΔS = nCp ln(T₂/T₁)

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
// ENTROPÍA CON TEMPERATURA
//====================================================

function entropiaTemperatura() {

    contenido.innerHTML = `

    <h2>

    🌡️ Entropía por temperatura

    </h2>

    <hr>

    <p>

    Cuando únicamente cambia la temperatura
    de un gas ideal se utiliza:

    </p>

    <h2>

    ΔS = m Cp ln(T₂/T₁)

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

            J/K

        </option>

        <option value="kJ">

            kJ/K

        </option>

    </select>

    <br><br>

    <button

    onclick="resolverEntropiaTemperatura()">

        Calcular

    </button>

    <button

    onclick="entropia()">

        ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//====================================================
// RESOLVER ENTROPÍA POR TEMPERATURA
//====================================================

function resolverEntropiaTemperatura() {

    //----------------------------------
    // Gas
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
    // Validación física
    //----------------------------------

    if (t1 <= 0 || t2 <= 0) {

        alert("Las temperaturas deben ser mayores que 0 K.");

        return;

    }

    //----------------------------------
    // Cálculo
    //----------------------------------

    let entropia =

        masa *

        cp *

        Math.log(t2 / t1);

    //----------------------------------
    // Conversión
    //----------------------------------

    let unidad =

        document.getElementById("unidadResultado").value;

    if (unidad == "kJ") {

        entropia /= 1000;

    }

    //----------------------------------
    // Interpretación
    //----------------------------------

    let interpretacion = "";

    if (entropia > 0) {

        interpretacion = "La entropía aumentó.";

    }

    else if (entropia < 0) {

        interpretacion = "La entropía disminuyó.";

    }

    else {

        interpretacion = "No hubo cambio de entropía.";

    }

    //----------------------------------
    // Mostrar resultado
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

    <hr>

    <p>

    <b>ΔS = mCp ln(T₂/T₁)</b>

    </p>

    <h2>

    ΔS =

    ${entropia.toFixed(3)}

    ${unidad}/K

    </h2>

    <hr>

    <p>

    ${interpretacion}

    </p>

    `;

}
//====================================================
// ENTROPÍA CON TEMPERATURA Y PRESIÓN
//====================================================

function entropiaPresion() {

    contenido.innerHTML = `

    <h2>

    ⚙ Entropía usando Temperatura y Presión

    </h2>

    <hr>

    <h2>

    ΔS = mCp ln(T₂/T₁) − mR ln(P₂/P₁)

    </h2>

    <hr>

    <label><b>Gas</b></label>

    <select id="gas">

        <option value="aire">Aire</option>

        <option value="nitrogeno">Nitrógeno</option>

        <option value="co2">CO₂</option>

        <option value="vaporAgua">Vapor de agua</option>

    </select>

    <br><br>

    <label><b>Masa</b></label>

    <input id="masa" type="number">

    <select id="unidadMasa">

        <option value="kg">kg</option>

        <option value="g">g</option>

    </select>

    <br><br>

    <label><b>T₁</b></label>

    <input id="temperaturaInicial" type="number">

    <select id="unidadTemperatura">

        <option value="°C">°C</option>

        <option value="K">K</option>

    </select>

    <br><br>

    <label><b>T₂</b></label>

    <input id="temperaturaFinal" type="number">

    <select id="unidadTemperaturaFinal">

        <option value="°C">°C</option>

        <option value="K">K</option>

    </select>

    <br><br>

    <label><b>P₁ (kPa)</b></label>

    <input id="presionInicial" type="number">

    <br><br>

    <label><b>P₂ (kPa)</b></label>

    <input id="presionFinal" type="number">

    <br><br>

    <label><b>Resultado</b></label>

    <select id="unidadResultado">

        <option value="J">J/K</option>

        <option value="kJ">kJ/K</option>

    </select>

    <br><br>

    <button onclick="resolverEntropiaPresion()">

    Calcular

    </button>

    <button onclick="entropia()">

    ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//====================================================
// RESOLVER ENTROPÍA CON PRESIÓN
//====================================================

function resolverEntropiaPresion() {

    const gas = GASES[
        document.getElementById("gas").value
    ];

    const cp = gas.Cp;

    const R = gas.R;

    let masa = parseFloat(document.getElementById("masa").value);

    let t1 = parseFloat(document.getElementById("temperaturaInicial").value);

    let t2 = parseFloat(document.getElementById("temperaturaFinal").value);

    let p1 = parseFloat(document.getElementById("presionInicial").value);

    let p2 = parseFloat(document.getElementById("presionFinal").value);

    if (
        isNaN(masa) ||
        isNaN(t1) ||
        isNaN(t2) ||
        isNaN(p1) ||
        isNaN(p2)
    ) {

        alert("Ingrese todos los datos.");

        return;

    }

    if (document.getElementById("unidadMasa").value == "g") {

        masa /= 1000;

    }

    t1 = temperaturaAK(
        t1,
        document.getElementById("unidadTemperatura").value
    );

    t2 = temperaturaAK(
        t2,
        document.getElementById("unidadTemperaturaFinal").value
    );

    let s =

        masa * cp * Math.log(t2 / t1)

        -

        masa * R * Math.log(p2 / p1);

    if (document.getElementById("unidadResultado").value == "kJ") {

        s /= 1000;

    }

    document.getElementById("resultado").innerHTML = `

    <hr>

    <h2>

    ΔS =

    ${s.toFixed(3)}

    ${document.getElementById("unidadResultado").value}/K

    </h2>

    `;

}
//====================================================
// ENTROPÍA CON TEMPERATURA Y VOLUMEN
//====================================================

function entropiaVolumen() {

    contenido.innerHTML = `

    <h2>

    📦 Entropía usando Temperatura y Volumen

    </h2>

    <hr>

    <h2>

    ΔS = mCv ln(T₂/T₁) + mR ln(V₂/V₁)

    </h2>

    <hr>

    <label><b>Gas</b></label>

    <select id="gas">

        <option value="aire">Aire</option>

        <option value="nitrogeno">Nitrógeno</option>

        <option value="co2">CO₂</option>

        <option value="vaporAgua">Vapor de agua</option>

    </select>

    <br><br>

    <label><b>Masa</b></label>

    <input id="masa" type="number">

    <select id="unidadMasa">

        <option value="kg">kg</option>

        <option value="g">g</option>

    </select>

    <br><br>

    <label><b>T₁</b></label>

    <input id="temperaturaInicial" type="number">

    <select id="unidadTemperatura">

        <option value="°C">°C</option>

        <option value="K">K</option>

    </select>

    <br><br>

    <label><b>T₂</b></label>

    <input id="temperaturaFinal" type="number">

    <select id="unidadTemperaturaFinal">

        <option value="°C">°C</option>

        <option value="K">K</option>

    </select>

    <br><br>

    <label><b>V₁ (m³)</b></label>

    <input id="volumenInicial" type="number">

    <br><br>

    <label><b>V₂ (m³)</b></label>

    <input id="volumenFinal" type="number">

    <br><br>

    <label><b>Resultado</b></label>

    <select id="unidadResultado">

        <option value="J">J/K</option>

        <option value="kJ">kJ/K</option>

    </select>

    <br><br>

    <button onclick="resolverEntropiaVolumen()">

    Calcular

    </button>

    <button onclick="entropia()">

    ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//====================================================
// RESOLVER ENTROPÍA CON VOLUMEN
//====================================================

function resolverEntropiaVolumen() {

    const gas = GASES[
        document.getElementById("gas").value
    ];

    const cv = gas.Cv;

    const R = gas.R;

    let masa = parseFloat(document.getElementById("masa").value);

    let t1 = parseFloat(document.getElementById("temperaturaInicial").value);

    let t2 = parseFloat(document.getElementById("temperaturaFinal").value);

    let v1 = parseFloat(document.getElementById("volumenInicial").value);

    let v2 = parseFloat(document.getElementById("volumenFinal").value);

    if (
        isNaN(masa) ||
        isNaN(t1) ||
        isNaN(t2) ||
        isNaN(v1) ||
        isNaN(v2)
    ) {

        alert("Ingrese todos los datos.");

        return;

    }

    if (document.getElementById("unidadMasa").value == "g") {

        masa /= 1000;

    }

    t1 = temperaturaAK(
        t1,
        document.getElementById("unidadTemperatura").value
    );

    t2 = temperaturaAK(
        t2,
        document.getElementById("unidadTemperaturaFinal").value
    );

    let s =

        masa * cv * Math.log(t2 / t1)

        +

        masa * R * Math.log(v2 / v1);

    if (document.getElementById("unidadResultado").value == "kJ") {

        s /= 1000;

    }

    document.getElementById("resultado").innerHTML = `

    <hr>

    <h2>

    ΔS =

    ${s.toFixed(3)}

    ${document.getElementById("unidadResultado").value}/K

    </h2>

    `;

}
//====================================================
// ENTROPÍA USANDO MOLES
//====================================================

function entropiaMoles() {

    contenido.innerHTML = `

    <h2>

    🧪 Entropía usando moles

    </h2>

    <hr>

    <h2>

    ΔS = nCp ln(T₂/T₁)

    </h2>

    <hr>

    <label><b>Gas</b></label>

    <select id="gas">

        <option value="aire">Aire</option>

        <option value="nitrogeno">Nitrógeno</option>

        <option value="co2">CO₂</option>

        <option value="vaporAgua">Vapor de agua</option>

    </select>

    <br><br>

    <label><b>Moles</b></label>

    <input id="moles" type="number">

    <br><br>

    <label><b>T₁</b></label>

    <input id="temperaturaInicial" type="number">

    <select id="unidadTemperatura">

        <option value="°C">°C</option>

        <option value="K">K</option>

    </select>

    <br><br>

    <label><b>T₂</b></label>

    <input id="temperaturaFinal" type="number">

    <select id="unidadTemperaturaFinal">

        <option value="°C">°C</option>

        <option value="K">K</option>

    </select>

    <br><br>

    <label><b>Resultado</b></label>

    <select id="unidadResultado">

        <option value="J">J/K</option>

        <option value="kJ">kJ/K</option>

    </select>

    <br><br>

    <button onclick="resolverEntropiaMoles()">

    Calcular

    </button>

    <button onclick="entropia()">

    ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//====================================================
// RESOLVER ENTROPÍA CON MOLES
//====================================================

function resolverEntropiaMoles() {

    const gas = GASES[
        document.getElementById("gas").value
    ];

    const cp = gas.Cp * gas.masaMolar / 1000;

    let n = parseFloat(document.getElementById("moles").value);

    let t1 = parseFloat(document.getElementById("temperaturaInicial").value);

    let t2 = parseFloat(document.getElementById("temperaturaFinal").value);

    if (
        isNaN(n) ||
        isNaN(t1) ||
        isNaN(t2)
    ) {

        alert("Ingrese todos los datos.");

        return;

    }

    t1 = temperaturaAK(
        t1,
        document.getElementById("unidadTemperatura").value
    );

    t2 = temperaturaAK(
        t2,
        document.getElementById("unidadTemperaturaFinal").value
    );

    let s = n * cp * Math.log(t2 / t1);

    if (document.getElementById("unidadResultado").value == "kJ") {

        s /= 1000;

    }

    document.getElementById("resultado").innerHTML = `

    <hr>

    <h2>

    ΔS =

    ${s.toFixed(3)}

    ${document.getElementById("unidadResultado").value}/K

    </h2>

    `;

}