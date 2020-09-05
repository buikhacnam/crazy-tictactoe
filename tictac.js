const mode = document.getElementById("modes");
const statusWrapper = document.querySelector(".status-wrapper");
const button = document.querySelector("button");

const num1 = document.getElementById("1");
const num2 = document.getElementById("2");
const num3 = document.getElementById("3");
const num4 = document.getElementById("4");
const num5 = document.getElementById("5");
const num6 = document.getElementById("6");
const num7 = document.getElementById("7");
const num8 = document.getElementById("8");
const num9 = document.getElementById("9");

const o = document.getElementById("o");
const x = document.getElementById("x");

const status = document.getElementById("status");

const restart = document.getElementById("re-start");

let gameMode = "easy";


let numTurn = 0;

let player1 = [];
let player2 = [];
let computer = [];
let crazyComputer = [];
let insaneComputer = [];

mode.addEventListener("change", gamePlan);
function gamePlan() {
 
	if(mode.value == "two-players"){
		stop2();
		console.log("two player");
		 gameMode = "two-players";
	} else if(mode.value == "easy") {
		stop();
		console.log("one player");
	 	gameMode = "easy";
		
	} else if (mode.value == "crazy"){
		stop();	
		console.log("crazy mode");
	 	gameMode = "crazy";
	} else {
		stop();
		console.log("insane mode");
		gameMode = "insane";
	}
	newGame();
 }



restart.addEventListener("click", newGame);

function newGame() {
    crazyComputer = [];
    insaneComputer = [];
	x.style.backgroundColor = "white";
	o.style.backgroundColor = "#53c653";	
    status.innerHTML = "<i class='far fa-circle'></i> turn";
	status.style.color = "black";
	  
	player1 = [];
	player2 = [];
	   
		computer = [];
		countDraw = 0;
		numTurn = 0;
		turnOfcomputer = 0;
		turnOfplayer = 0;
		resultArr = '';
		resultArr2 = '';
		document.body.style.transition = "0,7s";
		
		 pick.forEach(num => {	
		num.innerHTML = "";
		num.style.color = "white";
		num.style.backgroundColor = "#53c653";

		if (gameMode == "two-players") {	
			num.addEventListener("click", display);
		} else if (gameMode == "easy" || gameMode == "crazy" || gameMode == "insane") {
			num.addEventListener("click",display2);
		} 
	})
	if (gameMode == "crazy") {
		crazy();
		crazySetup();
		computer.push(crazyComputer[0], crazyComputer[1]);
	} else if (gameMode == "insane"){
		insane()
		insaneSetup();
		
	}
}


const winArray = [[1,2,3],[1,4,7],[7,8,9],[9,6,3],[1,5,9],[7,5,3],[4,5,6],[2,5,8]];

const pick = [num1, num2, num3, num4, num5, num6, num7, num8, num9];


pick.forEach(num => {	
	if (gameMode == "two-players") {	
		num.addEventListener("click", display);
	} else if (gameMode == "easy" || gameMode == "crazy") {
		num.addEventListener("click",display2);
	}

}) 

let resultArr;
let resultArr2;
function makeColor(arr) {
	moreColor();
	return arr.forEach(num => {
		pick[num -1].style.transition = "0s";
		return pick[num -1].style.color = "red"
	})
}

function moreColor() {
	setTimeout(() => {
		status.style.color = "red";
	
	  
	}, 800)
}



function check(player) {
 	return	winArray.some(arr => {
			return arr.every(num => {
				resultArr = arr;
				return player.includes(num);
		})
	})
}



	
function display(e) {
	numTurn += 1;
	if (numTurn % 2 == 0) { 
		o.style.backgroundColor = "#53c653";
		x.style.backgroundColor = "white";
		status.innerHTML = "<i class='far fa-circle'></i> turn";
		e.target.innerHTML =  "<h1><i class='fas fa-times'></i></h1>";
		player1.push(Number.parseInt((e.target.id), 10));
		if (check(player1)) {
			makeColor(resultArr);
			status.innerHTML = "<i class='fas fa-times'></i> WINS !!!";
			stop();
		} else if (!check(player1) && numTurn == 9) {
			status.innerHTML=("<i class='far fa-circle'></i><i class='fas fa-times'></i> Draw !!!");
			moreColor();
			stop();
		}
	
	} else {
		x.style.backgroundColor = "#53c653";
		o.style.backgroundColor = "white";
		status.innerHTML = "<i class='fas fa-times'></i> turn";
		e.target.innerHTML = "<h1><i class='far fa-circle'></i></h1>";

		player2.push(Number.parseInt((e.target.id), 10));
		if (check(player2)) {
			makeColor(resultArr);
			status.innerHTML = "<i class='far fa-circle'></i> WINS !!!";
			
			stop();
		} else if (!check(player2) && numTurn == 9) {
			status.innerHTML=("<i class='far fa-circle'></i><i class='fas fa-times'></i> Draw !!!");
			stop();
			moreColor();
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
				resultArr2 = produceResult2(arr);
				return machine.includes(num);
		})
	})
}

