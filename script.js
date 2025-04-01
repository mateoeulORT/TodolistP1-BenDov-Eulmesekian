class Tarea {
    constructor(descripcion) {
        this.descripcion = descripcion;
        this.completada = false;
        this.fechaCreacion = new Date().toLocaleString();
        this.fechaCompletada = null;
    }
}

let listaTareas = []


//iguala la lista a los valores del local storage
for (let i = 0; i < localStorage.length; i++) {
    //obtiene la key
    let keyFecha = localStorage.key(i)
    //despues agarra el string con esa key
    let stringObtenido = localStorage.getItem(keyFecha)
    //hace el objeto
    let objetoTarea = JSON.parse(stringObtenido)
    listaTareas.push(objetoTarea)   
}

MostrarTareas(listaTareas)




//verificar agregar tarea
function Formulario(){

    if (ValidarVacio()) {
        event.preventDefault();
        let input = document.getElementById("ingreso")
        input.style.borderColor = "red"
        setTimeout(() => {input.style.borderColor = ""}, 2000)
    } 
    else
    {
        event.preventDefault();
        let textoIngresado = document.getElementById("ingreso").value
        let tarea = new Tarea(textoIngresado)
        listaTareas.push(tarea)
        localStorage.setItem(tarea.fechaCreacion, JSON.stringify(tarea))
        AgregarTareaNueva(listaTareas)
    }    

}


function MostrarTareas(lista)
{   

    for (const tareañ of lista) {

        const tareaf = localStorage.getItem(tareañ.fechaCreacion)
        const objetoTarea = JSON.parse(tareaf)
        document.getElementById("lista").innerHTML += `<div class="tarea"> <div> <input type="checkbox"> <p> ${objetoTarea.descripcion} </p> </div> <p> ${objetoTarea.fechaCreacion} </p> <button class="eliminar"> <i class="fas fa-trash"></i> </button> </div>`
    }
    
}

function AgregarTareaNueva(lista)
{
    document.getElementById("lista").style.display = "block"
    document.getElementById("agregrar-tarea").style.display = "none"

    let tareaNueva = lista[lista.length - 1]
    document.getElementById("lista").innerHTML += `<div class="tarea"> <div> <input type="checkbox"> <p> ${tareaNueva.descripcion} </p> </div> <p> ${tareaNueva.fechaCreacion} </p> <button class="eliminar"> <i class="fas fa-trash"></i> </button> </div>`
}



function ValidarVacio()
{
    let ingreso = document.getElementById('ingreso').value
    if (ingreso == "") {
       return true 
    } else{
        return false
    }

}


//navegar
function VentanaTarea()
{
    document.getElementById("lista").style.display = "none"
    document.getElementById("agregrar-tarea").style.display = "block"
}
function Home(){
    document.getElementById("lista").style.display = "block"
    document.getElementById("agregrar-tarea").style.display = "none"
}