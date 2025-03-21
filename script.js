const cit = document.getElementById('cidade');

function consultarClima() {
    let cidade = cit.value.trim();

    if (!cidade) {
        alert("Por favor, insira o nome da cidade.");
        return;
    }

    fetch(`http://localhost:8080/clima/${cidade}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.main || !data.weather || data.weather.length === 0) {
                throw new Error("Dados inválidos retornados pela API");
            }

            let temperaturaCelsius = (data.main.temp - 273.15).toFixed(2);

            document.getElementById('nome-cidade').textContent = ` ${data.name}`;
            document.getElementById('temperatura').textContent = ` ${temperaturaCelsius} °C`;
            document.getElementById('umidade').innerHTML = `<i class="fa-solid fa-droplet"></i> Umidade: ${data.main.humidity}%`;
            document.getElementById('vento').innerHTML = `<i class="fa-solid fa-wind"></i> Vento: ${data.wind.speed} km/h`;

            let descricao = data.weather[0].description;
            let icone = data.weather[0].icon;
            document.getElementById('icone-clima').src = `https://openweathermap.org/img/wn/${icone}@2x.png`;

            document.getElementById('icone-clima').alt = descricao;
            document.getElementById('descricao-clima').textContent = ` ${descricao.charAt(0).toUpperCase() + descricao.slice(1)}`;

            document.getElementById('clima-info').style.display = 'block';
            document.getElementById('icone-clima').style.display = 'block';
            document.getElementById('titulo').style.display = 'none';

            cit.value = "";
        })
        .catch(error => {
            console.error('Erro ao consultar o clima:', error);
            alert('Erro ao consultar o clima. Verifique se o nome da cidade está correto e tente novamente.');
            document.getElementById('clima-info').style.display = 'none';
        });
}

cit.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        consultarClima();
    }
});

document.querySelector("button").addEventListener("click", consultarClima);