function produceResult2(array) {
	return array.map(num => {
		return num + 1;
	})
}

let turnOfcomputer = 0;
let turnOfplayer = 0;




function display2(e) {	
    if (turnOfplayer == turnOfcomputer) {
    	turnOfplayer += 1;	
	
		x.style.backgroundColor = "#53c653";
		o.style.backgroundColor = "white";
		status.innerHTML = "<i class='fas fa-times'></i> turn";
		e.target.innerHTML = "<h1><i class='far fa-circle'></i></h1>";
		e.target.removeEventListener("click", display2);
		player2.push(Number.parseInt((e.target.id), 10));
		if (check(player2)) {
			makeColor(resultArr);
			status.innerHTML = "<i class='far fa-circle'></i> WINS !!!";
			stop2();
			if((player2.length + computer.length == 9) && (!check(player2))){
				stop2();
				status.innerHTML=("<i class='far fa-circle'></i><i class='fas fa-times'></i> Draw !!!");
				moreColor();
			}
						
		} else {
			//if (turnOfplayer < 5) {
			if(player2.length + computer.length < 9) {
				computerTurn();
			} else {
				stop2();
				status.innerHTML=("<i class='far fa-circle'></i><i class='fas fa-times'></i> Draw !!!");
				moreColor();
			}
   		}
  		
	}
}
let countDraw = 0;
function computerTurn() {
  // stop2();
	setTimeout( () => {
		
		o.style.backgroundColor = "#53c653";
		x.style.backgroundColor = "white";
		status.innerHTML = "<i class='far fa-circle'></i> turn";
		let location;
    	do {
    		location = autoGenerate();       
    	} while ((player2.includes(location + 1)) || (computer.includes(location)));
		computer.push(location);
		if (!insaneComputer.includes(location)){
			countDraw = countDraw + 1;
		}
    	pick[location].removeEventListener("click", display2);
		pick[location].innerHTML = "<h1><i class='fas fa-times'></i></h1>";
		
	
		if (check2(computer)) {
			makeColor(resultArr2);
			status.innerHTML = "<i class='fas fa-times'></i> WINS !!!";
			stop2();
		}if((player2.length + computer.length == 9) && (!check2(computer))){
			stop2();
			status.innerHTML=("<i class='far fa-circle'></i><i class='fas fa-times'></i> Draw !!!");
			moreColor();
		} if(countDraw + player2.length == 6 && (!check2(computer))){
			console.log("draw");
			status.innerHTML=("<i class='far fa-circle'></i><i class='fas fa-times'></i> Draw !!!");
			moreColor();
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

//---------------crazy mode ------------------------

function crazy() {
	let location1 = autoGenerate();
	let location2;
	do {
		location2 = autoGenerate();
	} while (location1 == location2);
	crazyComputer.push(location1, location2);
}

function insane() {
	let location1 = autoGenerate();
	let location2;
	let location3;
	
	do {
		location2 = autoGenerate();
		location3 = autoGenerate();
	} while (location1 == location2 || location2 == location3 || location1 == location3);
	insaneComputer.push(location1, location2, location3);
}

function insaneSetup() {
	return insaneComputer.forEach(num => {
				pick[num].style.backgroundColor = '#ffcc66';
				pick[num].removeEventListener("click", display2);
			})
}




function crazySetup() {
	return crazyComputer.forEach(num => {
				pick[num].innerHTML = "<h1><i class='fas fa-times'></i></h1>";
				pick[num].removeEventListener("click", display2);
			})
}



window.addEventListener('load', () => {
	crazy();
	insane();
});


