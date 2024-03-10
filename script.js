let boxes = document.querySelectorAll(".box");
let btn = document.querySelector(".reset");
let turnX = true;
const win_patterns = [
  ["0", "1", "2"],
  ["0", "3", "6"],
  ["0", "4", "8"],
  ["2", "4", "6"],
  ["2", "5", "8"],
  ["3", "4", "5"],
  ["1", "4", "7"],
  ["6", "7", "8"],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerText = "O";
      turnX = false;
    } else {
      box.innerText = "X";
      turnX = true;
    }
    box.disabled = true;

    // Check for win after each move
    for (pattern of win_patterns) {
      console.log(
        boxes[pattern[0]].innerText,
        boxes[pattern[1]].innerText,
        boxes[pattern[2]].innerText
      );
      let pos1 = boxes[pattern[0]].innerText;
      let pos2 = boxes[pattern[1]].innerText;
      let pos3 = boxes[pattern[2]].innerText;
      if (pos1 != "" && pos2 != "" && pos3 != "") {
        if (pos1 === pos2 && pos1 === pos3) {
          console.log(`Player ${pos1} wins!`);
          boxes.forEach((box) => (box.disabled = true));
          if (pos1 === "X") {
            document.querySelector(".result").innerText = "'X' Win";
          } else if(pos1 === "O") {
            document.querySelector(".result").innerText = "'O' Win";
          }
        }
      }
    }
  });
});
btn.addEventListener("click", () => {
  // location.reload(true);
  boxes.forEach((box) => {
    box.innerText = null;
    box.disabled = false;
    document.querySelector(".result").innerText = "";
  });
});
