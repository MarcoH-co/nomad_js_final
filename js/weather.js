const API_KEY = "2a487138ecdf8b4c7dceda0ee2603d86";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const weather = document.querySelector("#weather span:first-child");
            const city = document.querySelector("#weather span:last-child");
            weather.innerText = `${data.weather[0].main} / ${Math.round(data.main.temp)}°C`;
            city.innerText = data.name;
        });
}

function onGeoError() {
    alert("위치 정보를 사용할 수 없습니다.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);