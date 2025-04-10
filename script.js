class Tarea {
  constructor(descripcion) {
    this.descripcion = descripcion;
    this.completada = false;
    this.fechaCreacion = new Date().toLocaleString();
    this.fechaCompletada = null;
  }
}

let listaTareas = [];

console.log(listaTareas);
//iguala la lista a los valores del local storage
for (let i = 0; i < localStorage.length; i++) {
  //obtiene la key
  let keyFecha = localStorage.key(i);
  //despues agarra el string con esa key
  let stringObtenido = localStorage.getItem(keyFecha);
  //hace el objeto
  let objetoTarea = JSON.parse(stringObtenido);
  listaTareas.push(objetoTarea);
}
OrdenarLista()


//verificar agregar tarea
function Formulario() {
  if (ValidarVacio()) {
    event.preventDefault();
    let input = document.getElementById("ingreso");
    input.style.borderColor = "red";
    setTimeout(() => {
      input.style.borderColor = "";
    }, 2000);
  } else {
    let textoIngresado = document.getElementById("ingreso").value;
    let tarea = new Tarea(textoIngresado);
    listaTareas.push(tarea);
    localStorage.setItem(tarea.fechaCreacion, JSON.stringify(tarea));
    AgregarTareaNueva(listaTareas);
  }
}

function MostrarTareas() {
    
    for (const tareañ of listaTareas) 
    {
        const tareaf = localStorage.getItem(tareañ.fechaCreacion);
        const objetoTarea = JSON.parse(tareaf);
        document.getElementById(
        "lista"
        ).innerHTML += `<div class="tarea" id="${objetoTarea.fechaCreacion}"> 
            <div> 
                <input type="checkbox" id="checkbox-${objetoTarea.fechaCreacion}" onchange="TacharCompletada('${objetoTarea.fechaCreacion}')"> 
                <p id="descripcion-${objetoTarea.fechaCreacion}"> ${objetoTarea.descripcion} </p> 
            </div> 
            <p> ${objetoTarea.fechaCreacion} </p> 
            <button class="eliminar" onclick="EliminarTarea('${objetoTarea.fechaCreacion}')"> <i class="fas fa-trash"></i> </button> 
        </div>`;
    const descripcionTarea = document.getElementById(
      `descripcion-${objetoTarea.fechaCreacion}`
    );
    const chechBox = document.getElementById(
      `checkbox-${objetoTarea.fechaCreacion}`
    );
    if (objetoTarea.completada == true) {
      descripcionTarea.style.textDecoration = "line-through";
      chechBox.setAttribute("checked", true);
    }
  }
}

function EliminarTarea(fecha) 
{
    localStorage.removeItem(fecha);
    document.getElementById(fecha).remove();
}

function TacharCompletada(fecha) {
  const chechBox = document.getElementById(`checkbox-${fecha}`);
  const descripcionTarea = document.getElementById(`descripcion-${fecha}`);

  tareaModificada = listaTareas.find((tarea) => tarea.fechaCreacion == fecha);

  if (chechBox.checked) {
    descripcionTarea.style.textDecoration = "line-through";
    tareaModificada.completada = true;
    tareaModificada.fechaCompletada = new Date().toLocaleString();
    localStorage.setItem(
      tareaModificada.fechaCreacion,
      JSON.stringify(tareaModificada)
    );
  } else {
    descripcionTarea.style.textDecoration = "";
    tareaModificada.completada = false;
    tareaModificada.fechaCompletada = null;
    localStorage.setItem(
      tareaModificada.fechaCreacion,
      JSON.stringify(tareaModificada)
    );
  }
  OrdenarLista()
}

function ValidarVacio() {
  let ingreso = document.getElementById("ingreso").value;
  if (ingreso == "") {
    return true;
  } else {
    return false;
  }
}

//navegar
function VentanaTarea() {

  document.getElementById("lista-tareas").style.display = "none"
  document.getElementById("agregrar-tarea").style.display = "block";
}
function Home() {
  document.getElementById("lista-tareas").style.display = "block";
  document.getElementById("agregrar-tarea").style.display = "none";
}

function OrdenarLista() {
  let opcionSeleccionada = document.getElementById("opciones").value;

  if (opcionSeleccionada == "fecha") 
  { 
    listaTareas.sort((a, b) => new Date(a.fechaCreacion) - new Date(b.fechaCreacion))
  } 
  else
  {
    listaTareas.sort((a, b) => {
        if (a.completada !== b.completada) {
          return a.completada - b.completada;
        }
        return new Date(a.fechaCreacion) - new Date(b.fechaCreacion);
      });
  }
  document.getElementById("lista").innerHTML = "";
  MostrarTareas()
}


function EliminarCompletadas()
{

    for (const tarean of listaTareas) 
    {   
        const tarea = localStorage.getItem(tarean.fechaCreacion);
        const objetoTarea = JSON.parse(tarea);
        
        if (objetoTarea.completada == true) 
        {
            localStorage.removeItem(objetoTarea.fechaCreacion);
        }    
    }
    location.reload();
    
}

function TareaMasRapida() {
    let tareaMasRapida = null;
    let menorTiempo = Infinity;
  
    for (const tarea of listaTareas) {

      if (tarea.completada && tarea.fechaCompletada) {
        const inicio = new Date(tarea.fechaCreacion);
        const fin = new Date(tarea.fechaCompletada);
        const tiempo = fin - inicio;
  
        if (tiempo < menorTiempo) {
          menorTiempo = tiempo;
          tareaMasRapida = tarea;
        }
      }
    }
    const div = document.getElementById(tareaMasRapida.fechaCreacion);
    if (div) {
      div.style.border = "2px solid green"; // podés cambiar color/grosor si querés
      setTimeout(() => {
        div.style.border = "";
      }, 2000);
    }
  }