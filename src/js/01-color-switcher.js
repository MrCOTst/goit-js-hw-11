//  Ініціюємо кнопки та екран (боді) //

  const body = document.body;
  let timerId = null;
  const refs = {
    startBtn: document.querySelector("button[data-start]"),
    stopBtn: document.querySelector("button[data-stop]"),
  };

// Підключаємо слухачів натискання на кнопки //

  refs.startBtn.addEventListener("click", createColorBody);
  refs.stopBtn.addEventListener("click", stopCreate);

  // Функція генерації та зміни кольору єкрана //
  function createColorBody() {
    timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
      }, 1000);
      refs.startBtn.setAttribute('disabled', 'disabled');
      refs.startBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
      console.log("Enabled was removed from button Start");
  }

  // Функція зупинки зміни кольорів екрану //
  
    function stopCreate() {
    clearInterval(timerId);
    refs.startBtn.removeAttribute('disabled', 'disabled');
    refs.startBtn.style.backgroundColor = '#2196f3';
    console.log(`Interval with id ${timerId} has stopped!`);
  }

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }