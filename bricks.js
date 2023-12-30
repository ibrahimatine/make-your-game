
import { ballDiv, ball, ballRadius } from "./ball.js";

//title
const titleDiv = document.querySelector(".title-screen");

//score
let score = 0;


//sounds
const brick_collided_sound = new Audio('./assets/brickhit1.mp3')




//brick variables
const brick = document.createElement("div");
const docFrag = document.createDocumentFragment();
const titleFrag = document.createDocumentFragment();


// gameboard variables
const gameBoard = document.querySelector(".game-board");
const gameBoardRect = gameBoard.getBoundingClientRect();


const brick_width = 60;
const brick_height = 25;
const brick_rows = 5;
const brick_column = 5;
const brick_buffer = (gameBoardRect.width - brick_width * brick_rows) / brick_rows - 2;
let styleLeft = 9;
let styleTop = 50;

let bricks = {
  width: brick_width,
  height: brick_height,
  rows: brick_rows,
  columns: brick_column,
  style_left: styleLeft,
  style_top: styleTop,
};



function createBricks() {
  let id = 1;

  for (let i = 0; i < bricks.rows; i++) {
    for (let i = 0; i < bricks.columns; i++) {
      let brick = document.createElement("div");
      brick.classList.add("brick");
      brick.style.border = '2px solid red'
      brick.style.left = styleLeft + "px";
      brick.style.top = styleTop + "px";
      brick.style.height = bricks.height + "px";
      brick.style.width = bricks.width + "px";
      brick.style.backgroundColor = "pink";
      brick.style.position = "absolute";
      brick.id = id;
      id++;

      styleLeft += brick_width + brick_buffer;
      docFrag.appendChild(brick);
    }
    styleLeft = 9;
    styleTop += 55;
  }

  return docFrag;
}
function drawBricks() {
  let brickFrags = createBricks();
  gameBoard.appendChild(brickFrags);
}


//title screen

function titleBricks() {

  let Color = "rgb(217, 56, 136)"
  let titlebrickLeft = 50
  let titleBrickTop = 25
  //let randomColor2 = Math.floor(Math.random() * 16777215).toString(16);

  for (let i = 0; i < 14; i++) {
    if (i > 6) Color = ' rgb(172, 39, 245)'
    for (let i = 0; i < 4; i++) {
      let titleBrick = document.createElement("div");
      titleBrick.classList.add("title-brick");
      titleBrick.style.left = titlebrickLeft + "px";
      titleBrick.style.top = titleBrickTop + "px";
      titleBrick.style.height = bricks.height + "px";
      titleBrick.style.width = bricks.width + "px";
      titleBrick.style.backgroundColor = Color;
      titleBrick.style.position = "absolute";

      titlebrickLeft += brick_width + brick_buffer;
      titleFrag.appendChild(titleBrick);
    }
    titlebrickLeft = 50;
    titleBrickTop += 35;
  }

  return titleFrag;
}



function bricksToTitle() {
  const titleBrics = titleBricks();
  titleDiv.append(titleBrics);
}

////////////////



function brickCollision() {
  let gameBricks = document.getElementsByClassName("brick");

  for (let i = 0; i < gameBricks.length; i++) {
    const ballRect = ballDiv.getBoundingClientRect();


    if (
      ball.deltaY < 0 &&
      ballRect.bottom > gameBricks[i].getBoundingClientRect().bottom &&
      Math.floor(ballRect.top) <= gameBricks[i].getBoundingClientRect().bottom &&
      ballRect.left > gameBricks[i].getBoundingClientRect().left - ballRadius * 2 &&
      ballRect.right < gameBricks[i].getBoundingClientRect().right + ballRadius * 2
    ) {

      score += 1;
      gameBricks[i].remove();
      ball.deltaY = Math.abs(ball.deltaY);
      brick_collided_sound.play()
      //top of brick collison
    } else if (
      ball.deltaY > 0 &&
      ballRect.top < gameBricks[i].getBoundingClientRect().top &&
      ballRect.bottom >= gameBricks[i].getBoundingClientRect().top &&
      ballRect.left > gameBricks[i].getBoundingClientRect().left - ballRadius * 2 &&
      ballRect.right < gameBricks[i].getBoundingClientRect().right + ballRadius * 2
    ) {

      score += 1;
      gameBricks[i].remove();
      ball.deltaY = -Math.abs(ball.deltaY);
      brick_collided_sound.play()
      //right of brick collision
    } else if (
      ballRect.right > gameBricks[i].getBoundingClientRect().right &&
      ballRect.left <= gameBricks[i].getBoundingClientRect().right &&
      ((ballRect.top > gameBricks[i].getBoundingClientRect().top - ball.radius && ballRect.bottom < gameBricks[i].getBoundingClientRect().bottom + ball.radius)
      )) {


      score += 1;
      gameBricks[i].remove();

      ball.deltaX = Math.abs(ball.deltaX);
      brick_collided_sound.play()
      //left of brick collision
    } else if (
      ballRect.left < gameBricks[i].getBoundingClientRect().left &&
      ballRect.right >= gameBricks[i].getBoundingClientRect().left &&
      ((ballRect.top > gameBricks[i].getBoundingClientRect().top - ball.radius && ballRect.bottom < gameBricks[i].getBoundingClientRect().bottom + ball.radius)
      )
    ) {
      // (ballRect.bottom > gameBricks[i].getBoundingClientRect().bottom && ballRect.top < gameBricks[i].getBoundingClientRect().bottom)
      score += 1;
      gameBricks[i].remove();
      ball.deltaX = -Math.abs(ball.deltaX);
      brick_collided_sound.play()
    }
  }
}





export { docFrag, titleFrag, createBricks, drawBricks, titleBricks, bricksToTitle, titleDiv, brickCollision, score }