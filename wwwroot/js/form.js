let lugar = document.getElementById("lugar");
let btnEnviar = document.getElementById("btnEnviar");
localStorage.setItem("id", 1);


let txtName;
let latitude;
let longitude;
let date;
let time;

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

function getUbicacion() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition, errorPosition);
  } else {
    lugar.innerText = "El navegador no soporta geolocalizacion";
  }
}

function getPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  let map = L.map("map").setView(
    [position.coords.latitude, position.coords.longitude],
    18
  );

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([position.coords.latitude, position.coords.longitude])
    .addTo(map)
    .bindPopup("Su ubicación")
    .openPopup();
}

function errorPosition(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      lugar.innerText = "Permiso denegado a la ubicacion";
      break;
    case error.POSITION_UNAVAILABLE:
      lugar.innerText = "Ubicacion no disponible";
      break;
    case error.TIMEOUT:
      lugar.innerText = "El tiempo de espera se ha agotado";
      break;
    case error.UNKNOWN_ERROR:
      lugar.innerText = "Error desconocido";
      break;
  }
}

getUbicacion();

btnEnviar.addEventListener("click", () => {
  const dateTime = new Date();

  txtName = document.getElementById("txtName");
  date = dateTime.toLocaleDateString();
  time = dateTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const cliente = {
    id:localStorage.getItem("id"),
    name: txtName,     
    latitud: latitude,        
    longitud: longitude,        
    fechaInicio: date,
    horaInicio: time,
    fechaFin: " - ",
    horaFin: " - " ,
    estatus: "Pendiente"         
  };

  addOrden(cliente);

  conexion.invoke("EnviarMensaje", txtName.value, date, time);

  alert("Peticion enviada");

  console.log(`Nombre: ${txtName.value}`);
  console.log(`Longitude: ${longitude}`);
  console.log(`Latitude: ${latitude}`);
  console.log(`Fecha: ${date}`);
  console.log(`Hora: ${time}`);
  console.log(`Estado: Pendiente`);
});

async function addOrden(cliente) {
  try {
    const response = await fetch("http://localhost:5162/Transacciones/AddCliente", {
      method: "POST",                 
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(cliente)  
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("Orden agregada con éxito:", jsonResponse);
    } else {
      console.error("Error al agregar la orden:", response.statusText);
    }

  } catch (error) {
    alert("Error al agregar la orden: " + error);
  }
}

