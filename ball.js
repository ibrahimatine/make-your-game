import { pad, pad_start } from './paddle.js';
import { gameCompStyles } from './game.js';

// gameboard variables
const gameBoard = document.querySelector('.game-board');
const gameBoardRect = gameBoard.getBoundingClientRect();

// paddle variables
const paddle_width = 100;
const paddle_margin_bottom = 10;
const paddle_height = 20;

//sounds
const life_lost_sound = new Audio('./assets/life-lost.mp3');

//game started
let game_started = { a: false };

//paddle
let pad_y = gameBoardRect.height - paddle_margin_bottom - paddle_height;

//lives
let maxlives = 3;
let livesbox = document.querySelector('.lives');
livesbox.innerHTML = '&#10084'.repeat(maxlives);

// ball variables
const ballDiv = document.createElement('div');
const ballRadius = 10;
const defaultValue = 'translate(0,0)';
ballDiv.setAttribute('transform', defaultValue);

const ball = {
  x: gameBoardRect.width / 2 - ballRadius,
  y: pad_y - 2 * ballRadius,
  // the speed value can eventually change
  speed: 3,
  radius: ballRadius,
  // these are the properties that x and y change by.
  deltaX: 4 * (Math.random() * 2 - 1),
  deltaY: -4,
};

function drawBall() {
  ballDiv.classList.add('ball');
  ballDiv.style.top = ball.y + 'px';
  ballDiv.style.left = ball.x + 'px';
  ballDiv.style.height = '14px';
  ballDiv.style.width = '14px';
  ballDiv.style.borderRadius = '10px';
  ballDiv.style.position = 'absolute';
  ballDiv.style.backgroundColor = 'silver';
  gameBoard.append(ballDiv);
}

function moveBall() {
  ball.x += ball.deltaX;
  ball.y += ball.deltaY;
}

// CHECK WHY WE NEED THESE VARIABLES
function ballWallCollision() {
  //tried make the below two variables global but causes errors
  const ballRect = ballDiv.getBoundingClientRect();
  const padRect = pad.getBoundingClientRect();

  // collided with right side
  if (ballRect.right + parseInt(gameCompStyles.border) >= gameBoardRect.right) {
    ball.deltaX = -Math.abs(ball.deltaX);
  }
  // collided with top
  if (ballRect.top - parseInt(gameCompStyles.border) <= gameBoardRect.top) {
    ball.deltaY = Math.abs(ball.deltaY);
  }

  // collided with left
  if (ballRect.left - parseInt(gameCompStyles.border) <= gameBoardRect.left) {
    ball.deltaX = Math.abs(ball.deltaX);
  }

  // if the ball hits goes past the paddle (i.e lose a life), all the logic for what happens should be here
  if (ballRect.top > padRect.top + 0.5 * padRect.height) {
    // reset the ball to middle of pad

    ball.x = gameBoardRect.width / 2 - ballRadius;
    ball.y = pad_y - 2 * ballRadius;
    // console.log(paddle.start);
    ballDiv.style.transform = `translateX(${pad_start.a}px)`;
    maxlives -= 1;
    if (maxlives !== 0) {
      life_lost_sound.play();
    }
    livesbox.innerHTML = '&#10084'.repeat(maxlives);
    game_started.a = false;
  }
  
}

export {
  ballDiv,
  ballRadius,
  ball,
  drawBall,
  moveBall,
  ballWallCollision,
  maxlives,
  game_started,
};
