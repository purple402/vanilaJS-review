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
        checkedToDoList.removeChild(li);
        const cleanToDos = checkedToDos.filter(function(toDo) {
            return JSON.stringify(toDo.id) !== li.id;
        })
        checkedToDos = cleanToDos;
        saveToDos(CHECKED_LS, checkedToDos);
    }
}

function unCheckToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    const checkBtn = li.querySelector(".fa-check-square");
    const line = document.querySelector("#strikeout");
    // checked list에 li 추가(HTML)
    checkBtn.classList.remove("fa-check-square");
    checkBtn.classList.add("fa-square");
    checkBtn.removeEventListener("click", unCheckToDo);
    checkBtn.addEventListener("click", checkToDo);
    li.removeChild(line);
    toDoList.appendChild(li);
    // 클릭되지 않은것 - cleanToDos에 넣음
    const cleanToDos = checkedToDos.filter(function(toDo) {
        return JSON.stringify(toDo.id) !== li.id;
    })
    // 클릭된 것 - checkedToDos에 넣음
    const checkToDos = checkedToDos.filter(function(toDo){
        return JSON.stringify(toDo.id) === li.id;
    })
    // 남은것들 = checkedToDos
    checkedToDos = cleanToDos;
    // 클릭된 것은 기존 toDos 뒤에 붙임
    toDos = toDos.concat(checkToDos);
    //각각 Local Storage에 저장
    saveToDos(TODOS_LS, toDos);
    saveToDos(CHECKED_LS, checkedToDos);
}

function checkToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    const checkBtn = li.querySelector(".fa-square");
    const line = document.createElement("div");
    // checked list에 li 추가(HTML)
    checkBtn.classList.remove("fa-square");
    checkBtn.classList.add("fa-check-square");
    checkBtn.removeEventListener("click", checkToDo);
    checkBtn.addEventListener("click", unCheckToDo);
    li.appendChild(line);
    line.id = 'strikeout';
    checkedToDoList.appendChild(li);
    // 클릭되지 않은것 - cleanToDos에 넣음
    const cleanToDos = toDos.filter(function(toDo) {
        return JSON.stringify(toDo.id) !== li.id;
    })
    // 클릭된 것 - checkedToDos에 넣음
    const checkToDos = toDos.filter(function(toDo){
        return JSON.stringify(toDo.id) === li.id;
    })
    // 남은것들 = toDos
    toDos = cleanToDos;
    // 클릭된 것은 기존 checkedToDos 뒤에 붙임
    checkedToDos = checkedToDos.concat(checkToDos);
    //각각 Local Storage에 저장
    saveToDos(TODOS_LS, toDos);
    saveToDos(CHECKED_LS, checkedToDos);
}

function saveToDos(LS, TODOS){
    localStorage.setItem(LS, JSON.stringify(TODOS));
}

function paintToDo(text, list){
    const li = document.createElement("li");
    const textli = document.createElement("span");
    const checkBtn = document.createElement("icon");
    const delBtn = document.createElement("icon");
    const newId = Date.now() + toDos.length;
    const line = document.createElement("div");
    checkBtn.classList.add('far', 'fa-square');
    delBtn.classList.add('far', 'fa-trash-alt');
    textli.innerHTML = text;
    li.appendChild(checkBtn);
    li.appendChild(textli);
    li.appendChild(delBtn);
    delBtn.id = "delBtn"
    li.id = newId;
    delBtn.addEventListener("click", deleteToDo);
    list.appendChild(li); //화면에 todo 생성
    const toDoObj = {
        text: text,
        id: newId
    }
    if (list.classList.contains('toDoList')){
    checkBtn.addEventListener("click", checkToDo);
    toDos.push(toDoObj);
    saveToDos(TODOS_LS, toDos)
    } else {
    checkBtn.classList.remove("fa-square");
    checkBtn.classList.add("fa-check-square");
    checkBtn.addEventListener("click", unCheckToDo);
    li.appendChild(line);
    line.id = 'strikeout';
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