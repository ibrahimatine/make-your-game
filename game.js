
import { drawPaddle, movePaddle, padCollision, movePaddleBool } from "./paddle.js";

import { ball, drawBall, moveBall, ballWallCollision, game_started, maxlives } from "./ball.js"

import { drawBricks, bricksToTitle, titleDiv, brickCollision, score } from "./bricks.js";


// gameboard variables
const gameBoard = document.querySelector(".game-board");
const gameBoardRect = gameBoard.getBoundingClientRect();
const gameCompStyles = window.getComputedStyle(gameBoard);



//game start boolean/title screen
let title_started = false

// gameover - no lives left
let game_over = false;
//scoreboard
let scoreboard = document.querySelector(".scoreboard");

//lives
let livesComp = 3;


//pause state
let paused = false;
const pausediv = document.getElementById("pauseDiv");
// gameBoard.append(pausediv);

//timer**********************************************************************************************************
let timer = 0;
let timeDiv = document.querySelector(".time ");
let firstTime = 0;
let a = false;

// sounds
const win_sound = new Audio('./assets/gamewin1.mp3')
const game_over_sound = new Audio('./assets/game-over.mp3')
const game_music = new Audio('./assets/game-music.mp3')

//score
let heartPoints = 0
let timePoints = 0
let finalscore = 0

function togglePause() {
  if (!paused) {
    pausediv.style.display = "flex";
    paused = true;
    window.addEventListener("keydown", (e) => {
      if (e.code === "KeyR") {
        window.location.reload("true");
      }
    });
  } else if (paused) {
    pausediv.style.display = "none";
    paused = false;
    gameLoop();
  }
}

window.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (title_started) {
    if (e.code === "KeyP") togglePause();
  }
});

window.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (title_started) {
    if (e.code === "Space") game_started.a = true;

  }
});

//title screen

function enterGame(title) {
  title.preventDefault();
  if (title.code === "Enter") {
    titleDiv.style.display = 'none'
    title_started = true
    requestAnimationFrame(gameLoop);

    window.removeEventListener("keydown", enterGame)

  }
}

window.addEventListener("keydown", enterGame)

//behaves funky within the game loop, frames stable nevertheless
drawBricks();

bricksToTitle();

//one time function
function updateTime(time) {
  updateTime = function () { };
  firstTime = time;
}

function gameOver() {
  const youLoseDiv = document.querySelector("#game-over");
  let scoreSpan = document.querySelector("#final-score");
  if (maxlives === 0) {

    finalscore =
      game_over = true;
    game_over_sound.play()
    youLoseDiv.style.display = "flex";
    scoreSpan.innerHTML = `Score:${score}`;
    window.addEventListener("keydown", (e) => {
      if (e.code === "KeyR") {
        window.location.reload("true");
      }
    });
  }
}

function final_score() {
  heartPoints = maxlives * 30
  if (timer < 80) {
    timePoints = (80 - timer) * 7
  }

  return score + heartPoints + timePoints
}

// When no bricks left, display you win div
function youWin() {
  let gameBricks = document.getElementsByClassName("brick");
  let youWinDiv = document.querySelector("#you-win");
  let scoreSpan = document.querySelector("#score");
  let secondsSpan = document.querySelector("#time");

  if (gameBricks.length == 0) {

    finalscore = final_score()



    win_sound.play()
    paused = true
    youWinDiv.style.display = "flex";
    scoreSpan.innerHTML = `Score:${finalscore}`;
    secondsSpan.innerHTML = `Time:${timer}s`;
    window.addEventListener("keydown", (e) => {
      if (e.code === "KeyR") {
        window.location.reload("true");
      }
    });
    // to stop the ball from moving
    game_started.a = false;
  }
}

// for the game music to keep playing 

// game music function


game_music.loop = true
// game_music.play()

let music = true


function game_music_toggle() {
  let sound_div = document.getElementById('sound')
  if (!game_music.paused) {
    music = false
    sound_div.classList.remove('fa-volume-high')
    sound_div.classList.add('fa-volume-xmark')
    //game_music.pause()
  } else {
    music = true
    sound_div.classList.remove('fa-volume-xmark')
    sound_div.classList.add('fa-volume-high')
    // game_music.play()
  }

}
window.addEventListener('keydown', e => {
  if (e.code === "KeyM") {
    game_music_toggle()
  }
})



function gameLoop() {

  if (music) game_music.play()  
  if (!music) game_music.pause()

  if (title_started) {
    gameBoard.style.opacity = 1

    if (paused) {
      a = true;
      return;
    }

    //timer when paused
    if (!paused && a == true) {
      a = false;
      firstTime = performance.now() / 1000;
    }

    //out of bounds/deadball, psuedo-stops timer
    if (game_started.a && maxlives == livesComp) {
      livesComp--;
      firstTime = performance.now() / 1000;
    }

    scoreboard.innerHTML = score;
    drawPaddle();
    drawBall();
    movePaddleBool();
    movePaddle();
    timeDiv.innerHTML = `${timer}s`

    if (game_started.a) {
      moveBall();
      updateTime(performance.now() / 1000);

      if (performance.now() / 1000 > firstTime) {
        firstTime++;
        timer++;
      }
    }

    padCollision();
    ballWallCollision(performance.now() / 1000);
    brickCollision();
    scoreboard.innerHTML = score;
    gameOver();
    youWin();
    if (!game_over) {
      requestAnimationFrame(gameLoop);
    }
  }

}


requestAnimationFrame(gameLoop);

export { ball, gameCompStyles, maxlives }