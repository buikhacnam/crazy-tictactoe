const num1 = document.getElementById("1");
const num2 = document.getElementById("2");
const num3 = document.getElementById("3");
const num4 = document.getElementById("4");
const num5 = document.getElementById("5");
const num6 = document.getElementById("6");
const num7 = document.getElementById("7");
const num8 = document.getElementById("8");
const num9 = document.getElementById("9");

const twoPlayer = true;
let numTurn = 0;

const player1 = [];
const player2 = [];
const computer = [];

const winArray = [[1,2,3],[1,4,7],[7,8,9],[9,6,3],[1,5,9],[7,5,3],[4,5,6],[2,5,8]];

const pick = [num1, num2, num3, num4, num5, num6, num7, num8, num9];


pick.forEach(num => {	
	if (twoPlayer) {	
		num.addEventListener("click", display);
	} else {
		num.addEventListener("click",display2);
	}

})


function check(player) {
 	return	winArray.some(arr => {
			return arr.every(num => {
				return player.includes(num);
		})
	})
}

	
function display(e) {
	numTurn += 1;
	if (numTurn % 2 == 0) { 
		e.target.innerHTML =  "<h1><i class='fas fa-times'></i></h1>";
		player1.push(Number.parseInt((e.target.id), 10));
		if (check(player1)) {
			console.log("X won");
			stop();
		} else if (!check(player1) && numTurn == 9) {
			console.log("Draw");
			stop();
		}
	
	} else {
		e.target.innerHTML = "<h1><i class='far fa-circle'></i></h1>";
		player2.push(Number.parseInt((e.target.id), 10));
		if (check(player2)) {
			console.log("O won");
			stop();
		} else if (!check(player2) && numTurn == 9) {
			console.log("Draw");
			stop();
		}
	}
		
	e.target.removeEventListener("click", display);
	
}

function stop() {
 return	pick.forEach(num => {
		return num.removeEventListener("click", display);
	})
}

//----> auto <-------------------------------------------------------------------

function check2(machine) {
	let newWinArray = winArray.map(arr => {
		return arr.map(num => {
			return num - 1;
		})
	})
    
    return	newWinArray.some(arr => {
			return arr.every(num => {
				return machine.includes(num);
		})
	})
}

let turnOfcomputer = 0;
let turnOfplayer = 0;

function display2(e) {	
    if (turnOfplayer == turnOfcomputer) {
    	turnOfplayer += 1;	
		e.target.innerHTML = "O";
		player2.push(Number.parseInt((e.target.id), 10));
		if (check(player2)) {
			console.log("O won");
			stop2();
						
		} else {
			if (turnOfplayer < 5) {
			computerTurn();
			} else {
				if (!check(player2)) {
					console.log("draw");
				}
			}	
   		}
  		e.target.removeEventListener("click", display2);
	}
}

function computerTurn() {
    setTimeout( () => {
    	let location;
    	do {
    		location = autoGenerate();       
    	} while ((player2.includes(location + 1)) || (computer.includes(location)));
    	computer.push(location);
    	pick[location].removeEventListener("click", display2);
		pick[location].innerHTML = "X";
	
		if (check2(computer)) {
			console.log("X won");
			stop2();
		}   
   		turnOfcomputer += 1;
    }, 1000)    
}

function autoGenerate() {
   let random = Math.floor(Math.random() * 9);
   return random;
}

function stop2() {
 return	pick.forEach(num => {
		return num.removeEventListener("click", display2);
	})
}


