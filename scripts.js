const gameButtons = document.querySelectorAll('button');
const textFields = document.querySelector('.text');

const selection = document.createElement('div');
selection.classList.add('selection');

const playerContainer = document.createElement('div');
const computerContainer = document.createElement('div');
playerContainer.classList.add('player');
computerContainer.classList.add('computer');
const player = document.createElement('div');
const computer = document.createElement('div');
const pSelection = document.createElement('div');
const cSelection = document.createElement('div');
player.textContent = "Player:";
computer.textContent = "Computer:";
playerContainer.appendChild(player);
playerContainer.appendChild(pSelection);
computerContainer.appendChild(computer);
computerContainer.appendChild(cSelection);

const vs = document.createElement('div');
vs.textContent = "VS";
vs.setAttribute('style', 'font-weight: bold');

selection.appendChild(playerContainer);
selection.appendChild(vs, playerContainer);
selection.appendChild(computerContainer);

const result = document.createElement('div');
result.classList.add('result');

const endResult = document.createElement('div');
const resultText = document.createElement('div');
const scoreText = document.createElement('div');
const endScore = document.createElement('div');
endResult.classList.add('end-result');
resultText.classList.add('result-text');
scoreText.textContent = 'Score:';
endResult.appendChild(resultText);
endResult.appendChild(scoreText);
endResult.appendChild(endScore);

const reset = document.createElement('button');
reset.classList.add('reset');
reset.textContent = 'Play again?';

const pHand = document.querySelector('.player-hand');
const cHand = document.querySelector('.computer-hand');

let score = [0, 0];

function playerPlay(e) {
	let playerSelection = e.target.id;
	playGame(playerSelection);
}

function playGame(playerSelection) { // play the game keeping the score
	if (score[0] < 5 && score[1] < 5) {
		pSelection.textContent = playerSelection;
		let roundResult = playRound(playerSelection, computerPlay());
		if (roundResult !== 0) addPoint(roundResult, score); // if a tie don't increase the score
		textFields.appendChild(selection);
		textFields.appendChild(result);
		if (score[0] === 5 || score[1] === 5) {
			selectWinner(score);
			textFields.appendChild(endResult);
			textFields.appendChild(reset);
		}
	}
}

function computerPlay () { // let computer make a selection
	let random = Math.floor((Math.random()*10) % 3);
	let computerSelection = (random === 0) ? "Rock" :
	(random === 1) ? "Paper" :
	"Scissors";
	if (computerSelection === "Rock") cHand.src = "/img/rock.gif";
	else if (computerSelection === "Paper") cHand.src = "/img/paper.gif";
	else cHand.src = "/img/scissors.gif";
	cSelection.textContent = computerSelection;
	return computerSelection;
}

function playRound(playerSelection, computerSelection) {
	if (playerSelection === "Rock") pHand.src = "/img/rock.png";
	else if (playerSelection === "Paper") pHand.src = "/img/paper.png";
	else pHand.src = "/img/scissors.png";
	// check for the winner of the round, print out the result and return it as a numeric value
	let roundResult = 0; // tie === 0; player won === 1, computer won === 2
	if (playerSelection === "Rock" && computerSelection === "Scissors" ||
		playerSelection === "Paper" && computerSelection === "Rock") {
		result.textContent = `${playerSelection} beats ${computerSelection.toLowerCase()}`;
		result.style.color = 'green';
		return roundResult = 1;
	} else if (playerSelection === "Scissors" && computerSelection === "Paper") {
		result.textContent = "Scissors beat paper";
		result.style.color = 'green';
		return roundResult = 1;
	} else if (playerSelection === computerSelection) {
		result.textContent = "It's a tie! Try again";
		result.style.color = 'black';
		return roundResult = 0;
	} else if (computerSelection === "Scissors" && playerSelection === "Paper") {
		result.textContent = "Scissors beat paper";
		result.style.color = 'red';
		return roundResult = 2;
	} else {
		result.textContent = `${computerSelection} beats ${playerSelection.toLowerCase()}`;
		result.style.color = 'red';
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

function selectWinner(score) { // select a winner based on the score array
	if (score[0] > score[1]) {
		resultText.textContent = 'You won!';
		resultText.style.color = 'green';
		endScore.textContent = `You: ${score[0]}, Computer: ${score[1]}`;
	} else {
		resultText.textContent = 'You lost!';
		resultText.style.color = 'red';
		endScore.textContent = `Computer: ${score[1]}, You: ${score[0]}`;
	}
}

gameButtons.forEach((button) => {
	button.addEventListener('click', playerPlay);
});

reset.addEventListener('click', () => {
	score = [0, 0];
	textFields.removeChild(selection);
	textFields.removeChild(result);
	textFields.removeChild(endResult);
	textFields.removeChild(reset);
});