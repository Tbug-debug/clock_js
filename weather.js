const weather =document.querySelector(".js-weather")
const API_KEY = "7e2877af4d15d71312a6e88ccbd22232";
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
     return response.json();
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude ;
    const coordsObj = {
        latitude,
        longitude
     };
     saveCoords(coordsObj);
     getWeather(latitude, longitude)
    }

function handleGeoErro(){
    console.log('Cant acces geo location')
}

//좌표 요청 함수//
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoErro)
}

function loadCoords(){
    const loadCoords = localStorage.getItem(COORDS);
    if(loadCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadCoords);
        console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}


function init(){
    loadCoords();

}

init();