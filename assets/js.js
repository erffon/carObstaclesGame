let startButton = document.querySelector('.startButton');
let welcomeScreen = document.querySelector('.welcome');
let gameArea = document.querySelector('.gameArea');
let car = document.querySelector('.car-container');

startButton.addEventListener('click',gameStart);

function gameStart (){

    //change screen
    gameArea.classList.remove('hidden');
    welcomeScreen.classList.add('hidden');

    //create lines
    for(let x =0;x<5;x++){
        let line = document.createElement('div');
        line.classList.add('lines');
        gameArea.appendChild(line);

        line.y = line.offsetTop;
        line.y = x*150;
        line.style.top = line.y+'px'; 
        
    }
    //create enemy
    setInterval(function(){
        for(let e=0;e<3;e++){
            let enemy = document.createElement('div');
            enemy.classList.add('enemy');
            gameArea.appendChild(enemy);
            
            enemy.y = enemy.offsetTop;
            enemy.x = enemy.offsetLeft;
    
            enemy.x = Math.floor(Math.random()*700);
            enemy.style.left = enemy.x+'px';
        }
    },1850);
    
    //start animations
    requestAnimationFrame(animations);

    //car movement events
    carEvent();

}
//animations handler
function animations (timeStamp){
    moveLines();
    enemyMove();
    requestAnimationFrame(animations);
}
function moveLines (){
    let lines = document.querySelectorAll('.lines');
    lines.forEach((z)=>{
        if(z.y <750){
            z.y += 6;
            z.style.top = z.y+'px';
        }else {
            z.y -= 750;
            z.style.top = z.y+'px';
        }
        if(checkBounding(car,z)){
            console.log('HIT');
        }
    });
    
}
//car handler
function carEvent (){
    document.addEventListener("keydown",(event)=>{
        switch (event.key) {
            case "ArrowRight":
                let moveRight = car.offsetLeft + 50 ;
                car.style.left = moveRight +'px';
                break;
            case "ArrowLeft":
                let moveLeft = car.offsetLeft - 50;
                car.style.left = moveLeft +'px';
                break;
            case "ArrowUp":
                let moveUp = car.offsetTop - 50;
                car.style.top = moveUp +'px';
                break;
            case "ArrowDown":
                let moveDown = car.offsetTop +50;
                car.style.top = moveDown+'px';
                break;
        }
    });
}
//enemy handler

//enemy move
function enemyMove (){
     let enemies = document.querySelectorAll('.enemy');
    enemies.forEach((items)=>{
        if(enemies.length >3){
            gameArea.removeChild(items);
        }else {
            if(items.y<750){
                items.y +=5;
                items.style.top = items.y +'px';
            }else{
                items.y -=1000;
                items.style.top = items.y+'px';
            }
        }
    });
}

function checkBounding (a,b){
    let aBound = a.getBoundingClientRect();
    let bBound = b.getBoundingClientRect();

    return (aBound.top <bBound.bottom || aBound.bottom<bBound);
}