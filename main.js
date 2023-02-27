const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const fecha = document.getElementById("fecha");
const asunto = document.getElementById("asunto")
const mensaje = document.getElementById("mensaje")


class Carta {
    constructor( nombre, apellido, fecha, asunto, mensaje,id){
        this.nombre = nombre; 
        this.apellido = apellido;
        this.fecha = fecha; 
        this.asunto = asunto;
        this.mensaje = mensaje;
        this.id = Date.now()
    }
}


let agregarAgenda = [];
eventListener();
if(localStorage.getItem("agregarAgenda")){
    agregarAgenda = JSON.parse(localStorage.getItem("agregarAgenda"));
}

const agenda = document.getElementById("agenda");
const nuevaAgenda = document.getElementById("nuevaAgenda")
function eventListener(){
    document.addEventListener('DOMContentLoaded', () =>{
    agregarAgenda=JSON.parse(localStorage.getItem("agregarAgenda")) || [];
    console.log(agregarAgenda)
    crearHtml(); 
})} 
agenda.addEventListener("submit",(e)=>{      
e.preventDefault();  
    const carta = new Carta(nombre.value , apellido.value, fecha.value, asunto.value, mensaje.value);        
    if(nombre.value ===""&& apellido.value ===""&& fecha.value === "" && asunto.value === ""){
        (e);
    }else{agregarAgenda.push(carta)} 
    crearHtml();
    agenda.reset();
    
})

function crearHtml(){
    limpiarHTML();
    agregarAgenda.forEach(carta =>{          
        const card = document.createElement("div");
        card.classList.add("nuevaAgenda", "p-3");
        card.innerHTML=`<div class="card">
                        <p>Nombre: ${carta.nombre}</p>
                        <p>Apellido: ${carta.apellido}</p>
                        <p>Fecha: ${carta.fecha}</p>
                        <p>Asunto: ${carta.asunto}</p>
                        <p>Mensaje: ${carta.mensaje}</p>
                        <button class = "btn colorBoton" id="boton${carta.id}" > eliminar </button>
                        </div>`
        nuevaAgenda.appendChild(card);   
        const boton = document.getElementById(`boton${carta.id}`);
        boton.addEventListener("click", () => {
        eliminarCarta(carta.id);
        })    
        localStorage.setItem("agregarAgenda", JSON.stringify(agregarAgenda))
})}

const eliminarCarta = (id) => {
    const nuevaCarta = agregarAgenda.find(carta => carta.id === id);
    const indice = agregarAgenda.indexOf(nuevaCarta);
    agregarAgenda.splice(indice, 1);
    crearHtml();
    localStorage.setItem("agregarAgenda", JSON.stringify(agregarAgenda));
}


function limpiarHTML(){
    while(nuevaAgenda.firstChild){
        nuevaAgenda.removeChild(nuevaAgenda.firstChild);
    }
}

const vaciarAgenda = document.getElementById("vaciarAgenda");

vaciarAgenda.addEventListener("click", () => {
    eliminarTodaAgenda();
})

const eliminarTodaAgenda = () => {
    agregarAgenda = []; 
    crearHtml();
    localStorage.clear();
}




