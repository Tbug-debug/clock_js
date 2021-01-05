const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList")

const TODOS_LS = "toDos";

//toDo에 있는 항목들을 리스트로 만들어주는 코드.//
let toDos = [];

function deleteToDo(event){
    //target은 버튼이 계속 뜨개끔 만듬//
    const btn = event.target;
    //지워야 할 li의 부모node를 찾는 것.//
    const li = btn.parentNode;
    //버튼을 클릭하면 list가 삭제되는 코드.//
    toDoList.removeChild(li);
    //todo의 ID가 없는 값을 로컬 스토리지에서 지우는 함수.//
    const cleanToDos = toDos.filter(function(toDo){
     /*parseInt는 string을 숫자로 바꾸는 코드. 왜냐하면 id의 숫자가
     string이 아니고 number이기 때문이다.*/
     return toDo.id !== parseInt(li.id);
    });
    //toDos(old)를 CleanToDos(new)로 교체하는 코드.//
    toDos = cleanToDos
    saveToDos();
}

function saveToDos() {
    /*toDo의 정보를 로컬 스토리지에 저장하는 함수, 
    여기에 쓰인 JSON은 object를 string으로 바꾸어주는 것.*/
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    //엘리먼트를 생성하는 함수//
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const delBtm = document.createElement("button")
    const span = document.createElement("span");
    //array 길이가 어느 정도 길은지를 알 수 있게 해주는 함수.//
    const newId = toDos.length + 1;
    //버튼 안에 글자나 모양을 넣어주는 코드//
    delBtn.innerHTML="✔";
    delBtm.innerHTML="✖"
    span.innerText = text;
    //버튼을 클릭했을때 감지하여 함수를 실행하게 하는 코드//
    delBtn.addEventListener("click", deleteToDo);
    delBtm.addEventListener("click", deleteToDo);
    //span, button을 li 안에 넣는 코드//
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(delBtm);
    //li를 toDoList(ul)에 넣는 코드//
    toDoList.appendChild(li);
     //li 에게 ID를 주는 코드//
    li.id = newId;
    const toDoObj = {
    //toDo에 있는 항목이 어떤 형태로 올건지 정하는 함수.//
        text: text,
        id: newId
    };
    // array안에 element를 넣어주는 코드.//
    toDos.push(toDoObj);
    //saveToDos의 함수를 호출하는 코드.//
    saveToDos();
}

function handleSumbit (event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    //input에 엔터를 쳤을시에 input안에 텍스트를 지워주는 함수//
    toDoInput.value = "";
}
    
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS)
    if(loadedToDos !== null){
        //여기에 쓰인 JSON은 String을 Object로 바꾸어주는 것.//
        const parsedToDos = JSON.parse(loadedToDos);
        /*밑의 forEach는 parsedToDos 안에 있는 
        각각의 요소들을 오름차순으로 실행시켜주는 함수*/
        parsedToDos.forEach(function(toDo){
            //paintToDo의 함수에서 toDo를 실행시켜줌.//
            paintToDo(toDo.text)
        });

    } 
}

function init() {
    loadToDos();
       
    toDoForm.addEventListener("submit", handleSumbit)
}

init();