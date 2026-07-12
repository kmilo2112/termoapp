console.log("energiaInterna.js cargado");

//====================================================
// ENERGÍA INTERNA
//====================================================
//
// ΔU = m Cv ΔT
//
// Módulo desarrollado para ThermoLab.
//
//====================================================



//====================================================
// MENÚ PRINCIPAL
//====================================================

function energiaInterna() {

    contenido.innerHTML = `

    <h2>⚡ Energía Interna</h2>

    <hr>

    <p>

    Seleccione el método que desea utilizar.

    </p>

    <div class="lista">

        <div class="item"

        onclick="energiaInternaCv()">

            ⚡ Usando Cv

            <br>

            <small>

            ΔU = m Cv ΔT

            </small>

        </div>

        <div class="item"

        onclick="energiaInternaCp()">

            🔥 Usando Cp

            <br>

            <small>

            Cv = Cp − R

            </small>

        </div>

        <div class="item"

        onclick="energiaInternaMoles()">

            🧪 Usando moles

            <br>

            <small>

            ΔU = n Cv ΔT

            </small>

        </div>

        <div class="item"

        onclick="relacionCpCv()">

            📖 Relación Cp y Cv

            <br>

            <small>

            Cp − Cv = R

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
// ENERGÍA INTERNA USANDO Cv
//====================================================

function energiaInternaCv() {

    contenido.innerHTML = `

    <h2>

    ⚡ Energía Interna usando Cv

    </h2>

    <hr>

    <h3>

    ¿Qué es la energía interna?

    </h3>

    <p>

    La energía interna representa la energía
    almacenada dentro del sistema.

    Para un gas ideal depende únicamente
    de la temperatura.

    </p>

    <hr>

    <h3>

    Ecuación

    </h3>

    <h2>

    ΔU = m Cv (T₂ − T₁)

    </h2>

    <hr>

    <h3>

    Variables

    </h3>

    <table style="width:100%;border-collapse:collapse;">

        <tr>

            <th align="left">

            Variable

            </th>

            <th align="left">

            Descripción

            </th>

            <th align="left">

            Unidad

            </th>

        </tr>

        <tr>

            <td>

            ΔU

            </td>

            <td>

            Cambio de energía interna

            </td>

            <td>

            J

            </td>

        </tr>

        <tr>

            <td>

            m

            </td>

            <td>

            Masa

            </td>

            <td>

            kg

            </td>

        </tr>

        <tr>

            <td>

            Cv

            </td>

            <td>

            Calor específico a volumen constante

            </td>

            <td>

            J/(kg·K)

            </td>

        </tr>

        <tr>

            <td>

            T₁

            </td>

            <td>

            Temperatura inicial

            </td>

            <td>

            K

            </td>

        </tr>

        <tr>

            <td>

            T₂

            </td>

            <td>

            Temperatura final

            </td>

            <td>

            K

            </td>

        </tr>

    </table>

    <hr>

    <h3>

    Ingrese los datos

    </h3>

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

    <input

    id="masa"

    type="number">

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

    <input

    id="temperaturaInicial"

    type="number">

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

    <input

    id="temperaturaFinal"

    type="number">

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

    onclick="resolverEnergiaInternaCv()">

    Calcular

    </button>

    <button

    onclick="energiaInterna()">

    ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//====================================================
// RESOLVER ENERGÍA INTERNA CON Cv
//====================================================

function resolverEnergiaInternaCv() {

    //----------------------------------
    // Gas seleccionado
    //----------------------------------

    const gas = GASES[

        document.getElementById("gas").value

    ];

    const cv = gas.Cv;

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

    let energia = masa * cv * deltaT;

    //----------------------------------
    // Conversión del resultado
    //----------------------------------

    let unidad =

        document.getElementById("unidadResultado").value;

    if (unidad == "kJ") {

        energia /= 1000;

    }

    //----------------------------------
    // Interpretación
    //----------------------------------

    let interpretacion = "";

    if (energia > 0) {

        interpretacion = "La energía interna aumentó.";

    }

    else if (energia < 0) {

        interpretacion = "La energía interna disminuyó.";

    }

    else {

        interpretacion = "La energía interna permanece constante.";

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

    <b>Cv utilizado:</b>

    ${cv} J/(kg·K)

    </p>

    <p>

    <b>ΔT:</b>

    ${deltaT.toFixed(2)} K

    </p>

    <hr>

    <h2>

    ΔU =

    ${energia.toFixed(3)}

    ${unidad}

    </h2>

    <hr>

    <p>

    ${interpretacion}

    </p>

    `;

}
//====================================================
// ENERGÍA INTERNA USANDO Cp
//====================================================

function energiaInternaCp() {

    contenido.innerHTML = `

    <h2>🔥 Energía Interna usando Cp</h2>

    <hr>

    <h3>

    ¿Qué ocurre cuando solo se conoce Cp?

    </h3>

    <p>

    Para un gas ideal se utiliza la relación

    <b>Cv = Cp − R</b>

    para calcular primero el calor específico a volumen constante.

    </p>

    <hr>

    <h3>

    Ecuaciones

    </h3>

    <h2>

    Cv = Cp − R

    </h2>

    <h2>

    ΔU = m Cv (T₂ − T₁)

    </h2>

    <hr>

    <h3>

    Ingrese los datos

    </h3>

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

    <input

    id="masa"

    type="number">

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

    <input

    id="temperaturaInicial"

    type="number">

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

    <input

    id="temperaturaFinal"

    type="number">

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

    onclick="resolverEnergiaInternaCp()">

    Calcular

    </button>

    <button

    onclick="energiaInterna()">

    ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//====================================================
// RESOLVER ENERGÍA INTERNA CON Cp
//====================================================

function resolverEnergiaInternaCp() {

    //----------------------------------
    // Gas
    //----------------------------------

    const gas = GASES[

        document.getElementById("gas").value

    ];

    const cp = gas.Cp;

    const R = gas.R;

    const cv = cp - R;

    //----------------------------------
    // Datos
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

    let energia = masa * cv * deltaT;

    //----------------------------------
    // Conversión
    //----------------------------------

    let unidad =

        document.getElementById("unidadResultado").value;

    if (unidad == "kJ") {

        energia /= 1000;

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

    <b>Cp:</b>

    ${cp} J/(kg·K)

    </p>

    <p>

    <b>R:</b>

    ${R} J/(kg·K)

    </p>

    <p>

    <b>Cv calculado:</b>

    ${cv.toFixed(2)} J/(kg·K)

    </p>

    <hr>

    <h2>

    ΔU =

    ${energia.toFixed(3)}

    ${unidad}

    </h2>

    `;

}
//====================================================
// ENERGÍA INTERNA USANDO MOLES
//====================================================

function energiaInternaMoles() {

    contenido.innerHTML = `

    <h2>🧪 Energía Interna usando moles</h2>

    <hr>

    <p>

    Cuando la cantidad de sustancia está expresada
    en moles se utiliza la siguiente ecuación.

    </p>

    <h2>

    ΔU = n Cv (T₂ − T₁)

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

    <b>Número de moles</b>

    </label>

    <input

    id="moles"

    type="number">

    <br><br>

    <label>

    <b>Temperatura inicial</b>

    </label>

    <input

    id="temperaturaInicial"

    type="number">

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

    <input

    id="temperaturaFinal"

    type="number">

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

    onclick="resolverEnergiaInternaMoles()">

    Calcular

    </button>

    <button

    onclick="energiaInterna()">

    ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//====================================================
// RESOLVER ENERGÍA INTERNA CON MOLES
//====================================================

function resolverEnergiaInternaMoles() {

    //----------------------------------
    // Gas
    //----------------------------------

    const gas = GASES[

        document.getElementById("gas").value

    ];

    //----------------------------------
    // Cv molar
    //----------------------------------

    const cv =

        gas.Cv * gas.masaMolar / 1000;

    //----------------------------------
    // Datos
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

    let energia =

        n *

        cv *

        deltaT;

    //----------------------------------
    // Conversión
    //----------------------------------

    let unidad =

        document.getElementById("unidadResultado").value;

    if (unidad == "kJ") {

        energia /= 1000;

    }

    //----------------------------------
    // Mostrar
    //----------------------------------

    document.getElementById("resultado").innerHTML = `

    <hr>

    <h2>Resultado</h2>

    <p>

    <b>Gas:</b>

    ${gas.nombre}

    </p>

    <p>

    <b>Cv molar:</b>

    ${cv.toFixed(2)}

    J/(mol·K)

    </p>

    <p>

    <b>ΔT:</b>

    ${deltaT.toFixed(2)}

    K

    </p>

    <hr>

    <h2>

    ΔU =

    ${energia.toFixed(3)}

    ${unidad}

    </h2>

    `;

}
//====================================================
// RELACIÓN ENTRE Cp Y Cv
//====================================================

function relacionCpCv() {

    contenido.innerHTML = `

    <h2>📖 Relación entre Cp y Cv</h2>

    <hr>

    <p>

    Para un gas ideal se cumple:

    </p>

    <h2>

    Cp − Cv = R

    </h2>

    <hr>

    <p>

    Seleccione el dato que desea calcular.

    </p>

    <select id="opcion">

        <option value="cp">

        Calcular Cp

        </option>

        <option value="cv">

        Calcular Cv

        </option>

        <option value="r">

        Calcular R

        </option>

    </select>

    <br><br>

    <label>

    <b>Cp</b>

    </label>

    <input id="cp" type="number">

    <br><br>

    <label>

    <b>Cv</b>

    </label>

    <input id="cv" type="number">

    <br><br>

    <label>

    <b>R</b>

    </label>

    <input id="r" type="number">

    <br><br>

    <button

    onclick="resolverRelacionCpCv()">

    Calcular

    </button>

    <button

    onclick="energiaInterna()">

    ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//====================================================
// RESOLVER RELACIÓN Cp Y Cv
//====================================================

function resolverRelacionCpCv() {

    let opcion =

        document.getElementById("opcion").value;

    let cp = parseFloat(

        document.getElementById("cp").value

    );

    let cv = parseFloat(

        document.getElementById("cv").value

    );

    let R = parseFloat(

        document.getElementById("r").value

    );

    let resultado;

    let texto = "";

    //----------------------------------
    // Calcular Cp
    //----------------------------------

    if (opcion == "cp") {

        if (isNaN(cv) || isNaN(R)) {

            alert("Ingrese Cv y R.");

            return;

        }

        resultado = cv + R;

        texto = "Cp";

    }

    //----------------------------------
    // Calcular Cv
    //----------------------------------

    else if (opcion == "cv") {

        if (isNaN(cp) || isNaN(R)) {

            alert("Ingrese Cp y R.");

            return;

        }

        resultado = cp - R;

        texto = "Cv";

    }

    //----------------------------------
    // Calcular R
    //----------------------------------

    else {

        if (isNaN(cp) || isNaN(cv)) {

            alert("Ingrese Cp y Cv.");

            return;

        }

        resultado = cp - cv;

        texto = "R";

    }

    //----------------------------------
    // Resultado
    //----------------------------------

    document.getElementById("resultado").innerHTML = `

    <hr>

    <h2>Resultado</h2>

    <h2>

    ${texto} =

    ${resultado.toFixed(3)}

    J/(kg·K)

    </h2>

    `;

}