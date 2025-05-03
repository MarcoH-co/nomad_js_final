const API_KEY = "2a487138ecdf8b4c7dceda0ee2603d86";

// 테스트 데이터
const testData = {
    name: "Seoul",
    weather: [{ main: "Clear" }],
    main: { temp: 25 }
};

function displayWeather(data) {
    const weather = document.querySelector("#weather span:first-child");
    const city = document.querySelector("#weather span:last-child");
    city.innerText = data.name;
    weather.innerText = `${data.weather[0].main} / ${data.main.temp}°C`;
}

// 테스트 데이터로 날씨 정보 표시
displayWeather(testData);

function successCallback(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("날씨 정보를 가져오는데 실패했습니다:", error);
            alert("날씨 정보를 가져오는데 실패했습니다.");
        });
}

function errorCallback(error) {
    console.error("위치 정보를 가져올 수 없습니다:", error.code, error.message);
    
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("위치 정보 접근 권한이 거부되었습니다.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("위치 정보를 사용할 수 없습니다.");
            break;
        case error.TIMEOUT:
            alert("위치 정보 요청 시간이 초과되었습니다.");
            break;
        case error.UNKNOWN_ERROR:
            alert("알 수 없는 오류가 발생했습니다.");
            break;
    }
}

const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
};

navigator.geolocation.getCurrentPosition(
    successCallback,
    errorCallback,
    options
);