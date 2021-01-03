/*html에 class = js-clock과 h1의 정보를 불러옴, "."를 붙이고 안붙이고의 차이는
클레스명인 것과 아닌 것의 차이가 있다.*/
const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

  function getTime(){
      //날짜와 시간을 불러오는 부분//
      const date = new Date();
      const minutes = date.getMinutes();
      const hours = date.getHours();
      const seconds = date.getSeconds();
      //사간을 index.html의 h1에 넣는 부분//
      /*ternary operator(삼항연산자)를 썼다. 이유는 "59"초 다음 "1"이
      "01"로 나타내주기 위해서 이다.*/
      clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes 
        < 10 ? `0${minutes}` : minutes}:${
          seconds < 10 ? `0${seconds}`: seconds}`;
  }

function init(){
    //getTime의 함수를 불러옴//
    getTime();
    //시간을 실시간으로 불러옴, 1초간격으로 불러옴.//
    setInterval(getTime, 1000);
}
init();