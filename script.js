window.addEventListener('load', function() {
    on.style.color = "red";
});

let pantalla = document.querySelector("#valorPantalla");
let contenedorPantalla = document.querySelector("#pantalla");
let botones = document.querySelectorAll("button");  // agarra todos los botones de html a Js
for (let i = 0; i < botones.length; i++) {  // Un evento a cada boton para que clickear se ejecuta la funcion "logica"
    botones[i].addEventListener("click", logica);
}

// operaciones
function operaciones(a, operador, b) {
    switch (operador) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            if (b === 0) {
                return "No se puede!!";
            }
            return a / b;
    }
}


let numeros1 = 0;
let numeros2 = 0;
let operador = "";
let puntoDecimalIngresado = false; 
let resultado = 0;

// opera
function logica() {
    let valor = this.innerText; //agarra el valor del boton

    if (valor === "Reset") {
        reset();
        return;
    }

    if (operador === "") {  // Si no hay operador, primera parte

        if (!isNaN(valor) || valor === ".") {  // No poner varios puntos...

            if (valor === "." && puntoDecimalIngresado) {  // Si ya hay un punto, no hace nada
                return;     }
            
            if (valor === ".") {  // punto una vez...
                puntoDecimalIngresado = true;   }

            if (pantalla.innerText === "0" && valor !== ".") {  // primer numero
                pantalla.innerText = valor;
            } else {  
                pantalla.innerText += valor;        }

        } else if (valor !== "Enter") {  // solo operadores...
            
            numeros1 = parseFloat(pantalla.innerText);  // guarda la primer parte
            operador = valor;  
            pantalla.innerText += ` ${operador} `;  
            puntoDecimalIngresado = false;  // Resetea el punto
        }

    } else {  // Si hay un operador... segunda parte

        if (!isNaN(valor) || valor === ".") {  // 

            if (valor === "." && puntoDecimalIngresado) {  
                return;     
            }

            if (valor === ".") {  
                puntoDecimalIngresado = true;       
            }

            pantalla.innerText += valor;  

        } else if (valor === "Enter") { 

            numeros2 = parseFloat(pantalla.innerText.split(operador)[1]);  //segundo numero

            resultado = operaciones(numeros1, operador, numeros2);  // opercion

            pantalla.innerText = `${numeros1} ${operador} ${numeros2} = ${resultado}`;

            //para seguir operando si se quita, aparece la operacion
            numeros1 = resultado;  //resutado a primer numero
            operador = ""; 
            puntoDecimalIngresado = false;  
            pantalla.innerText = numeros1
        }
    }
}

// Función para resetear
function reset() {
    pantalla.innerText = "0";
    numeros1 = 0;
    numeros2 = 0;
    operador = "";
    puntoDecimalIngresado = false; 
}

//  botón ON/OFF
const botonOnOff = document.getElementById('onOff');
const on = document.getElementById('on');
const off = document.getElementById('off');
let prendido = false;

function color() {
    if (prendido) {
        botonOnOff.style.background = 'linear-gradient(to right, rgba(0, 255, 0) 0%, rgba(0, 255, 0) 100%)';
        on.style.color = "black";
        off.style.color = "rgba(0, 255, 0)";
        reset();
        contenedorPantalla.style.backgroundColor = "beige";
    } else {
        botonOnOff.style.background = 'linear-gradient(to right, red 0%, red 100%)';
        on.style.color = "red";
        off.style.color = "black";
        reset();
        contenedorPantalla.style.backgroundColor = "black";
    }
}

botonOnOff.addEventListener('click', function() {
    prendido = !prendido;
    color();
});

// luz / noche
let dia = document.querySelector("#mode");
let caja = document.querySelector("#contenedor");
let noche = false;

dia.addEventListener('click', function() {
   noche = !noche;
   cambio();
});

function cambio() {
    if (noche) {
       dia.innerText = "Noche!";
       caja.style.backgroundColor = "var(--dia)";
       dia.style.backgroundColor = "rgb(170, 170, 0)";
    } else {
        dia.innerText = "Luz!";
        caja.style.backgroundColor = "var(--noche)";
        dia.style.backgroundColor = "yellow";
    }
}

