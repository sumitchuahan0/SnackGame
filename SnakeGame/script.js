let board = document.querySelector(".board");
const blockheight = 30;
const blockwidth = 30;
const cols = Math.floor(board.clientWidth/blockwidth);
const rows = Math.floor(board.clientHeight/blockheight);
let interval = null;
let timerintervalId=null;
const blocks = [];
let snack = [{x:4,y:4}];
let direction  ="down";
let food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
const startbutton = document.querySelector(".btn-start")
const restartbutton = document.querySelector(".btn-restart")
const modal = document.querySelector(".modal")
const startgame = document.querySelector(".start-game")
const gameover = document.querySelector(".game-over")
let highscoreElement = document.querySelector("#high-score")
let scoreElement = document.querySelector("#score")
let timeElement = document.querySelector("#time")

let highscore = localStorage.getItem("highScore")||0;
let score = 0;
let time = `00-00`;
 highscoreElement.innerText = highscore;


for(let row = 0 ; row<rows; row++){
    for(let col  = 0; col<cols; col++){
        const block = document.createElement("div");
        block.classList.add("hide");
        block.classList.add("block");
      
        board.appendChild(block);

        // block.innerText = `${row}-${col}`;
        blocks[`${row}-${col}`]=block;
    }
}

function render(){
    
    let head = null;
   
  blocks[`${food.x}-${food.y}`].classList.add("food");

 if(direction==="left"){
    head = {x:snack[0].x,y:snack[0].y-1}
   
}else if(direction==="right"){
     head = {x:snack[0].x,y:snack[0].y+1}
}
else if(direction==="down"){
     head = {x:snack[0].x+1,y:snack[0].y}
}
else if(direction==="up"){
     head = {x:snack[0].x-1,y:snack[0].y}
}

if(head.x<0||head.x>=rows||head.y<0||head.y>=cols ||snack.some(segment =>
  segment.x === head.x && segment.y === head.y
)
){

  clearInterval(interval);
   modal.style.display = "flex"
  startgame.style.display = "none"
  gameover.style.display = "flex"

  return;
}

if(head.x==food.x && head.y==food.y){
      blocks[`${food.x}-${food.y}`].classList.remove("food");
      food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
      snack.unshift(head);
      score+=10;
      scoreElement.innerText = score;
    if(score>highscore){
        highscore=score;
        localStorage.setItem("highScore",highscore.toString());
    }
}
  snack.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    })
 
  snack.unshift(head);
  snack.pop();
    snack.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    })
   
}





startbutton.addEventListener("click",function(){
    modal.style.display ="none"
   interval= setInterval(()=>{render()},200);
   timerintervalId  = setInterval(()=>{
    let [min,sec] = time.split("-").map(Number);

    if(sec==59){
        min+=1;
        sec = 0;
    }else{
        sec+=1;
    }
     time = `${min}-${sec}`;
   timeElement.innerText = time;
   },1000);
   
  
   
})

restartbutton.addEventListener("click",function(){
    clearInterval(interval);
    clearInterval(timerintervalId);
    time = "00-00"
     timeElement.innerText = "00-00"
     timerintervalId  = setInterval(()=>{
    let [min,sec] = time.split("-").map(Number);

    if(sec==59){
        min+=1;
        sec = 0;
    }else{
        sec+=1;
    }
     time = `${min}-${sec}`;
   timeElement.innerText = time;
   },1000);
   
    highscoreElement.innerText = highscore;
    direction = "down";
    score=0;
    scoreElement.innerText ="0";
     blocks[`${food.x}-${food.y}`].classList.remove("food");
      snack.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    })
     modal.style.display = "none"
 snack = [{x:4,y:4}];
 food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
 interval=setInterval(()=>{
     render();
},200)
})

addEventListener("keydown",(event)=>{
   
        if(event.key === "ArrowRight"){
        direction = "right";
       }
       else if(event.key === "ArrowLeft"){
        direction = "left";
       }
      else if(event.key === "ArrowDown"){
        direction = "down";
      }
      else if(event.key==="ArrowUp"){
        direction = "up";
       }
    }
);
