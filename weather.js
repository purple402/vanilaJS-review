const weather = document.querySelector(".js-weather");

const API_KEY = config.MY_KEY;
const COORDS = 'coords';

function getWeather(lat, lon){
    //fecth는 서버에 요청을 보내고 자료를 받아옴
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`).then(function(response) {
        return response.json();
    }).then(function(json){
        const temp = json.main.temp;
        const place = json.name;
        const tempSpan = document.createElement('span');
        const placeSpan = document.createElement('span');
        console.log(json);
        tempSpan.classList.add("temp");
        tempSpan.innerText = `${temp}°C`;
        placeSpan.classList.add("place");
        placeSpan.innerText = ` @ ${place}`;
        weather.appendChild(tempSpan);
        weather.appendChild(placeSpan);
    })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(lantitude, longitude);
}

function handleGeoError(){
    console.log('can\'t access geo location');
}

function askForCoords(){
    console.log(navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError));
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords)
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }

}

function init(){
    loadCoords();
}
init();