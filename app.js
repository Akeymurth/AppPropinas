//crearemos dos variables globales, en la programacion profeccional no esta bien crear variables globales, pero en este caso esta bien
const orden = [];
const platos = [
    {
        id:1,nombre:"Pollo Asado", precio:50
    },
    {
        id:2,nombre:"Papas fritas", precio:20
    },
    {
        id:3, nombre: "Enchiladas suizas", precio:60 
    },
    {
        id:4, nombre: "Hot dog", precio:30 
    },
    {
        id:5, nombre: "Refresco", precio:15 
    },

];

//estos los obtenesmos del html atravez del javascrip
const elementosDelDOM = (function(){
    //aqui usamos los id de html para traer a cada uno
    const divDeComidas = document.getElementById("comidas")
    const divDeOrdenes = document.getElementById("ordenes_agregadas")
    const totalDeComida = document.getElementById("precio_total")
    const propinaSugerida = document.getElementById("propina_sugerida")
    const divDePlatos = document.getElementById("platos")
    //esto no sirev de nada si no devovelmos los elementos mediante un return
    return{
        divDeComidas, 
        divDeOrdenes, 
        totalDeComida, 
        propinaSugerida, 
        divDePlatos,
    };
})();

const funcionesDePantalla = (function(){
    const transformarAEtiquetas = (objeto) => 
        `<div className="carta_de_comida">
            <div className="cabeza_de_carta"><h3>${objeto.nombre} </h3></div>
            <div class="pie_de_carta">$${objeto.precio}</div>
            <button id="agregar_a_orden">Agregar</button>
        </div>`;
    const mostrarEnPantalla = (div) => (string) => {
        div.innerHTML = "";
        div.innerHTML = string;
    };
    //acc = acumulador
    const reducirEtiquetas = (acc,item) => `${acc+item}`;

    const modificarArray = fn => div => array => {
        if(array.length === 0) return
        const stringDeEtiquetas = array.map(fn).reduce(reducirEtiquetas)
        mostrarEnPantalla(div)(stringDeEtiquetas);
    };

    const transformarEtiquetasDeOrden = (objeto) => 
        `<div className= "carta_de_ordenes">
            <h3>${objeto.nombre} $${objeto.precio}</h3>
        </div>`; 

    const modificarArrayDePlatos = modificarArray(transformarAEtiquetas)
    const modificarArrayDeOrdenes = modificarArray(transformarEtiquetasDeOrden)

    return{
        modificarArrayDeOrdenes,
        modificarArrayDePlatos,
        mostrarEnPantalla,
    }
})();

const {
    divDeComidas, 
    divDeOrdenes, 
    totalDeComida, 
    propinaSugerida, 
    divDePlatos,
}= elementosDelDOM;

const agregarAOrden = (item) => (array) =>{
    array.push(item);
};

const encontrarPlato = (nombre)=>
platos.find((item)=>item.nombre === nombre);

const sumarTotalDeComida = (array) => array.reduce((acc,item)=>acc+parseInt(item.precio),0);
const obtenerPropina = (porcentaje) =>(valor) =>(valor*porcentaje)/100;
const obtener10 = obtenerPropina(10);
const obtener20 = obtenerPropina(20);
const obtener45 = obtenerPropina(45);


const manejarElClick = (e) => {
    if(e.target.id === "agregar_a_orden"){
        const nombreDelPlato = 
        e.target.parentElement.childNodes[1].innerText;
        agregarAOrden(encontrarPlato(nombreDelPlato))(orden);
        funcionesDePantalla.modificarArrayDeOrdenes(divDeOrdenes)(orden);
        funcionesDePantalla.mostrarEnPantalla(totalDeComida)(
        sumarTotalDeComida(orden));
    };
    funcionesDePantalla.mostrarEnPantalla(propinaSugerida)(obtener10(sumarTotalDeComida(orden)));
};

divDePlatos.onclick = manejarElClick;
funcionesDePantalla.modificarArrayDePlatos(divDeComidas)(platos);