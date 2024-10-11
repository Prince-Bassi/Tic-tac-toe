const gameElem = document.querySelector(".game"); //main game element
const boxList = document.querySelectorAll(".game .box"); //node list of boxes
const PLAYERX = "Prince";
const PLAYERO = "Princess";

class Box { //main box class for saving the onwer and seperating box methods
       constructor (box, game) {
              this.box = box;
              this.owner = "";
              this.game = game;
              this.clickFunc = () => {
                     if (this.owner == "") {
                            this.press(this.game.activePlayer, this.game.players);
                     }
              };

              this.box.addEventListener("click", this.clickFunc);
       }

       reset() {
              this.owner = "";
              this.box.textContent = "";
              this.box.addEventListener("click", this.clickFunc);
       }

       press(activePlayer, players) {
              const playerIndex = players.indexOf(activePlayer);
              const playerSign = (playerIndex) ? "X" : "O";

              this.box.textContent = playerSign;
              this.owner = activePlayer;
              this.game.changeTurn(playerIndex);

              //Start player vs computer code here
       }
}

class TicTacToe { //main game class, handles the game logic and flow
       constructor(elem, boxes) {
              this.elem = elem;
              this.boxes = [];
              this.players = [PLAYERO, PLAYERX];

              this.activePlayer = this.players[Math.floor(Math.random() * 2)];

              for (let i = 0; i < 3; i++) {
                     const currentRow = [];
                     for (let j = 0; j < 3; j++) {
                            const boxObj = new Box(boxes[(3*i) + j], this);
                            currentRow.push(boxObj);
                     }
                     this.boxes.push(currentRow);
              }
       }

       changeTurn(playerIndex) {
              this.checkGameOver();
              this.activePlayer = this.players[+!playerIndex];
       }

       checkGameOver() {
              //Row
              for (const row of this.boxes) {
                     if (row[0].owner === row[1].owner && row[1].owner === row[2].owner && row[0].owner !== "") {
                            this.declareGameOver(false, row[0].owner);
                            return;
                     }
              }
              //Columns
              for (let i = 0; i < 3; i++) {
                     if (this.boxes[0][i].owner === this.boxes[1][i].owner && this.boxes[1][i].owner === this.boxes[2][i].owner && this.boxes[0][i].owner !== "") {
                            this.declareGameOver(false, this.boxes[0][i].owner);
                            return;
                     }
              }
              //Diagonals
              if (this.boxes[0][0].owner === this.boxes[1][1].owner && this.boxes[1][1].owner === this.boxes[2][2].owner && this.boxes[0][0].owner !== "") {
                     this.declareGameOver(false, this.boxes[0][0].owner);
                     return;
              }
              else if (this.boxes[0][2].owner === this.boxes[1][1].owner && this.boxes[1][1].owner === this.boxes[2][0].owner && this.boxes[0][2].owner !== "") {
                     this.declareGameOver(false, this.boxes[0][2].owner);
                     return;
              }
              
              let boardFull = true;
              for (let i = 0; i < 3; i++) {
                     let rowFull = this.boxes[i].every(box => box.owner !== "");

                     if (!rowFull) {
                            boardFull = false;
                            break;
                     }
              }

              if (boardFull) {
                     this.declareGameOver(true);
              }
       }

       declareGameOver(tie, winner) {
              if (tie) {
                     console.log("Its a tie");
                     return;
              }

              for (let i = 0; i < this.boxes.length; i++) {
                     for (let j = 0; j < this.boxes[i].length; j++) {
                            this.boxes[i][j].box.removeEventListener("click", this.boxes[i][j].clickFunc);
                     }
              }
              console.log(winner, "won");
       }

       resetBoard() {
              // this.players = [PLAYERO, PLAYERX]; The logic for getting different players
              this.activePlayer = this.players[Math.floor(Math.random() * 2)];
              for (let i = 0; i < this.boxes.length; i++) {
                     for (let j = 0; j < this.boxes[i].length; j++) {
                            this.boxes[i][j].reset();
                     }
              }
       }

       /*pressComputer() {
              let randomIndex = Math.floor(Math.random() * this.boxes.length);
              let n = 1;
              while (this.boxes[randomIndex].owner != "" && n < 10) {
                     randomIndex = Math.floor(Math.random() * this.boxes.length)
                     n++;
              }

              if (this.boxes[randomIndex].owner != "") {
                     return
              }

              this.boxes[randomIndex].press("computer");
              this.turn = "user";
       }*/
}

game = new TicTacToe(gameElem, boxList);

document.addEventListener("keydown", (event) => {
       if (event.key == "l") {
              game.resetBoard();
       }
});