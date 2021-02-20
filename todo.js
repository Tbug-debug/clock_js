const jsform = document.querySelector(".jsform");
const jsinput = document.querySelector(".doInput");
const doing = document.querySelector(".doing");
const finish = document.querySelector(".finish");

const DOING = "Doing";
const FINISHING = "Finish";

let doin = [];
let finis = [];

function savefinishing() {
  localStorage.setItem(FINISHING, JSON.stringify(finis));
}

function saveDoing() {
  localStorage.setItem(DOING, JSON.stringify(doin));
}

function moveTwo(e) {
  const btn = e.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  if (ul.className === "finish") {
    finish.removeChild(li);
    doing.appendChild(li);
    const cleanTodoing = finis.filter(function (todoing) {
      return todoing.id === parseInt(li.id);
    });
    const removeTodoing = finis.filter(function (todoing) {
      return todoing.id !== parseInt(li.id);
    });
    finis = removeTodoing;
    doin.push(cleanTodoing[0]);
    saveDoing();
    savefinishing();
  } else {
    doing.removeChild(li);
    const removeTodoing = doin.filter(function (todoing) {
      return todoing.id !== parseInt(li.id);
    });
    doin = removeTodoing;
    savefinishing();
    saveDoing();
  }
}

function moveOne(e) {
  const btn = e.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  if (ul.className === "finish") {
    finish.removeChild(li);
    const removeTodoing = finis.filter(function (todoing) {
      return todoing.id !== parseInt(li.id);
    });
    finis = removeTodoing;
    savefinishing();
    saveDoing();
  } else {
    doing.removeChild(li);
    finish.appendChild(li);
    const cleanTodoing = doin.filter(function (todoing) {
      return todoing.id === parseInt(li.id);
    });
    const removeTodoing = doin.filter(function (todoing) {
      return todoing.id !== parseInt(li.id);
    });
    doin = removeTodoing;
    finis.push(cleanTodoing[0]);
    savefinishing();
    saveDoing();
  }
}

let newId = 0;
function paintingDoing(t, part) {
  const li = document.createElement("li");
  const btn = document.createElement("btn");
  const savbtn = document.createElement("savebtn");
  const span = document.createElement("span");
  btn.innerHTML = "⫷";
  savbtn.innerHTML = "⫸";
  span.innerText = t;
  btn.addEventListener("click", moveTwo);
  savbtn.addEventListener("click", moveOne);
  li.appendChild(span);
  li.appendChild(btn);
  li.appendChild(savbtn);
  part.appendChild(li);
  li.id = newId;
  const newOj = {
    text: t,
    id: newId
  };
  newId++;
  if (part === doing) {
    doin.push(newOj);
    saveDoing();
  }
  if (part === finish) {
    finis.push(newOj);
    savefinishing();
  }
}

function handleSubmit(e) {
  e.preventDefault();
  const textValue = jsinput.value;
  paintingDoing(textValue, doing);
  jsinput.value = "";
}

function loadTofinish() {
  const lastedfinish = localStorage.getItem(FINISHING);
  if (lastedfinish !== null) {
    const parsedTofinish = JSON.parse(lastedfinish);
    parsedTofinish.forEach(function (tofi) {
      paintingDoing(tofi.text, finish);
    });
  }
}

function loadToDos() {
  const lasteddoing = localStorage.getItem(DOING);
  if (lasteddoing !== null) {
    const parsedToDos = JSON.parse(lasteddoing);
    parsedToDos.forEach(function (toDo) {
      paintingDoing(toDo.text, doing);
    });
  }
}

function init() {
  loadToDos();
  loadTofinish();
  jsform.addEventListener("submit", handleSubmit);
}

init();
