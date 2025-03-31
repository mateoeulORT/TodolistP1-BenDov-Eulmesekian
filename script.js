const tarea = new Object()
tarea.descripcion
tarea.fecha
tarea.completada

function VentanaTarea()
{
    document.getElementById("lista").style.display = "none"
    document.getElementById("agregrar-tarea").style.display = "block"
}

function Home(){
    document.getElementById("lista").style.display = "block"
    document.getElementById("agregrar-tarea").style.display = "none"
}