conteneur = document.querySelector('#game-container')
let conDim = conteneur.getBoundingClientRect();

const gameover = document.createElement('div');
gameover.textContent = "Start Game";
gameover.style.position = "absolute";
gameover.style.color = "black";
gameover.style.fontSize = "20px";
gameover.style.textAlign = "center";
gameover.style.width = "100 %";
gameover.style.backgroundColor = "none";
gameover.style.textTransform = "uppercase";
gameover.style.fontSize = "3em";
gameover.addEventListener("click", startGame);
conteneur.appendChild(gameover);

const ball = document.createElement('div');
ball.style.position = "absolute";
ball.style.width = "20px";
ball.style.height = "20px";
ball.style.backgroundColor = "black";
ball.style.borderRadius = "25px";
ball.style.display = "none";
conteneur.appendChild(ball);

const paddle = document.createElement('div');
paddle.style.position = 'absolute';
paddle.style.width = '100px';
paddle.style.height = '20px';
paddle.style.borderRadius = '25px';
paddle.style.backgroundColor = 'blue';
paddle.style.bottom = '30px';
paddle.style.left = '50%';
conteneur.appendChild(paddle);

document.addEventListener('keydown', function (e) {
    console.log(e.keyCode);
    if (e.keyCode === 37) paddle.left = true;
    if (e.keyCode === 39) paddle.right = true;
})

document.addEventListener('keyup', function (e) {
    console.log(e.keyCode);
    if (e.keyCode === 37) paddle.left = false;
    if (e.keyCode === 39) paddle.right = false;
})

const player = {
    gameover:true
}

// demarer le game
function startGame() {
    console.log('start');
    if (player.gameover){
        player.gameover=false;
        gameover.style.display = "none";
        player.score = 0;
        player.lives = 3;
        ball.style.display = "block";
        //
        scoreUpdater();
        window.requestAnimationFrame(deplace);

    }
}

function setupBricks(nbr){
    let rang= {
        x:((conDim.width % 100)/2),
        y:50
    }
    for ( let x=0;x<nbr;nbr++) {
        console.log(rang);
        if (rang.x >(conDim.width-100)) {
            rang.y += 50;
            rang.x = ((conDim.width % 100)/2);
        }
        rang.count =x;
        createbrick(rang); 
        rang.x += 100;
    }
}

function createbrick(pos) {
    const div = document.createElement('div');
    div.setAttribute('class','brick');

    div.style.backgroundColor = 'brown';
    div.textContent= pos.count;
    div.style.left = pos.x + 'px';
    div.style.top = pos.y + 'px';

    conteneur.appendChild(div);

}

function scoreUpdater() {
    document.querySelector('.score').textContent = player.score;
    document.querySelector('.lives').textContent = player.lives;
}

// cette fonction permet de déplacer le paddle 
function deplace() {
    let positon = paddle.offsetLeft;
    console.log(positon);
    if (paddle.left) {
        positon -= 5;
    }
    if (paddle.right) {
        positon += 5;
    }
    paddle.style.left = positon + 'px';
    window.requestAnimationFrame(deplace);
}    