const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let isJumping = false;
let position = 0;

// Identifica espaço pressionado para pular
function handleKeyUp(event) {
    // Espaço
    if (event.keyCode === 32) {
        if (!isJumping){
            jump();
        }
    }
}

// Funcao pular
function jump() {
    isJumping = true;
    // subindo 
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            //descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 15;
                    dino.style.bottom = position + 'px';    
                }
            }, 20);
        } else {
            position += 15;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

// Funcao que cria os cactus
function createCatus() {
    const cactus = document.createElement("div");
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;
    cactus.classList.add("cactus");
    cactus.style.left = 1000 + "px";
    background.appendChild(cactus);
    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            // Game over
            clearInterval(leftInterval);
            document.body.innerHTML = "<h1 class='game-over'>Fim de jogo</h1>"
        } else {                
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + "px";
        }
    }, 20);

    setTimeout(createCatus, randomTime);
}


createCatus();
document.addEventListener("keyup", handleKeyUp);