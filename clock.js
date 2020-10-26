const clockContainer = document.querySelector(".js-clock"),
clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    let hours = date.getHours();
    const seconds = date.getSeconds();
    let ap = null;

    if (hours > 12) {hours = hours - 12; ap = "PM"} else {ap = "AM"};
    if (hours == 0) {hours = 12};

    clockTitle.innerText = `${ap} ${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
    
}

function init(){
    getTime();
    setInterval(getTime, 1000);
}
init();