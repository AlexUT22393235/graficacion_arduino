$(document).ready(function () {
    var ctx = document.getElementById("sensorTemperatura").getContext("2d");
    var chart = new Chart(ctx, {
        type: "line", // Tipo de gráfica
        data: {
            labels: [], // Las etiquetas de tiempo
            datasets: [
                {
                    label: "Sensor Data",
                    backgroundColor: "rgb(51, 141, 255)",
                    borderColor: "rgb(93, 164, 255)",
                    data: [], // Los datos del sensor
                },
            ],
        },
        options: {},
    });
    
    // Función para actualizar la gráfica
    function fetchData() {
        $.ajax({
            url: "conexionTemperatura.php",
            type: "GET",
            success: function (data) {
                var parsedData = JSON.parse(data);
                var labels = [];
                var sensorData = [];

                parsedData.forEach(function (row) {
                    labels.push(row.id_temperatura);
                    sensorData.push(parseInt(row.temperatura));
                });

                chart.data.labels = labels;
                chart.data.datasets[0].data = sensorData;
                chart.update();

               
            },
        });
    }

    // Actualizar la gráfica cada cierto tiempo, por ejemplo, cada 5 segundos
    setInterval(function () {
        fetchData(); // Actualizar la gráfica de datos
    }, 500); // Ajustar el intervalo según sea necesario
});