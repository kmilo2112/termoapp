// js/conceptos.js
console.log("conceptos.js cargado");

//========================================
// BASE DE DATOS TEÓRICA (GLOSARIO)
//========================================
const glosarioTermo = {
    "Gas Ideal": {
        definicion: "Un gas ideal es un modelo teórico de gas cuyas moléculas se consideran partículas puntuales, de volumen despreciable y sin fuerzas de atracción o repulsión intermoleculares. Su comportamiento se describe mediante la ecuación de estado.",
        conceptos: {
            "Presión": { def: "La presión es una propiedad intensiva que representa la fuerza normal ejercida por un fluido sobre una superficie por unidad de área." },
            "Volumen": { def: "El volumen es una propiedad extensiva que corresponde al espacio ocupado por un sistema o sustancia." },
            "Temperatura": { def: "La temperatura es una propiedad intensiva que indica el estado térmico de un sistema y determina el sentido en el que ocurre la transferencia de calor entre dos cuerpos en contacto." },
            "Número de moles": { def: "El número de moles es la cantidad de sustancia presente en un sistema, expresada en moles." },
            "Trabajo": {
                def: "El trabajo es una forma de transferencia de energía entre un sistema y sus alrededores, asociada a la acción de una fuerza que produce un desplazamiento o a un cambio en el volumen del sistema.",
                subtemas: {
                    "Trabajo Isobárico": "Es el trabajo realizado durante un proceso en el que la presión del sistema permanece constante durante toda la transformación.",
                    "Trabajo Isocórico": "Es el trabajo realizado durante un proceso a volumen constante. Debido a que no existe cambio de volumen, el trabajo de frontera es igual a cero.",
                    "Trabajo Isotérmico": "Es el trabajo realizado durante un proceso en el cual la temperatura del sistema permanece constante.",
                    "Trabajo Adiabático": "Es el trabajo realizado durante un proceso en el que no existe transferencia de calor entre el sistema y los alrededores.",
                    "Trabajo Politrópico": "Es el trabajo asociado a un proceso que satisface la relación PV^n=constante, donde el exponente politrópico caracteriza el comportamiento del proceso."
                }
            },
            "Calor": {
                def: "El calor es la energía que se transfiere entre un sistema y sus alrededores exclusivamente como consecuencia de una diferencia de temperatura.",
                subtemas: {
                    "Calor Sensible": "Es la cantidad de energía transferida en forma de calor que produce un cambio en la temperatura de una sustancia sin modificar su estado de agregación.",
                    "Calor Latente": "Es la cantidad de energía transferida en forma de calor durante un cambio de fase, sin que ocurra variación de la temperatura.",
                    "Primera Ley": "La Primera Ley de la Termodinámica establece que la energía se conserva; por tanto, la variación de la energía total de un sistema es igual a la diferencia entre la energía transferida al sistema en forma de calor y la energía transferida por el sistema en forma de trabajo."
                }
            },
            "Energía interna": { def: "La energía interna es una propiedad termodinámica que representa la energía total almacenada en un sistema como resultado del movimiento, interacción y configuración de sus partículas." },
            "Entalpía": { def: "La entalpía es una propiedad termodinámica definida como la suma de la energía interna de un sistema y el producto de su presión por su volumen, utilizada para analizar procesos que ocurren a presión constante." },
            "Entropía": { def: "La entropía es una propiedad termodinámica que cuantifica el grado de dispersión de la energía de un sistema y constituye un criterio para establecer la dirección natural de los procesos." },
            "Energía libre de Gibbs": { def: "La energía libre de Gibbs es un potencial termodinámico que representa la máxima cantidad de energía disponible para realizar trabajo útil distinto del trabajo de expansión cuando un proceso ocurre a temperatura y presión constantes." }
        }
    },
    "Gas Real": {
        definicion: "Los gases reales son aquellos cuyas moléculas poseen volumen propio y experimentan fuerzas intermoleculares, por lo que su comportamiento se desvía del predicho por el modelo de gas ideal.",
        conceptos: {
            "Ecuación de Van der Waals": { def: "La ecuación de Van der Waals es una ecuación de estado para gases reales que incorpora correcciones al volumen molecular y a las fuerzas de atracción intermoleculares, permitiendo describir con mayor precisión su comportamiento." },
            "Ecuación Virial": { def: "La ecuación virial es una ecuación de estado que representa el comportamiento de un gas real mediante una expansión en serie cuyos coeficientes reflejan las interacciones entre las moléculas." },
            "Factor de compresibilidad": { def: "El factor de compresibilidad es una propiedad adimensional que mide la desviación del comportamiento de un gas real respecto al comportamiento ideal, expresando la relación entre el volumen real y el volumen predicho por la ley de los gases ideales." }
        }
    },
    "Antoine": {
        definicion: "La ecuación de Antoine es una correlación empírica que relaciona la presión de vapor de una sustancia pura con su temperatura dentro de un intervalo específico de aplicación.",
        conceptos: {
            "Presión de vapor": { def: "La presión de vapor es la presión ejercida por el vapor de una sustancia cuando se encuentra en equilibrio termodinámico con su fase líquida o sólida a una temperatura determinada." },
            "Temperatura de saturación": { def: "La temperatura de saturación es la temperatura a la cual una sustancia pura cambia de fase entre líquido y vapor para una presión dada, manteniéndose el equilibrio entre ambas fases." }
        }
    }
};

