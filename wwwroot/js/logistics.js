const tabla = document.getElementById("tabla").getElementsByTagName("tbody")[0];
const btn = document.getElementById("btnActualizar");
let orden;
let map;
let cliente;

const conexion = new signalR.HubConnectionBuilder()
  .withUrl("/WebSocketServer")
  .build();

conexion
  .start()
  .then((s) => {
    alert("Conexion exitosa");
  })
  .catch((e) => {
    alert("Error al realizar la conexión");
  });

conexion.on("EnviarMensajeTodos", (name, fechaInicio, horaInicio) => {
  alert(
    `El cliente ${name} ha reportado un fallo en su linea el dia ${fechaInicio} a la hora ${horaInicio}`
  );
});

async function getOrdenes() {
    try {
      const response = await fetch("http://localhost:5155/Transacciones/GetOrdenes"); // URL que devuelve List<Orden>
      const ordenes = await response.json();
  
      // Limpiar la tabla antes de agregar nuevas filas
      tabla.innerHTML = '';
  
      // Iterar sobre la lista de órdenes y agregarlas a la tabla
      ordenes.forEach(orden => {
        const fila = tabla.insertRow();
  
        // Crear una celda por cada atributo de Orden
        const celdaNombre = fila.insertCell(0);
        const celdaFechaInicio = fila.insertCell(1);
        const celdaHoraInicio = fila.insertCell(2);
        const celdaFechaFin = fila.insertCell(3);
        const celdaHoraFin = fila.insertCell(4);
  
        // Asignar los valores de cada atributo del objeto Orden
        celdaNombre.textContent = orden.name;  // suposición: "id" es un atributo de Orden
        celdaFechaInicio.textContent = orden.fechaInicio;  // suposición: "cliente" es un atributo de Orden
        celdaHoraInicio.textContent = orden.horaInicio;  // suposición: "producto" es un atributo de Orden
        celdaFechaFin.textContent = orden.fechaFin;  // suposición: "cantidad" es un atributo de Orden
        celdaHoraFin.textContent = orden.horaFin;  // suposición: "cantidad" es un atributo de Orden
      });
  
    } catch (error) {
      alert("Error al obtener las órdenes: " + error);
    }
  }

getOrdenes();

function crearMapa() {
  map = L.map("map").setView([51.505, -0.09], 1);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}

crearMapa();

async function getMarcadores() {
  try {
    const response = await fetch(
      "http://localhost:5162/Transacciones/GetClientes"
    ); // URL que devuelve List<Orden>
    const clientes = await response.json();

    // Iterar sobre la lista de órdenes y agregarlas a la tabla
    clientes.forEach((orden) => {
      L.marker([orden.latitud, orden.longitud])
        .addTo(map)
        .bindPopup(orden.name)
        .openPopup();
    });
  } catch (error) {
    alert("Error al obtener los clientes: " + error);
  }
}

getMarcadores();

tabla.addEventListener("click", function (event) {
  // Obtener la fila que fue clickeada
  const filaSeleccionada = event.target.parentNode; // Obtiene la fila completa

  // **Opción 1: Obtener solo el valor de la primera celda (ID)**
  const id = filaSeleccionada.cells[0].textContent;

  getCliente(id);
  console.log("ID de la Orden:", id);
});

async function getCliente(idCliente) {
  try {
    const response = await fetch(
      `http://localhost:5155/Transacciones/GetCliente?=${idCliente}`
    ); 
    cliente = await response.json();

  } catch (error) {
    alert("Error al obtener los clientes: " + error);
  }
}

async function updateOrden(cliente) {
  try {
    const estatusSelect = document.getElementById("estatus");
    const dateTime = new Date();
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    cliente.fechaFin = date;
    cliente.horaFin = time;
    cliente.estatus = estatusSelect;

    const response = await fetch(
      "http://localhost:5162/Transacciones/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      }
    );

    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("Orden actualizada con éxito:", jsonResponse);
    } else {
      console.error("Error al agregar la orden:", response.statusText);
    }
  } catch (error) {
    alert("Error al agregar la orden: " + error);
  }
}

btn.addEventListener("click", () => {
  updateOrden(orden);
});
