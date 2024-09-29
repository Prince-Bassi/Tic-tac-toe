const gameElem = document.querySelector(".game"); //main game element
const boxList = document.querySelectorAll(".game .box"); //node list of boxes

class Player {
       constructor() {
              this.name = "";
              this.sign = "";
       }
}

class Box { //main box class for saving the onwer and seperating box methods
       constructor (box, game) {
              this.box = box;
              this.owner = "";
              this.game = game;

              this.box.addEventListener("click", () => {
                     if (game.turn === "user" && this.owner == "") {
                            this.press(game.turn);
                     }
              });
       }

       press(presser) {
              this.owner = presser;  //so i am going for making an owner of a box be either user or comp so i can set the sign
              this.box.textContent = presser;
              if (presser == "user") {
                     this.game.turn = "computer";
                     this.game.pressComputer();
              }
       }
}

class TicTacToe { //main game class, handles the game logic and flow
       constructor(elem, boxes) {
              this.elem = elem;
              this.boxes = [];
              this.turn = "user";

              for (let box of boxes) { //makes a list of box objects
                     let boxObj = new Box(box, this);
                     this.boxes.push(boxObj);
              }
       }

       pressComputer() {
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
       }
}

game = new TicTacToe(gameElem, boxList); //main game object
