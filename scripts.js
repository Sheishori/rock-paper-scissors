function playerPlay () { // let player make a selection
	let playerSelection = "";
	let keepGoing = true;
	while (keepGoing) {
		playerSelection = prompt("Choose rock paper or scissors!");
		if (playerSelection === null || playerSelection === undefined) {
			if (confirm("Stop playing?")) {
				break;
			} else {
				continue;
			}
		}
		let firstLetter = playerSelection.charAt(0);
		playerSelection = firstLetter.toUpperCase() + playerSelection.substr(1);
		if (playerSelection === "Rock" ||
			playerSelection === "Paper" ||
			playerSelection === "Scissors") keepGoing = false;
	}
	return playerSelection;
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
	console.log(`Player: ${playerSelection}, Computer: ${computerSelection}`)
	if (playerSelection === "Rock" && computerSelection === "Scissors" ||
		playerSelection === "Paper" && computerSelection === "Rock") {
		console.log(`${playerSelection} beats ${computerSelection.toLowerCase()}`);
		return roundResult = 1;
	} else if (playerSelection === "Scissors" && computerSelection === "Paper") {
		console.log("Scissors beat paper");
		return roundResult = 1;
	} else if (playerSelection === computerSelection) {
		console.log("It's a tie! Try again");
		return roundResult = 0;
	} else if (computerSelection === "Scissors" && playerSelection === "Paper") {
		console.log("Scissors beat paper");
		return roundResult = 2;
	} else {
		console.log(`${computerSelection} beats ${playerSelection.toLowerCase()}`);
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
		console.log(`You won!\nScore:\nYou: ${score[0]}, Computer: ${score[1]}`);
	} else {
		console.log(`You lost!\nScore:\nComputer: ${score[1]}, You: ${score[0]}`);
	}
}

function playGame() { // play the game 5 times while printing out the round number and keeping the score
	let round = 1
	const score = [0, 0];
	for (; round < 6; round++) {
		console.log(`Round ${round}`);
		let roundResult = playRound(playerPlay(), computerPlay());
		if (roundResult === undefined) {
			console.log("Game cancelled");
			break;
		} else if (roundResult === 0) { // if a tie, repeat the round
			round--;
		} else addPoint(roundResult, score);
	}
	// only print out results after all rounds and not when the game was cancelled
	if (round === 6) printResult(score);
}

playGame();