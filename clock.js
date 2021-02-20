const secondHand = document.querySelector('.second-hand');
  const minsHand = document.querySelector('.min-hand');
  const hourHand = document.querySelector('.hour-hand');

  function setDate() {
    const now = new Date();

    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    /*60초에 1분 즉, 60초가 되었을때에는 360도를 돌아야 됨.
      seconds가 60초가 되었을때, 60/60은 1 1 곱하기 360은 360이 된다. 
      즉 360도를 돈다.
      플러스 90은 console.log를 해보면 알겠지만 00초가 다 되었지만 초침은 아직 
        반밖에 돌지 못했다. 그리하여 90도를 더 더하여 180도가 되게 하였다.*/
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const mins = now.getMinutes();
    const minsDegrees = ((mins / 60) * 360) + 90;
    /* 위의 초와 동일*/
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;

    const hour = now.getHours();
    const hourDegrees = ((hour / 12) * 360) + 90;
    /*시간에서 다른 점은 1시간씩 총 12시간이 흐르면 360을 돌아야 된다는 점이다.*/
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  
  }

  setInterval(setDate, 1000);

  setDate();
