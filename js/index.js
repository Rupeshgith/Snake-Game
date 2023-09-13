// Game Constants & Variables   //////////
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 19;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [ {x: 13, y: 15}];
let food = {x: 6, y: 7};


function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime= ctime;
      gameEngine();

}

/************************************** collsion function for game over  ***********/
function isCollide(snake) {
    ///////// If snake bump into itself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    ///////// If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    
     if(isCollide(snakeArr)){
        musicSound.pause();
        gameOverSound.play();
        alert("Game-Over.Enter arrowkey to start again");
        musicSound.play();
         inputDir = {x: 0, y: 0}; 
         snakeArr = [ {x: 13, y: 15}];
         food = {x: 6, y: 7};
         score=0;
     }


    ////////////////////////////////////////     movements of snake and food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
       foodSound.play();
       score += 1;
       scorebox.innerHTML= "Score : " + score;

       snakeArr.unshift({x: (snakeArr[0].x+ inputDir.x) , y: (snakeArr[0].y+inputDir.y)});
       let a= 1;
       let b= 17;
       food= {x: Math.round(a+(b-a)*Math.random()) , y: Math.round(a+(b-a)*Math.random()) }
       

    }

    for(let i=snakeArr.length-2 ;i>=0 ;i--){
        snakeArr[i+1]= {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    
    ///////////////////////////////////////     display snake and food
    ////// display snake   //////

    board.innerHTML= "";
    snakeArr.forEach((e,index)=>{
       let snakelement= document.createElement('div');
       snakelement.style.gridColumnStart= e.x;
       snakelement.style.gridRowStart= e.y;
       if(index === 0){
           snakelement.classList.add("head");
       }
       else{
        snakelement.classList.add("snake");
       }
       board.append(snakelement);
    })
      //////// display food  ///////

    let foodelement = document.createElement('div');
       foodelement.style.gridColumnStart= food.x;
       foodelement.style.gridRowStart= food.y;
       foodelement.classList.add("food");
       board.append(foodelement);

}

/*********************************  operating through arrowkeys   **************/
window.requestAnimationFrame(main)
window.addEventListener('keydown',(e)=>{/////////// start game
    musicSound.play();
    moveSound.play()
   inputDir= {x :0,y:1};
   switch(e.key){
       case "ArrowUp":
             inputDir.x= 0;
             inputDir.y= -1;
             break;
    
        case "ArrowDown":
             inputDir.x= 0;
             inputDir.y= 1;
             break;
                
        case "ArrowLeft":
             inputDir.x= -1;
             inputDir.y= 0;
             break;

        case "ArrowRight":
             inputDir.x= 1;
             inputDir.y= 0;
             break;
        default:
            break;
    
    }

})