class Tarea {
    constructor(descripcion) {
        this.descripcion = descripcion;
        this.completada = false;
        this.fechaCreacion = new Date().toLocaleString();
        this.fechaCompletada = null;
    }
}

let listaTareas = []






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
        let textoIngresado = document.getElementById("ingreso").value
        let tarea = new Tarea(textoIngresado)
        listaTareas.unshift(tarea)
        localStorage.setItem(tarea.fechaCreacion, tarea.descripcion)
    }

    MostrarTareas()
    

}


function MostrarTareas()
{
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    for (const key in tareas) {

    }
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