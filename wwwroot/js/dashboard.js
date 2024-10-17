const ctx = document.getElementById("myChart");
let i;
let j;
let k;

const chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Ordenes"],
    datasets: [
      {
        label: "Pendientes",
        data: [i],
        borderColor: "#36A2EB",
        backgroundColor: "orange",
      },
      {
        label: "Atendidas",
        data: [j],
        borderColor: "#36A2EB",
        backgroundColor: "green",
      },
      {
        label: "Canceladas",
        data: [k],
        borderColor: "#36A2EB",
        backgroundColor: "red",
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

function updateGraphic() {
  chart.data.datasets[0].data = [i];
  chart.data.datasets[1].data = [j];
  chart.data.datasets[2].data = [k];

  chart.update();
}

async function getOrdenes() {
  try {
    const response = await fetch("http://localhost:5162/Transacciones/GetClientes"); 
    const ordenes = await response.json();

    ordenes.forEach(orden => {

      if (orden.estatus == 'Pendiente') {
        i++;
      } else if(orden.estatus == 'Atendida'){
        j++
      }else if(orden.estatus == 'Cancelada'){
        k++;
      }
    });
    updateGraphic();

  } catch (error) {
    alert("Error al obtener las órdenes: " + error);
  }
}

getOrdenes();
