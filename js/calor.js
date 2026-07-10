console.log("calor.js cargado");

//========================================
// CALOR SENSIBLE
//========================================

function calorSensible() {

    contenido.innerHTML = `

    <h2>🔥 Calor Sensible</h2>

    <hr>

    <h3>📖 ¿Qué es el calor sensible?</h3>

    <p>

    El calor sensible es la energía transferida a un cuerpo
    que produce un cambio de temperatura sin modificar su estado físico.

    </p>

    <hr>

    <h3>📐 Ecuación</h3>

    <h2>

    Q = m Cp (T₂ − T₁)

    </h2>

    <hr>

    <h3>📚 Variables</h3>

    <table style="width:100%;border-collapse:collapse;">

        <tr>

            <th align="left">Variable</th>

            <th align="left">Descripción</th>

            <th align="left">Unidad SI</th>

        </tr>

        <tr>

            <td>Q</td>

            <td>Calor</td>

            <td>J</td>

        </tr>

        <tr>

            <td>m</td>

            <td>Masa</td>

            <td>kg</td>

        </tr>

        <tr>

            <td>Cp</td>

            <td>Calor específico</td>

            <td>J/(kg·K)</td>

        </tr>

        <tr>

            <td>T₁</td>

            <td>Temperatura inicial</td>

            <td>K</td>

        </tr>

        <tr>

            <td>T₂</td>

            <td>Temperatura final</td>

            <td>K</td>

        </tr>

    </table>

    <hr>

    <h3>Valores típicos de Cp</h3>

    <ul>

        <li>Agua → 4186 J/(kg·K)</li>

        <li>Aire → 1005 J/(kg·K)</li>

        <li>Aluminio → 900 J/(kg·K)</li>

        <li>Hierro → 450 J/(kg·K)</li>

    </ul>

    <hr>

    <hr>

<h3>Ingrese los datos</h3>

<label><b>Masa</b></label>

<input id="masa" type="number">

<select id="unidadMasa">

    <option value="kg">kg</option>

    <option value="g">g</option>

</select>

<br><br>

<label><b>Tipo de calor específico</b></label>

<select id="tipoCalor">

    <option value="Cp">

        Cp (Presión constante)

    </option>

    <option value="Cv">

        Cv (Volumen constante)

    </option>

</select>

<br><br>

<label><b>Valor del calor específico</b></label>

<input id="cp" type="number">

<select id="unidadCp">

    <option value="J">

        J/(kg·K)

    </option>

    <option value="kJ">

        kJ/(kg·K)

    </option>

</select>

<br><br>

<label><b>Temperatura inicial</b></label>

<input id="temperaturaInicial" type="number">

<select id="unidadTemperatura">

    <option value="°C">°C</option>

    <option value="K">K</option>

</select>

<br><br>

<label><b>Temperatura final</b></label>

<input id="temperaturaFinal" type="number">

<select id="unidadTemperaturaFinal">

    <option value="°C">°C</option>

    <option value="K">K</option>

</select>

<br><br>

<label><b>Unidad del resultado</b></label>

<select id="unidadResultado">

    <option value="J">J</option>

    <option value="kJ">kJ</option>

</select>

<br><br>

<button onclick="calcularCalorSensible()">

Calcular

</button>

<button onclick="calor()">

Volver

</button>

<br><br>

<div id="resultado"></div>

    `;

}

//========================================
// CALCULAR CALOR SENSIBLE
//========================================

