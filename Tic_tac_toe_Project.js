let gameInfo = document.querySelector(".game_info");
let boxes = document.querySelectorAll(".box");
let btn = document.querySelector(".btn");
let frame = document.querySelector(".tic_tac_toe");

console.log("hello");


let currentPlayer;
let gameGrid;

//creating array of possible winning positions
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// to intialize the game (making grid and ui empty, removing classes etc.)
function initGame(){    
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //also to clean UI
    boxes.forEach((box)=>{
        box.innerText = "";
    })
    btn.classList.remove("active");
    let xyz = gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else{
        currentPlayer = "X";
    }
    // also to update in upper UI
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(index) {
    let winner = "";
    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            //ab condition satisfy hochuki ki position wali condition pe tino same hai

            // to check the winner
            if (gameGrid[position[0]] === "X" ){
                winner = "X";
            } else {
                winner = "O";
            }

            //to disable pointer events
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            frame.classList.add("win");

            gameInfo.innerText = `Winner - ${winner}`;
            return;
            
        }
        
        //to check for tie
        let boxCount = 0;
        gameGrid.forEach((box)=>{
            if ((box != "")) {
                boxCount++;
            }
            if (boxCount == 9){
                gameInfo.innerText = "Game Tied!";
            }
            frame.classList.add("win");
        })
    })
}


function handleClick(index) {
    if (gameGrid[index] == ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //now to change the turn
        swapTurn();
        //after this now to check the game over or not
        checkGameOver();
    } 
}

//adding eventlistener to every box
boxes.forEach((box,index) => {
    box.addEventListener('click', ()=>{
        handleClick(index);
    })
});

    
//new game button
btn.addEventListener('click', ()=>{
    initGame();
    console.log("done");
    frame.classList.remove("win");
    //click vapis open hoske
    boxes.forEach((box)=>{
        box.style.pointerEvents = "all";
        box.classList.remove("win");
    })
    
});

initGame();