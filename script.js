const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset");
const turnIndicator = document.querySelector(".circle");
const result = document.querySelector(".result");

let turnX = true;
let gameOver = false;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [1, 4, 7],
  [6, 7, 8],
];

function updateTurnIndicator() {
  turnIndicator.style.left = turnX ? "0.7rem" : "4.7rem";
}

function boardIsFull() {
  return [...boxes].every((box) => box.innerText !== "");
}

function finishGame(message) {
  gameOver = true;
  result.innerText = message;
  boxes.forEach((box) => {
    box.disabled = true;
  });
}

function getWinner() {
  for (const [a, b, c] of winPatterns) {
    const pos1 = boxes[a].innerText;
    const pos2 = boxes[b].innerText;
    const pos3 = boxes[c].innerText;

    if (pos1 && pos1 === pos2 && pos1 === pos3) {
      return pos1;
    }
  }

  return null;
}

function handleResult() {
  const winner = getWinner();

  if (winner) {
    finishGame(`'${winner}' Win`);
    return true;
  }

  if (boardIsFull()) {
    finishGame("Draw");
    return true;
  }

  return false;
}

function getEmptyIndices() {
  return [...boxes]
    .map((box, index) => (box.innerText === "" ? index : -1))
    .filter((index) => index !== -1);
}

function wouldWin(index, symbol) {
  boxes[index].innerText = symbol;
  const win = getWinner() === symbol;
  boxes[index].innerText = "";
  return win;
}

function getBotMove() {
  const empty = getEmptyIndices();

  // 1) Win if possible.
  for (const idx of empty) {
    if (wouldWin(idx, "O")) return idx;
  }

  // 2) Block opponent's immediate win.
  for (const idx of empty) {
    if (wouldWin(idx, "X")) return idx;
  }

  // 3) Take center.
  if (boxes[4].innerText === "") return 4;

  // 4) Take a corner.
  const corners = [0, 2, 6, 8].filter((idx) => boxes[idx].innerText === "");
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];

  // 5) Take any remaining side.
  return empty[Math.floor(Math.random() * empty.length)];
}

function playMove(box, symbol) {
  box.innerText = symbol;
  box.disabled = true;
}

function botTurn() {
  if (gameOver) return;

  const botMoveIndex = getBotMove();
  if (botMoveIndex === undefined) return;

  playMove(boxes[botMoveIndex], "O");

  if (handleResult()) return;

  turnX = true;
  updateTurnIndicator();
}

function humanTurn(box) {
  if (gameOver || !turnX || box.innerText !== "") return;

  playMove(box, "X");

  if (handleResult()) return;

  turnX = false;
  updateTurnIndicator();

  setTimeout(botTurn, 250);
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    humanTurn(box);
  });
});

function resetGame() {
  turnX = true;
  gameOver = false;

  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });

  result.innerText = "";
  updateTurnIndicator();
}

resetBtn.addEventListener("click", resetGame);

updateTurnIndicator();
