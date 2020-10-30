const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    checkedToDoList = document.querySelector(".js-checkedToDoList");

const TODOS_LS = 'toDos';
const CHECKED_LS = 'checkedToDos';
let toDos = [];
let checkedToDos = [];


function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    const className = event.path[2]; //클릭된 버튼의 상위클래스
    //체크되지 않은것과 체크된것 나눠서 삭제
    if (className.classList.contains('toDoList')){
        toDoList.removeChild(li);
        const cleanToDos = toDos.filter(function(toDo) {
            return JSON.stringify(toDo.id) !== li.id;
        })
        toDos = cleanToDos;
        saveToDos(TODOS_LS, toDos);
    } else {
        console.log(className);
        checkedToDoList.removeChild(li);
        const cleanToDos = checkedToDos.filter(function(toDo) {
            return JSON.stringify(toDo.id) !== li.id;
        })
        checkedToDos = cleanToDos;
        saveToDos(CHECKED_LS, checkedToDos);
    }
}

function checkToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    checkedToDoList.appendChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return JSON.stringify(toDo.id) !== li.id;
    })
    const checkToDos = toDos.filter(function(toDo){
        return JSON.stringify(toDo.id) === li.id;
    })
    toDos = cleanToDos;
    checkedToDos = checkedToDos.concat(checkToDos);
    saveToDos(TODOS_LS, toDos);
    saveToDos(CHECKED_LS, checkedToDos);
}

function saveToDos(LS, TODOS){
    localStorage.setItem(LS, JSON.stringify(TODOS));
}

function paintToDo(text, list){
    const li = document.createElement("li");
    const textli = document.createTextNode(text);
    const checkBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const newId = Date.now() + toDos.length;
    delBtn.innerText = "❌";
    li.appendChild(checkBtn);
    li.appendChild(textli);
    li.appendChild(delBtn);
    delBtn.id = "delBtn"
    li.id = newId;
    checkBtn.addEventListener("click", checkToDo);
    delBtn.addEventListener("click", deleteToDo);
    list.appendChild(li); //화면에 todo 생성
    const toDoObj = {
        text: text,
        id: newId
    }
    if (list.classList.contains('toDoList')){
    toDos.push(toDoObj);
    saveToDos(TODOS_LS, toDos)
    } else {
    checkedToDos.push(toDoObj);
    saveToDos(CHECKED_LS, checkedToDos)
    }
}

function handleSubmitToDo(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue, toDoList);
    toDoInput.value = ""; //submit 후 input창 초기화
}

function loadToDos(LS, LIST){
    const loadedToDos = localStorage.getItem(LS);
    if (loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text, LIST);
        })
    }
}

function init(){
    loadToDos(TODOS_LS, toDoList);
    loadToDos(CHECKED_LS, checkedToDoList);
    toDoForm.addEventListener("submit", handleSubmitToDo)
}
init();