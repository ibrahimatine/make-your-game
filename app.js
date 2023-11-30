const conteneur = document.querySelector("#game-container");
let dimensionRec = conteneur.getBoundingClientRect();

const gameover = document.createElement("div");
gameover.textContent = "Start Game";
gameover.style.position = "absolute";
gameover.style.color = "black";
gameover.style.textAlign = "center";
gameover.style.width = "100%";
gameover.style.backgroundColor = "none";
gameover.style.textTransform = "uppercase";
gameover.style.fontSize = "3em";
gameover.addEventListener("click", startGame);
conteneur.appendChild(gameover);

const ball = document.createElement("div");
ball.style.position = "absolute";
ball.style.width = "20px";
ball.style.height = "20px";
ball.style.backgroundColor = "black";
ball.style.borderRadius = "25px";
ball.style.display = "none";
ball.style.top = "70%";
ball.style.left = "50%";
conteneur.appendChild(ball);

const paddle = document.createElement("div");
paddle.style.position = "absolute";
paddle.style.width = "100px";
paddle.style.height = "20px";
paddle.style.borderRadius = "25px";
paddle.style.backgroundColor = "blue";
paddle.style.bottom = "30px";
paddle.style.left = "50%";
paddle.style.transform = "translateX(-50%)";
conteneur.appendChild(paddle);

document.addEventListener("keydown", function (e) {
  if (e.keyCode === 37) paddle.left = true;
  if (e.keyCode === 39) paddle.right = true;
});

document.addEventListener("keyup", function (e) {
  if (e.keyCode === 37) paddle.left = false;
  if (e.keyCode === 39) paddle.right = false;
});

const player = {
  gameover: true,
};

function startGame() {
  if (player.gameover) {
    player.gameover = false;
    gameover.style.display = "none";
    player.score = 0;
    player.lives = 3;
    ball.style.display = "block";
    player.ballDir = [5,5];
    setupBricks(100);
    scoreUpdater();
    window.requestAnimationFrame(deplace);
  }
}

function setupBricks(nbr) {
  let rang = {
    x: (dimensionRec.width % 100) / 2,
    y: 50,
  };
  let saut = false;
  for (let x = 0; x < nbr; x++) {
    if (rang.x > dimensionRec.width - 100) {
      rang.y += 50;
      if (rang.y > dimensionRec.height / 2) {
        saut = true;
      }
      rang.x = (dimensionRec.width % 100) / 2;
    }
    rang.count = x;
    if (!saut) {
      createbrick(rang);
    }
    rang.x += 100;
  }
}

function createbrick(pos) {
  const div = document.createElement('div');
  div.classList.add('brick');

  div.style.backgroundColor = "brown";
  div.style.width = "90px";
  div.style.height = "40px";
  div.style.position = "absolute";
  div.style.left = pos.x + "px";
  div.style.top = pos.y + "px";

  conteneur.appendChild(div);
}

function collision(elem1, elem2) {
  const elem1Rect = elem1.getBoundingClientRect();
  const elem2Rect = elem2.getBoundingClientRect();

  return !(
    elem1Rect.right < elem2Rect.left ||
    elem1Rect.left > elem2Rect.right ||
    elem1Rect.bottom < elem2Rect.top ||
    elem1Rect.top > elem2Rect.bottom
  );
}

function scoreUpdater() {
  document.querySelector(".score").textContent = player.score;
  document.querySelector(".lives").textContent = player.lives;
}

function deplace() {
  let position = paddle.offsetLeft;
  moveBall();

  if (paddle.left && position > 0) { 
    position -= 5;
  }
  if (paddle.right && position < dimensionRec.width - paddle.offsetWidth) { 
    position += 5;
  }

  paddle.style.left = position + "px";
  window.requestAnimationFrame(deplace);
}

function moveBall() {
  let posBall = {
    x: ball.offsetLeft,
    y: ball.offsetTop,
  };
  if (posBall.y > dimensionRec.height - 20 || posBall.y < 0) {
    player.ballDir[1] *= -1;
  }
  if (posBall.x > dimensionRec.width - 20 || posBall.x < 0) {
    player.ballDir[0] *= -1;
  }
  if (collision(paddle, ball)) {
    let temp = ((posBall.x - paddle.offsetLeft) - (paddle.offsetWidth / 2)) / 10;
    player.ballDir[0] = temp;
    player.ballDir[1] *= -1;
  }

  posBall.x += player.ballDir[0]*0.7;
  posBall.y += player.ballDir[1]*0.7;

  ball.style.left = posBall.x + "px";
  ball.style.top = posBall.y + "px";

  let bricks = document.querySelectorAll('.brick');
  bricks.forEach(brick => {
    if (collision(brick, ball)) {
      player.ballDir[1] *= -1;
      brick.parentNode.removeChild(brick);
      player.score += 1;
      scoreUpdater();
    }
  });

  window.requestAnimationFrame(moveBall);
}
 