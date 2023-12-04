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

// Fonction pour démarrer le jeu quand la touche Espace est enfoncée
function checkStartGame(event) {
  if (event.code === "Space") {
    startGame();
  }
}

// Ajoute l'événement pour écouter la touche Espace
document.addEventListener("keydown", checkStartGame);

conteneur.appendChild(gameover);

const ball = document.createElement("div");
ball.style.position = "absolute";
ball.style.width = "20px";
ball.style.height = "20px";
ball.style.backgroundColor = "black";
ball.style.borderRadius = "50%";
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
paddle.style.bottom = "0px";
paddle.style.left = "50%";
paddle.style.transform = "translateX(-50%)";
conteneur.appendChild(paddle);



let paddleMovement = {
  left: false,
  right: false,
};

 const keyMap = {
  ArrowLeft: 'left',
  ArrowRight: 'right'
};

// Fonction pour gérer l'événement de pression des touches
function keyDown(event) {
  const key = keyMap[event.key];
  if (key === 'left') {
    paddleMovement.left = true;
  } else if (key === 'right') {
    paddleMovement.right = true;
  }
}

// Fonction pour gérer l'événement de relâchement des touches
function keyUp(event) {
  const key = keyMap[event.key];
  if (key === 'left') {
    paddleMovement.left = false;
  } else if (key === 'right') {
    paddleMovement.right = false;
  }
}

// Ajout des écouteurs d'événements optimisés
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);


const player = {
  gameover: true,
  score: 0,
  lives: 3,
  ballDir: { x: 5, y: 5 },
};

function startGame() {
  if (player.gameover) {
    player.gameover = false;
    gameover.style.display = "none";
    player.score = 0;
    player.lives = 3;
    ball.style.display = "block";
    player.ballDir = { x: 5, y: 5 };
    setupBricks(100);
    scoreUpdater();
    window.requestAnimationFrame(moveBall);
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
      createBrick(rang);
    }
    rang.x += 100;
  }
}

function createBrick(pos) {
  const brick = document.createElement('div');
  brick.classList.add('brick');

  brick.style.backgroundColor = "brown";
  brick.style.width = "90px";
  brick.style.height = "40px";
  brick.style.position = "absolute";
  brick.style.left = pos.x + "px";
  brick.style.top = pos.y + "px";

  conteneur.appendChild(brick);
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
function restartGame() {
  player.gameover = true;
  startGame();
}

function moveBall() {
  const posBall = {
    x: ball.offsetLeft,
    y: ball.offsetTop,
  };
  
  const ballWidth = 20;
  const ballHeight = 20;
  
  if (posBall.y > dimensionRec.height - ballHeight || posBall.y < 0) {
    player.ballDir.y *= -1;
  }
  if (posBall.x > dimensionRec.width - ballWidth || posBall.x < 0) {
    player.ballDir.x *= -1;
  }
  if (posBall.y > dimensionRec.height - ballHeight) {
    player.lives--;
    livesDisplay.textContent = `Lives: ${player.lives}`;
    if (player.lives <= 0) {
      player.gameover = true;
    } else {
      // Reset ball position and direction for next life
      ball.style.display = "none";
      posBall.x = dimensionRec.width / 2;
      posBall.y = dimensionRec.height / 2;
      player.ballDir = { x: 5, y: 5 };
      ball.style.left = posBall.x + "px";
      ball.style.top = posBall.y + "px";
      setTimeout(() => {
        ball.style.display = "block";
        window.requestAnimationFrame(moveBall);
      }, 1000); // Delay before starting next life
      return;
    }
  }
  
  if (collision(paddle, ball)) {
    const temp = ((posBall.x - paddle.offsetLeft) - (paddle.offsetWidth / 2)) / 10;
    player.ballDir.x = temp;
    player.ballDir.y *= -1;
  }

  posBall.x += player.ballDir.x * 0.7;
  posBall.y += player.ballDir.y * 0.7;

  ball.style.left = posBall.x + "px";
  ball.style.top = posBall.y + "px";

  const bricks = document.querySelectorAll('.brick');
  bricks.forEach(brick => {
    if (collision(brick, ball)) {
      player.ballDir.y *= -1;
      brick.parentNode.removeChild(brick);
      player.score += 10;
      scoreUpdater();
    }
  });


  let position = paddle.offsetLeft;
  const paddleWidth = paddle.offsetWidth;
  const paddleMoveSpeed = 5;

  if (paddleMovement.left && position > 0) {
    position = Math.max(0, position - paddleMoveSpeed);
  }
  if (paddleMovement.right && position < dimensionRec.width - paddleWidth) {
    position = Math.min(dimensionRec.width - paddleWidth, position + paddleMoveSpeed);
  }

  paddle.style.left = position + "px";


  if (!player.gameover) {
    window.requestAnimationFrame(moveBall);
  } else {
    gameover.style.display = "block";
  }
}
