const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

//로컬 스토리지의 불러온 값을 USER_LS에 저장함.//
const USER_LS = "currentUser",
//css의 class의 showing 값을 SHOWING_CN에 저장함// 
   SHOWING_CN = "showing"

function saveName(text){
    //input에 친 이름을 로컬 스토리지에 저장하여 F5를 눌러도 값을 그대로 유지하는 함수//
    localStorage.setItem(USER_LS,text);
}

function handleSumbit(event){
    /*input안에 정보를 치고 엔터를 누르면 
    정보가 사라지는 것을 방지하기 위한 것.*/
    event.preventDefault();
    //input에 정보를 넣고 엔터를 치면 그 값(value)을 currentValue 안에 저장함.//
    const currentValue = input.value;
    //input에 정보를 치면 currentValue에 있는 값을 paintingGreeting의 함수로 전달//
    paintGreeting(currentValue);
    //input에 친 이름을 로컬 스토리지에 저장하여 F5를 눌러도 값을 그대로 유지하는 함수//
    saveName(currentValue)
}
    
function askForName(){
    //로컬 스토리지에 값이 없다면 input으로 이름을 요청함.//
    form.classList.add(SHOWING_CN);
    //누군가가 input에 이름을 제출하면 그것을 알아차리는 역할.//
    form.addEventListener("submit", handleSumbit)
}

function paintGreeting(text){
    //만약 로컬 스토리지에 정보가 있다면 form을 없애줘라//
    form.classList.remove(SHOWING_CN);
    //만약 로컬 스토리지에 정보가 있다면 화면에 greeting안의 내용을 보여줘라//
    greeting.classList.add(SHOWING_CN);
    /*만약 로컬 스토리지에 정보가 있다면,
    greeting 안에 Hello ${text}라는 택스트를 넣어줌.*/
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    //로컬 스토리지에서 유저 정보를 불러와서 currentUser안에 값을 저장함.//
    const currentUser = localStorage.getItem(USER_LS);
    //로컬 스토리지에 값이 있는지 혹은 없는지 체크하는 if문.//
    if(currentUser === null){
        //로컬 스토리지에 정보가 없으면 user의 이름을 요청하는 함수//
        askForName();
    }else{
        /*유저의 이름 값이 주어진 경우, 즉 null이 아닐 경우...
        로컬 스토리지의 currentUser에 있는 값으로 paintingGreeting
        함수를 실행시킴*/
        paintGreeting(currentUser);
    }
}

function init(){
    //loadName 함수를 실행시킴//
    loadName();

}
init();