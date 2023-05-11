window.addEventListener("DOMContentLoaded", () => {

	const tiles = Array.from(document.querySelectorAll(".tile"));
	const playerDisplay = document.querySelector(".display-player");
  const announcer = document.querySelector(".announcer");
  
  const resetButton = document.querySelector("#reset");
  
  let board = ["", "", "","", "", "","", "", ""];
  let currentPlayer = "X";
  let isGameActive = true;
  
  const winningConditions = [
  	[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  const handleResultValidation = () => {
  	let roundWon = false;
    for (i = 0; i< 8; i++) {
    	const winningCondition = winningConditions[i];
      const a = board[winningCondition[0]];
      const b = board[winningCondition[1]];
      const c = board[winningCondition[2]];
      
      if (a === "" || b === "" || c === "") {
      	continue;
      }
      
      if (a === b && b === c) {
	      roundWon = true;
        break;
      }
    }
    
    if (roundWon) {
    	announcer.innerHTML = (currentPlayer === "X" ? "Player <span class='playerX'>X</span> won" : "Player <span class='playerO'>O</span> Won");
      announcer.classList.remove("hide");
      isGameActive = false;
      return;
    }

    if (!board.includes("")) {
    	announcer.innerHTML = "Tie";
      announcer.classList.remove("hide");
      return;
    }
  }
  
  const updateBoard = (index) => {
  	board[index] = currentPlayer;
  }
  
  const changePlayer = () => {
  	playerDisplay.classList.remove('player'+currentPlayer);
		/* 
    if  (currentPlayer === "X") {
    	currentPlayer = "O";
    } else {
    	currentPlayer = "X";
    }
    Below If
    */
    //Ternary Operator 
		currentPlayer =  currentPlayer === "X" ? "O" : "X";
    
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add('player'+currentPlayer);
    
  }
  
  //old way to write function
	/* function userAction(tile, index) {
  	
  } */
  //new way to write function - arrow function
  const userAction = (tile, index) => {
	  if (isGameActive) {
  		tile.innerText = currentPlayer;
      tile.classList.add('player'+currentPlayer);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
     }
  }
  
  
  tiles.map((tile, index) => {
		tile.addEventListener("click", () => userAction(tile, index));
  });
  
  const resetBoard = () => {
  	board = ["", "", "","", "", "","", "", ""];
    isGameActive = true;
    announcer.classList.add("hide");
    if (currentPlayer = "O") {
    	changePlayer();
    }
    
    tiles.map((tile, index) => {
    	tile.innerText = "";
      tile.classList.remove("playerX");
      tile.classList.remove("playerO");
    });
  }
  
  resetButton.addEventListener("click", resetBoard);

});