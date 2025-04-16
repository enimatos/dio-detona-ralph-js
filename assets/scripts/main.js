const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        gameVelocity:900,
        hitPosition: 0,
        result: 0,
        currentTime: 10,
        currentLives: 3,
    },
    
    actions: {
        timerId:setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function playSound(audioName){
    let audio = new Audio(`./assets/audios/${audioName}`);
    audio.volume = 0.2;
    audio.play()

}

function resetGame(){
    state.values.currentTime = 10;
    state.view.timeLeft.textContent = state.values.currentTime;

    state.values.result = 0;
    state.view.score.textContent = state.values.result;

    // Limpa inimigos anteriores
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    randomSquare();
    
    // Limpa intervalos antigos (se existirem)
    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimerId);

    // Inicia novamente os intervalos
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime === 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert('Game Over! O seu resultado foi: ' + state.values.result);

        if(state.values.currentLives !== 0){
            state.values.currentLives--;
            
            if(state.values.currentLives > 0){
                state.view.lives.textContent = state.values.currentLives;
                const playAgain = confirm("Você perdeu uma vida. Deseja jogar novamente?");
                if(playAgain){
                    resetGame();
                }else{
                    alert("Obrigado pela companhia!");
                }
            }
        }else{
            alert('fim')
        }
        
        
    }
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })
    //sorteando número aleatório de 1 a 9 e pegando a parte inteira dele
    let randomNumber = Math.floor(Math.random() * 9);
    //pegando o quadrado na posição do número sorteado
    let randomSquare = state.view.squares[randomNumber];
    //adicionando função add ao classe
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}


//function moveEnemy(){
    //criando intervalo
 //   state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
//}
function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit.m4a");
            }
        });
    });
}

function main(){
    //moveEnemy();
    addListenerHitBox();
    resetGame();
}

main();