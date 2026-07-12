console.log("gibbs.js cargado");

//====================================================
// ENERGÍA LIBRE DE GIBBS
//====================================================
//
// ΔG = ΔH − TΔS
//
//====================================================


//====================================================
// MENÚ
//====================================================

function gibbs() {

    contenido.innerHTML = `

    <h2>

    ⚖️ Energía Libre de Gibbs

    </h2>

    <hr>

    <p>

    Seleccione el método de cálculo.

    </p>

    <div class="lista">

        <div class="item"

        onclick="gibbsBasico()">

            ⚖️ ΔG = ΔH − TΔS

            <br>

            <small>

            Energía libre

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
// GIBBS BÁSICO
//====================================================

function gibbsBasico() {

    contenido.innerHTML = `

    <h2>

    ⚖️ Energía Libre de Gibbs

    </h2>

    <hr>

    <p>

    La energía libre de Gibbs permite determinar
    si un proceso es espontáneo.

    </p>

    <h2>

    ΔG = ΔH − TΔS

    </h2>

    <hr>

    <label>

    <b>ΔH</b>

    </label>

    <input
        id="entalpia"
        type="number">

    <select id="unidadEntalpia">

        <option value="kJ">

        kJ

        </option>

        <option value="J">

        J

        </option>

    </select>

    <br><br>

    <label>

    <b>Temperatura</b>

    </label>

    <input
        id="temperatura"
        type="number">

    <select id="unidadTemperatura">

        <option value="K">

        K

        </option>

        <option value="°C">

        °C

        </option>

    </select>

    <br><br>

    <label>

    <b>ΔS</b>

    </label>

    <input
        id="entropia"
        type="number">

    <select id="unidadEntropia">

        <option value="kJ">

        kJ/K

        </option>

        <option value="J">

        J/K

        </option>

    </select>

    <br><br>

    <label>

    <b>Resultado</b>

    </label>

    <select id="unidadResultado">

        <option value="kJ">

        kJ

        </option>

        <option value="J">

        J

        </option>

    </select>

    <br><br>

    <button
        onclick="resolverGibbs()">

        Calcular

    </button>

    <button
        onclick="gibbs()">

        ← Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}
//====================================================
// RESOLVER GIBBS
//====================================================

function resolverGibbs() {

    let h = parseFloat(

        document.getElementById("entalpia").value

    );

    let t = parseFloat(

        document.getElementById("temperatura").value

    );

    let s = parseFloat(

        document.getElementById("entropia").value

    );

    if (

        isNaN(h) ||

        isNaN(t) ||

        isNaN(s)

    ) {

        alert("Ingrese todos los datos.");

        return;

    }

    //----------------------------------
    // Conversión temperatura
    //----------------------------------

    t = temperaturaAK(

        t,

        document.getElementById("unidadTemperatura").value

    );

    //----------------------------------
    // Conversión de unidades
    //----------------------------------

    if (

        document.getElementById("unidadEntalpia").value == "J"

    ) {

        h /= 1000;

    }

    if (

        document.getElementById("unidadEntropia").value == "J"

    ) {

        s /= 1000;

    }

    //----------------------------------
    // Cálculo
    //----------------------------------

    let g =

        h -

        t * s;

    //----------------------------------
    // Conversión resultado
    //----------------------------------

    let unidad =

        document.getElementById("unidadResultado").value;

    if (unidad == "J") {

        g *= 1000;

    }

    //----------------------------------
    // Interpretación
    //----------------------------------

    let mensaje = "";

    if (g < 0) {

        mensaje = "El proceso es espontáneo.";

    }

    else if (g > 0) {

        mensaje = "El proceso no es espontáneo.";

    }

    else {

        mensaje = "El sistema se encuentra en equilibrio.";

    }

    //----------------------------------
    // Mostrar
    //----------------------------------

    document.getElementById("resultado").innerHTML = `

    <hr>

    <h2>

    Resultado

    </h2>

    <hr>

    <p>

    ΔG = ΔH − TΔS

    </p>

    <p>

    ΔG =

    ${h.toFixed(3)}

    −

    (

    ${t.toFixed(2)}

    ×

    ${s.toFixed(3)}

    )

    </p>

    <hr>

    <h2>

    ΔG =

    ${g.toFixed(3)}

    ${unidad}

    </h2>

    <hr>

    <p>

    ${mensaje}

    </p>

    `;

}