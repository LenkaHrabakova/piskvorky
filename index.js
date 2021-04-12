'use strict';

let playing = 'circle';

// const playingCross = document.querySelector('.player');

// const crossPlays = () => {
//   playingCross.classList.toggle('cross-turn');
// };
// document.addEventlistener('click', crossPlays);¨
let click = 0;
const playingCross = document.querySelector('.types');

const playingFunction = (event) => {
  if (event.target.disabled) {
    return;
  }
  click++;
  if (click % 2 != 0) {
    event.target.classList.add('board__field--circle');
    playingCross.src = 'pictures/cross.svg';
  } else {
    event.target.classList.add('board__field--cross');
    playingCross.src = 'pictures/circle.svg';
  }
  event.target.disabled = true;
};

document.querySelectorAll('.play button').forEach((element) => {
  element.addEventListener('click', playingFunction);
});
