const selection = document.querySelector('#selection');
const result = document.querySelector('#round-result');
const endScore = document.querySelector('#end-score');

const buttons = document.querySelectorAll('button');
let score = [0, 0];

buttons.forEach((button) => {
	button.addEventListener('click', playerPlay);
});

function playerPlay(e) {
	let playerSelection = e.target.textContent;
	playGame(playerSelection);
}

function playGame(playerSelection) { // play the game keeping the score
	let roundResult = playRound(playerSelection, computerPlay());
	// if a tie (roundResult === 0), don't increase the score
	if (roundResult !== 0) addPoint(roundResult, score);
	if (score[0] === 5 || score[1] === 5) {
		printResult(score);
	}
}

function computerPlay () { // let computer make a selection
	let random = Math.floor((Math.random()*10) % 3);
	let computerSelection = (random === 0) ? "Rock" :
	(random === 1) ? "Paper" :
	"Scissors";
	return computerSelection;
}

function playRound(playerSelection, computerSelection) {
	// check for the winner of the round, print out the result and return it as a numeric value
	let roundResult = 0; // tie === 0; player won === 1, computer won === 2
	if (playerSelection === null || playerSelection === undefined) return;
	selection.textContent = `Player: ${playerSelection}, Computer: ${computerSelection}`;
	if (playerSelection === "Rock" && computerSelection === "Scissors" ||
		playerSelection === "Paper" && computerSelection === "Rock") {
		result.textContent = `${playerSelection} beats ${computerSelection.toLowerCase()}`;
		return roundResult = 1;
	} else if (playerSelection === "Scissors" && computerSelection === "Paper") {
		result.textContent = "Scissors beat paper";
		return roundResult = 1;
	} else if (playerSelection === computerSelection) {
		result.textContent = "It's a tie! Try again";
		return roundResult = 0;
	} else if (computerSelection === "Scissors" && playerSelection === "Paper") {
		result.textContent = "Scissors beat paper";
		return roundResult = 2;
	} else {
		result.textContent = `${computerSelection} beats ${playerSelection.toLowerCase()}`;
		return roundResult = 2;
	}
}

function addPoint(roundResult, score) { // increase the score for players
	if (roundResult === 1) {
		return score[0]++;
	} else if (roundResult === 2) {
		return score[1]++;
	}
}

function printResult(score) { // select a winner based on the score array
	if (score[0] > score[1]) {
		endScore.textContent = `You won!\nScore:\nYou: ${score[0]}, Computer: ${score[1]}`;
	} else {
		endScore.textContent = `You lost!\nScore:\nComputer: ${score[1]}, You: ${score[0]}`;
	}
}