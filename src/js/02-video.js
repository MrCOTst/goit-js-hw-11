//ініціалізуємо плеер та троттл//
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

//прив'язуємо плеер з бібліотеки до нашого з HTML//

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// при запуску плеера відстужуємо поточний час відтворення відео через подію 
//timeupdate (це властивість самого плеера), час відстеження регулюємо за допомогою плагіна lodash.trottle\\

player.on('timeupdate', throttle(timeStop, 1000));

//Робимо колбек функцію, що записує час зупинки відео до localStorage у секундах (можливо ще у процентах) //

function timeStop(timeupdate) {
  let pause = timeupdate.seconds;
  console.log(pause);
  localStorage.setItem('videoplayer-current-time', pause);
}
//Робимо змінну в яку записуємо значення збереженного в локальній пам'яті часу зупинки відтворення відео.//

let savedTime = localStorage.getItem('videoplayer-current-time');

// за допомогою методу setCurrentTime огранізуємо поновлення відтроврення відео з моменту часу сбереженного в пам'яті.//
playAfterStop ();

function playAfterStop () {
    if(savedTime) {
        player.setCurrentTime(savedTime);
    }
} 


