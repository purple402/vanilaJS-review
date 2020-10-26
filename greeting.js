const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetins");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";


function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    
    localStorage.setItem(USER_LS, currentValue);
    // save name in local storage
    paintGreeting(currentValue);
    // 함수 선언문으로 정의한 함수는 Hoisting되어서 어디에서나 호출가능함
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener('submit', handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null){
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}
init();