/*Description:  This is the implementation of snake game.
              This covers playground colour and snake speed change according to user.
              All the "Game over!" conditions are implemented here along with collision condition.*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//counting the score
var gameScore = document.getElementById('score');

const step = 32;

let snake = [];

//initial position of snake
snake[0] = {
    x: 10 * step,
    y: 10 * step
    };

//food position
let food = {
    x: Math.floor(Math.random() * 19) * step,
    y: Math.floor(Math.random() * 19) * step
}


let snakeRunningDirection;
var pause = false;

//function for pause the game
function pausefunction(){

    if(pause){
        pause = false;
    }else{
        pause = true;
    }
}

//key codes setup
function direction(event) {
    let key = event.keyCode;

    if (key === 37 && snakeRunningDirection !== "RIGHT") {
        snakeRunningDirection = "LEFT";
    } else if (key === 38 && snakeRunningDirection !== "DOWN") {
        snakeRunningDirection = "UP";
    } else if (key === 39 && snakeRunningDirection !== "LEFT") {
        snakeRunningDirection = "RIGHT";
    } else if (key === 40 && snakeRunningDirection !== "UP") {
        snakeRunningDirection = "DOWN";
    }
    if(key===80){           // if you press "P", this will call the pausefunction.
        pausefunction();
    }
}

document.addEventListener("keydown", direction);    //it will call direction function when above keys are pressed.

//collision function: when snake hit himself.
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}


let score = 0;

//drawing on the canvas.
function draw() {
    
    //baground color for the canvas
    ctx.fillStyle = playGroundColor;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //the food point
    ctx.fillStyle= "blue";
    ctx.fillRect(food.x,food.y,30,30);
    ctx.stroke();

    //snake head remain red. body will be yellow.
    //snake body co-ordinates
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "red" : "yellow";
        ctx.fillRect(snake[i].x, snake[i].y, step, step);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, step, step);
    }

    //if "P" is pressed then it will do nothing means. the game will be paused.
    if(pause){
        
    }else{
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    if(snakeRunningDirection === "LEFT") {
        snakeX -= step;
    }
    if (snakeRunningDirection === "UP") {
        snakeY -= step;
    }
    if (snakeRunningDirection === "RIGHT") {
        snakeX += step;
    }
    if (snakeRunningDirection === "DOWN") {
        snakeY += step;
    }



    if(snakeX === food.x && snakeY === food.y) {
        score++;                                // score counting when head meats food co-ordinates
        food = {
            x: Math.floor(Math.random() * 19) * step,
            y: Math.floor(Math.random() * 19) * step
        }
    } else {
        snake.pop()     //moving by leaving last co-ordinates.
    }

    //snake head
    let newHead = { 
        x: snakeX,
        y: snakeY
    }
    
    //Game over! conditions.
    if (snakeX < 0 || snakeX >= 19 * step || snakeY < 0 || snakeY >= 19 * step || collision(newHead, snake)) {
        clearInterval(game);
        ctx.fillStyle = "red";
        ctx.font = "45px solid";
        ctx.fillText("Game Over",canvas.width/3,canvas.height/3);
        ctx.font = "30px solid";
        ctx.fillText("Refresh the window to play again.",canvas.width/6,canvas.height/2);
        // window.location.replace(window.location.href);
    }


    snake.unshift(newHead);          //
    gameScore.innerText = score;    // score will show at the page. 

    }  

}

// default color of playground is green.
var playGroundColor="green";

document.getElementById("greenPlayGround").addEventListener("click",function(){
    playGroundColor = "green";
    draw();
});
// pink color playground
document.getElementById("pinkPlayGround").addEventListener("click",function(){
    playGroundColor = "pink";
    draw();
});
// white color playground
document.getElementById("whitePlayGround").addEventListener("click",function(){
    playGroundColor = "white";
    draw();
});


var snakeSpeed;
let game;
draw();

//snake speeds. also this will call the draw function according to your choosen speed.
document.getElementById("speed80").addEventListener("click",function(){
    snakeSpeed = 80;
    game = setInterval(draw,snakeSpeed);
});

document.getElementById("speed100").addEventListener("click",function(){
    snakeSpeed = 100;
    game = setInterval(draw,snakeSpeed);
});

document.getElementById("speed200").addEventListener("click",function(){
    snakeSpeed = 200;
    game = setInterval(draw,snakeSpeed);
});

document.getElementById("restart").addEventListener("click",function(){
    location.reload();
})