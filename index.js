'use strict';

let playing = 'circle';

let click = 0;
const playingCross = document.querySelector('.types');
const boardSize = 10; // 10x10
const fields = document.querySelectorAll('.play button');

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

  if (isWinningMove(event.target)) {
    // alert(`Vyhrál ${getSymbol(event.target)}`);

    if (confirm(`Vyhrál ${getSymbol(event.target)}. Spustit novou hru?`)) {
      location.reload();
    }
  }
};

fields.forEach((element) => {
  element.addEventListener('click', playingFunction);
});

//check who wins

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length) {
    if (field === fields[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const getField = (row, column) => {
  return fields[row * 10 + column];
};

const getSymbol = (field) => {
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  } else {
    return undefined;
  }
};

const isInBoard = (i) => {
  return i >= 0 && i < 10;
};

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }
  //bonus
  //pro lepsi orientaci - x je radek, y je sloupec jako u souradnic
  //! moje funkce getField bere nejdriv row a pak column, proto jsou tam souradnice prohozene

  //nahoru doprava + doleva dolu
  let inDiagonalA = 1;

  //koukam nahoru doprava
  let x = 0; //radky
  let y = 0; //sloupce

  x = origin.column;
  y = origin.row;

  while (
    isInBoard(x + 1) &&
    isInBoard(y - 1) &&
    getSymbol(getField(y - 1, x + 1))
  ) {
    inDiagonalA++;
    x++;
    y--;
  }

  //koukam doleva dolu

  x = origin.column;
  y = origin.row;

  while (
    isInBoard(x - 1) &&
    isInBoard(y + 1) &&
    getSymbol(getField(y + 1, x - 1))
  ) {
    inDiagonalA++;
    x--;
    y++;
  }

  if (inDiagonalA >= symbolsToWin) {
    return true;
  }

  //nahoru doleva + doprava dolu

  let inDiagonalB = 1;

  //koukam nahoru doleva

  x = origin.column;
  y = origin.row;

  while (
    isInBoard(x - 1) &&
    isInBoard(y - 1) &&
    getSymbol(getField(y - 1, x - 1))
  ) {
    inDiagonalB++;
    x--;
    y--;
  }

  //koukam doprava dolu

  x = origin.column;
  y = origin.row;

  while (
    isInBoard(x + 1) &&
    isInBoard(y + 1) &&
    getSymbol(getField(y + 1, x + 1))
  ) {
    inDiagonalB++;
    x++;
    y++;
  }

  if (inDiagonalB >= symbolsToWin) {
    return true;
  }

  return false;
};
