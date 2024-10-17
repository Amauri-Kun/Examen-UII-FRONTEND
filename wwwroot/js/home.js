 
    const conexion = new signalR.HubConnectionBuilder()
    .withUrl("/WebSocketServer")
    .build();

conexion.start().then((s) => {
    alert("Conexion exitosa")
}).catch((e) => {
    alert("Error al realizar la conexión")
});

conexion.on("EnviarMensajeTodos", (name, fechaInicio, horaFin) => {
    alert(`El cliente ${name} ha reportado un fallo en su linea el dia ${fechaInicio} a la hora ${horaFin}`)
    getOrdenes();
});

async function getOrdenes() {
    try {
      const response = await fetch("http://localhost:5162/Transacciones/GetClientes"); // URL que devuelve List<Orden>
      const ordenes = await response.json();
  
      const tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];
  
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

 