function calcularCalorSensible() {

    //----------------------------------
    // Lectura
    //----------------------------------

    let masa = parseFloat(document.getElementById("masa").value);

    let cp = parseFloat(document.getElementById("cp").value);

    let t1 = parseFloat(document.getElementById("temperaturaInicial").value);

    let t2 = parseFloat(document.getElementById("temperaturaFinal").value);

    let tipoCalor = document.getElementById("tipoCalor").value;

    let unidadMasa = document.getElementById("unidadMasa").value;

    let unidadCp = document.getElementById("unidadCp").value;

    let unidadTemperatura = document.getElementById("unidadTemperatura").value;

    let unidadTemperaturaFinal = document.getElementById("unidadTemperaturaFinal").value;

    let unidadResultado = document.getElementById("unidadResultado").value;

    //----------------------------------
    // Validación
    //----------------------------------

    if (

        isNaN(masa) ||

        isNaN(cp) ||

        isNaN(t1) ||

        isNaN(t2)

    ) {

        alert("Debe ingresar todos los datos.");

        return;

    }

    //----------------------------------
    // Conversión de masa
    //----------------------------------

    if (unidadMasa == "g") {

        masa = masa / 1000;

    }

    //----------------------------------
    // Conversión de Cp
    //----------------------------------

    if (unidadCp == "kJ") {

        cp = cp * 1000;

    }

    //----------------------------------
    // Conversión de temperatura
    //----------------------------------

    t1 = temperaturaAK(

        t1,

        unidadTemperatura

    );

    t2 = temperaturaAK(

        t2,

        unidadTemperaturaFinal

    );

    //----------------------------------
    // Cálculo
    //----------------------------------

    const deltaT =

        t2 - t1;

    const calorJ =

        masa *

        cp *

        deltaT;

    //----------------------------------
    // Conversión del resultado
    //----------------------------------

    let calorFinal = calorJ;

    if (unidadResultado == "kJ") {

        calorFinal = calorJ / 1000;

    }

    //----------------------------------
    // Interpretación
    //----------------------------------

    let conclusion = "";

    if (deltaT > 0) {

        conclusion =

            "El sistema absorbió calor y aumentó su temperatura.";

    }

    else if (deltaT < 0) {

        conclusion =

            "El sistema cedió calor y disminuyó su temperatura.";

    }

    else {

        conclusion =

            "No hubo cambio de temperatura.";

    }

    //----------------------------------
    // Mostrar resultado
    //----------------------------------

    document.getElementById("resultado").innerHTML = `

        <hr>

        <h2>Resultado</h2>

        <h3>

        ${tipoCalor}

        </h3>

        <p>

        Q = m C ΔT

        </p>

        <hr>

        <p>

        Masa = ${masa.toFixed(4)} kg

        </p>

        <p>

        Calor específico = ${cp.toFixed(2)} J/(kg·K)

        </p>

        <p>

        ΔT = ${deltaT.toFixed(2)} K

        </p>

        <hr>

        <p>

        Q =

        ${masa.toFixed(4)}

        ×

        ${cp.toFixed(2)}

        ×

        ${deltaT.toFixed(2)}

        </p>

        <hr>

        <h2>

        ${calorFinal.toFixed(3)}

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
// CALOR LATENTE
//========================================

function calorLatente() {

    contenido.innerHTML = `

    <h2>❄ Calor Latente</h2>

    <hr>

    <h3>📖 ¿Qué es el calor latente?</h3>

    <p>

    El calor latente es la energía que absorbe o libera una sustancia
    durante un cambio de fase sin que exista variación de temperatura.

    </p>

    <hr>

    <h3>📐 Ecuación</h3>

    <h2>

    Q = m L

    </h2>

    <hr>

    <h3>📚 Variables</h3>

    <table style="width:100%;border-collapse:collapse;">

        <tr>

            <th align="left">Variable</th>

            <th align="left">Descripción</th>

            <th align="left">Unidad SI</th>

        </tr>

        <tr>

            <td>Q</td>

            <td>Calor</td>

            <td>J</td>

        </tr>

        <tr>

            <td>m</td>

            <td>Masa</td>

            <td>kg</td>

        </tr>

        <tr>

            <td>L</td>

            <td>Calor latente</td>

            <td>J/kg</td>

        </tr>

    </table>

    <hr>

    <h3>Valores típicos</h3>

    <ul>

        <li>Agua (Fusión): 334 kJ/kg</li>

        <li>Agua (Vaporización): 2257 kJ/kg</li>

        <li>Alcohol (Vaporización): 841 kJ/kg</li>

    </ul>

    <hr>

    <h3>Ingrese los datos</h3>

    <label><b>Masa</b></label>

    <input id="masa" type="number">

    <select id="unidadMasa">

        <option value="kg">kg</option>

        <option value="g">g</option>

    </select>

    <br><br>

    <label><b>Calor Latente (L)</b></label>

    <input id="latente" type="number">

    <select id="unidadLatente">

        <option value="J">J/kg</option>

        <option value="kJ">kJ/kg</option>

    </select>

    <br><br>

    <label><b>Unidad del resultado</b></label>

    <select id="unidadResultado">

        <option value="J">J</option>

        <option value="kJ">kJ</option>

    </select>

    <br><br>

    <button onclick="calcularCalorLatente()">

        Calcular

    </button>

    <button onclick="calor()">

        Volver

    </button>

    <br><br>

    <div id="resultado"></div>

    `;

}