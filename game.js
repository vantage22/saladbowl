var cards = ["Jeff","Dancing","Beer","Sonoma","Patrick","Stale Cookies"];

var redTeam = 'red';
var blueTeam = 'blue';

var currentTeam = redTeam;

var teamScore = {}
teamScore[redTeam] = 0;
teamScore[blueTeam] = 0;

var currentCardIndex = 0;
var timeLeft;
setTimer(60);
var timerRunning = false;

var stages = ["description","acting","oneWord"];
var currentStageIndex = 0;

var timer = setInterval(timerLogic, 1000);

updateTeamView();

function timerLogic(){
	//if curTime equals zero
	if(timerRunning) {
		if(timeLeft <= 0) {
			//stop timer
			stopTimer();
			//call end round function
			endRound();
			return;
		}
		setTimer(timeLeft - 1);
	}
}

function startGame() {
	console.log("startGame ran");
	//trigger time to start counting down
	startTimer();

	//first card to appear
	showFirstCard();

	
	//background or other color changes(toggle buttons)
}

function startTimer() {
	console.log("startTimer ran")
	timerRunning = true;
}

function stopTimer() {
	timerRunning = false;
}

function setTimer(setValue) {
	timeLeft = setValue;
	document.getElementById('timer').innerText = timeLeft;

}

function endRound() {
	console.log("Round Ended");
	//set new current Team
	currentTeam === redTeam ? currentTeam = blueTeam : currentTeam = redTeam;
	//update the team span element
	//reset timer
	setTimer(60);
	updateTeamView();
	//update the team up view
	nextTeamUpView();
}

function showFirstCard() {
	updateGameView(true);
}

function nextTeamUpView() {
	updateGameView(false);
}

function updateGameView(isInGame) {
	document.getElementById("current-card").hidden = !isInGame;
	//hide start game button
	document.getElementById("start-game").hidden = isInGame;
	//unhide next card button
	document.getElementById("got-it").hidden = !isInGame;
	//change inner text of Current Card Element to first card value
	updateCardView();
}



document.getElementById('got-it').onclick = gotItClick;

function gotItClick(){
	//track score
		// add point to current team variable
		teamScore[currentTeam]++;
		// update view of current team element
		document.getElementById(`team-${currentTeam}-score`).innerText = teamScore[currentTeam];
	//if there are no cards left
	if(currentCardIndex === cards.length - 1) {
		//end the current stage
		endStage();
	} else {
		//got to next card
		//increment index of cards array
		currentCardIndex++;
		//update element
		updateCardView();
	}
}

function updateCardView(){
	document.getElementById("current-card").innerText = cards[currentCardIndex];
		//update card count
	document.getElementById('card-current-num').innerText = currentCardIndex + 1;
	document.getElementById('card-total-num').innerText = cards.length;
}

function endStage() {
	console.log("stage ended");
	//check if its that last stage
	if(currentStageIndex === 2) {
		endGame();
		return;
	}
	currentStageIndex++;
	//reset cards
	currentCardIndex = 0;
	//update the view to a pause between state
	updateToPauseView();
	//stop timer
	stopTimer();
}

function updateTeamView() {
	//update the view with the current team
	document.getElementById('team').innerText = currentTeam;
	//update current stage
	document.getElementById('current-stage').innerText = stages[currentStageIndex];

}

function adminEndRound() {
	setTimer(0);
}

function updateToPauseView() {
	console.log('updatetoPauseView ran');
	//pause timer


	nextTeamUpView();
	//change inner text of start game to just start or go or continue
	document.getElementById('start-game').innerText = 'Continue on!';
	//update stage inner text
	document.getElementById('current-stage').innerText = stages[currentStageIndex];
}

function endGame() {
	winner = teamScore[redTeam] > teamScore[blueTeam] ? 'Red Team Wins' : 'Blue Team wins';
	alert(winner);
	location.href = "index.html";

}

function takeUserInput() {
	console.log(document.getElementById("user-input").value);
	cards.push(document.getElementById("user-input").value);
	console.log(cards);
}






