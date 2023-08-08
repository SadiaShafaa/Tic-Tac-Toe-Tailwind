const cellElements = document.querySelectorAll(".cell");
const Winpage = document.querySelector(".win-page");
const WinMsg = document.querySelector("[winningText]");
const Restart = document.getElementById("bt");
let circleTurn;
const winCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame()

Restart.addEventListener("click", function() {
    Winpage.classList.add("hidden");
    startGame();
});


function startGame() {
    circleTurn = false;
    cellElements.forEach((cell) => {
    RemoveImg(cell)
    cell.classList.remove("X");
    cell.classList.remove("O");
    cell.removeEventListener("click", handleClick);  
    // each cells  can be pressed just once
    cell.addEventListener("click", handleClick, { once: true });
  });
}

function handleClick(e) {

  const cell = e.target;
  toggleImage(cell);
  const currentClass = circleTurn ? "O" : "X";
  //place-mark
  placeMark(cell, currentClass);
  swapTurns();
  if (checkWin(currentClass)) {
    Winpage.classList.remove("hidden");
    WinMsg.innerHTML = currentClass + "'s Won!!";

  } else if (isDraw()) {
    Winpage.classList.remove("hidden");
    WinMsg.innerHTML = "It's a Draw!";
  }

}

//marks cells
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

//swaps turns
function swapTurns() {
  circleTurn = !circleTurn;
}

//checks the winner class
function checkWin(currentClass) {
  return winCombo.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

//check if Draw
function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("X") || cell.classList.contains("O");
  });
}

// toggles the images
function toggleImage(cell) {
  const xImage = cell.querySelector(".X");
  const oImage = cell.querySelector(".O");

  if (circleTurn) {
    xImage.classList.add("hidden");
    oImage.classList.remove("hidden");
  } else {
    oImage.classList.add("hidden");
    xImage.classList.remove("hidden");
  }
}

function RemoveImg(cell) {
    const xImage = cell.querySelector(".X");
    const oImage = cell.querySelector(".O");
    xImage.classList.add("hidden");
    oImage.classList.add("hidden");
}