//========================================
// MOTOR DE NAVEGACIÓN TEÓRICA
//========================================

function pantallaConceptos() {
    const contenido = document.getElementById("contenido");
    let html = `
        <h2>📖 Conceptos Teóricos</h2>
        <p>Selecciona una categoría para ver sus definiciones.</p>
        <hr>
        <div class="lista">
    `;
    
    for (const categoria in glosarioTermo) {
        html += `<div class="item" onclick="mostrarCategoriaTeoria('${categoria}')"><b>📘 ${categoria}</b></div>`;
    }
    
    html += `
        </div>
        <br>
        <button onclick="inicio()">← Volver al Menú Principal</button>
    `;
    contenido.innerHTML = html;
}

function mostrarCategoriaTeoria(categoria) {
    const data = glosarioTermo[categoria];
    const contenido = document.getElementById("contenido");
    
    let html = `
        <h2>${categoria}</h2>
        <p style="text-align: justify; line-height: 1.5; color: #444; font-size: 0.95em;"><i>"${data.definicion}"</i></p>
        <hr style="border: 1px solid #ddd; margin: 15px 0;">
        <div class="lista">
    `;

    for (const concepto in data.conceptos) {
        html += `<div class="item" onclick="mostrarLecturaConcepto('${categoria}', '${concepto}')">📄 <b>${concepto}</b></div>`;
    }

    html += `
        </div>
        <br>
        <button onclick="pantallaConceptos()">← Volver a Categorías</button>
    `;
    contenido.innerHTML = html;
}

function mostrarLecturaConcepto(categoria, concepto) {
    const dataConcepto = glosarioTermo[categoria].conceptos[concepto];
    const contenido = document.getElementById("contenido");
    
    let html = `
        <h2>${concepto}</h2>
        <p style="text-align: justify; line-height: 1.6; color: #333; font-size: 1.05em;">${dataConcepto.def}</p>
    `;

    if (dataConcepto.subtemas) {
        html += `<hr style="border: 1px dashed #ccc; margin: 15px 0;">`;
        html += `<h3 style="color: #2c3e50; margin-bottom: 10px;">Tipos de ${concepto}:</h3>`;
        html += `<ul style="text-align: justify; line-height: 1.6; color: #444; padding-left: 20px;">`;
        
        for (const subtema in dataConcepto.subtemas) {
            html += `<li style="margin-bottom: 10px;"><b>${subtema}:</b> ${dataConcepto.subtemas[subtema]}</li>`;
        }
        
        html += `</ul>`;
    }

    html += `
        <br>
        <hr style="border: 1px solid #ddd; margin: 15px 0;">
        <button onclick="mostrarCategoriaTeoria('${categoria}')">← Volver a ${categoria}</button>
    `;
    
    contenido.innerHTML = html;
}