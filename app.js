conteneur = document.querySelector('#game-container')
const paddle =  document.createElement('div');

    paddle.style.position= 'absolute';
    paddle.style.width= '100px';
    paddle.style.height= '20px';
    paddle.style.borderRadius= '25px';
    paddle.style.backgroundColor= 'blue';
    paddle.style.bottom= '30px';
    paddle.style.left= '50%';

    conteneur.appendChild(paddle);
    
    document.addEventListener('keydown', function(e) {
     console.log(e.keyCode);
    if (e.keyCode===37) paddle.left = true;
    if (e.keyCode===39) paddle.right = true;
    })
    
    function startGame() {
        window.requestAnimationFrame(update);
    }

    function update() {
        let pCurrent = paddle.offsetLeft;
        console.log(pCurrent);
        if(paddle.left) {
            pCurrent -= 5;
        }    
        paddle.style.left = pCurrent + 'px';
        window.requestAnimationFrame(update);
    }    








    // function allBricks (nbr){
    //     for (let i = 0; i < nbr; i++) {
    //         const brick = document.createElement('div');
    //         brick.classList.add('brick');
    //         gameContainer.appendChild(brick);
    //     }
    // }
    
    // allBricks(100);