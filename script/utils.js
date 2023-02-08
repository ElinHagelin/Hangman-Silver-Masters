import wordList from "../JSON/word-list.json" assert { type: "json" };

const letterDivContainer = document.querySelector('.letter-div-container')
const letterInput = document.querySelector('#letter-input')
const wrongLetterContainer = document.querySelector('.wrong-letter-container')
// const invisible = document.querySelector('.invisible')
const body = document.querySelector('body')
const scoreboardButton = document.querySelector('.scoreboard-button')

let letterArray = []
let divArray = []
let guessArray = []
let validKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'å', 'ä', 'ö', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö', 'Backspace']

//Möjlighet att byta ut validKeys-arrayen med kod från discord. split() och map()


// Variabel för hela gubben uppdelad i objekt
const hangman = {
	ground: document.querySelector('#ground'),
	scaffold: document.querySelector('#scaffold'),
	legs: document.querySelector('#legs'),
	arms: document.querySelector('#arms'),
	body: document.querySelector('#body'),
	head: document.querySelector('#head')
}

let letter = ''
let letterDiv = null
let word = ''
let guesses = 0
const LS_KEY = 'hangman-score'
let result = false

// När man trycker på "poänglista" så kommer scoreboarden upp, funktionen för scorebord finns längre ner i koden.
scoreboardButton.addEventListener('click', () => {
	scoreboard()
})

export default function generateRandomWord() {
	word = wordList[Math.floor(Math.random() * wordList.length)];

	// Slumpar fram ett ord ur listan

	console.log(word.toUpperCase());

	for (let i = 0; i < word.length; i++) {

		// Ändrar bosktäverna till stora bokstäver och skapar divar för varje bokstav.

		letter = word[i].toUpperCase();
		letterDiv = document.createElement('div')

		// Lägger in bokstäverna och divarna i varsin array så att man kan matcha index med varandra senare och skriva in rätt bokstav i rätt div.

		divArray.push(letterDiv)
		letterArray.push(letter)
		letterDivContainer.append(letterDiv)
		console.log(letter);
	}
	startScreen()
}

// Eventlyssnare på Enter-tangenten. Kör funktionen som kollar om gissningen matchar någon av bokstäverna i ordet och tömmer sen input-fältet. 

letterInput.addEventListener('keydown', event => {
	if (event.key == 'Enter' && letterInput.value != "") {
		console.log(letterInput.value);
		compareLetters()
		letterInput.value = ''
		guesses = guesses + 1
		console.log(guesses);
	}
	else if (validKeys.includes(event.key) == false) {
		event.preventDefault()
		console.log('fel');
	}
})

// Funktionen som räknar ut om man skriver in rätt eller fel bostav
let wrongGuess = 0

function compareLetters() {
	let letterInWord = false


	// Gör en loop som kollar om input matchar någon av bokstäverna i ordet. Variabeln blir då true

	for (let l = 0; l < letterArray.length; l++) {
		if (letterInput.value === word[l]) {
			divArray[l].innerText = letterInput.value.toUpperCase()
			letterInWord = true
			guessArray.push(letterInput.value)
		}
	}

	console.log('guessArray = ' + guessArray);
	// Om variabeln inte blev true läggs bokstaven ut ovanför istället

	if (letterInWord === false) {

		wrongGuess = wrongGuess + 1
		const wrongLetter = document.createElement('p')
		wrongLetter.classList.add('wrong')
		wrongLetter.innerText = letterInput.value.toUpperCase()
		wrongLetterContainer.append(wrongLetter)
		writeHangman(wrongGuess)
	}
	else if (letterArray.length === guessArray.length) {
		winner()
	}

}

// Funktionen för att spelet ska rita ut gubben när man gissar på fel bokstav.

function writeHangman() {

	if (wrongGuess === 1) {
		hangman.ground.classList.remove('invisible')
	}

	else if (wrongGuess === 2) {
		hangman.scaffold.classList.remove('invisible')
	}

	else if (wrongGuess === 3) {
		hangman.head.classList.remove('invisible')
	}

	else if (wrongGuess === 4) {
		hangman.body.classList.remove('invisible')
	}

	else if (wrongGuess === 5) {
		hangman.arms.classList.remove('invisible')
	}

	else {
		hangman.legs.classList.remove('invisible')

		loser()		// Här körs overlay för när man förlorar då hela gubben har ritats ut från och med här.

	}
}

// Funktion för att skapa en overlay

function createOverlay() {
	let overlayElements = {
		backgroundBlur: document.createElement('div'),
		overlayDiv: document.createElement('div'),
		overlayText: document.createElement('p'),
		overlayButton: document.createElement('button')
	}

	overlayElements.backgroundBlur.className = 'overlay'
	overlayElements.overlayButton.className = 'overlay-button'
	overlayElements.overlayDiv.classList.add = 'dialogue'
	overlayElements.backgroundBlur.append(overlayElements.overlayDiv)
	overlayElements.overlayDiv.append(overlayElements.overlayText)
	overlayElements.overlayDiv.append(overlayElements.overlayButton)
	body.append(overlayElements.backgroundBlur)
	return overlayElements;
}

let overlayInput = document.createElement('input')
function startScreen() {
	const overlay = createOverlay()
	overlay.overlayDiv.insertBefore(overlayInput, overlay.overlayButton)
	overlay.overlayDiv.className = 'start'
	overlay.overlayText.className = 'start-text'
	overlay.overlayText.innerText = 'Vad heter du?'
	overlay.overlayButton.innerText = 'Starta spelet'

	overlay.overlayButton.addEventListener('click', () => {
		overlay.backgroundBlur.classList.add('invisible')
	})

	// return overlayInput.value
}
// funktionen för overlay när man förlorar:

function loser() {
	const overlay = createOverlay()
	overlay.overlayDiv.className = 'loser'
	overlay.overlayText.className = 'loser-text'
	overlay.overlayText.innerText = 'AJDÅ! Du förlorade, det rätta ordet var: ' + word
	overlay.overlayButton.innerText = 'Spela igen'

	storeScore()

	overlay.overlayButton.addEventListener('click', () => {
		console.log('clicked')
		location.reload();  //Laddar om sidan
	})
}

// funktionen för overlay när man vinner:

function winner() {
	result = true
	const overlay = createOverlay()
	let scoreboardButton = document.createElement('button')
	overlay.overlayDiv.className = 'winner'
	overlay.overlayText.className = 'winner-text'
	overlay.overlayText.innerText = 'Grattis! Du vann på så här många gissningar: ' + (guesses + 1)
	overlay.overlayButton.innerText = 'Spela igen'
	scoreboardButton.className = 'winner-scoreboard-button'
	scoreboardButton.innerText = 'Poängtavla'
	overlay.overlayDiv.append(scoreboardButton)

	storeScore()

	overlay.overlayButton.addEventListener('click', () => {
		console.log('clicked')
		location.reload(); //Laddar om sidan
	})

	scoreboardButton.addEventListener('click', () => {
		overlay.backgroundBlur.classList.add('invisible')
		scoreboard() //Byter overlay till scoreboard

	})
}

// Här kommer funktionen för scoreboarden som är en overlay.

function scoreboard() {
	const storedStringScores = localStorage.getItem(LS_KEY)
	const storedScores = JSON.parse(storedStringScores)
	const overlay = createOverlay()
	let scoreboardHead = document.createElement('h1')
	let scoreboardText = {
		name: document.createElement('h2'),
		guess: document.createElement('h2'),
		result: document.createElement('h2'),
		box1: document.createElement('div'),
		box2: document.createElement('div'),
		box3: document.createElement('div'),
		box4: document.createElement('div')
	}


	scoreboardHead.className = 'scoreboard-head'
	scoreboardHead.innerText = 'Scoreboard'

	scoreboardText.name.className = 'scoreboard-text-name'
	scoreboardText.name.innerText = 'Namn:'

	scoreboardText.guess.className = 'scoreboard-text-guess'
	scoreboardText.guess.innerText = 'Gissningar: '

	scoreboardText.result.className = 'scoreboard-text-result'
	scoreboardText.result.innerText = 'Resultat: '

	scoreboardText.box1.className = 'scoreboard-box1'
	scoreboardText.box2.className = 'scoreboard-box2'
	scoreboardText.box3.className = 'scoreboard-box3'
	scoreboardText.box4.className = 'scoreboard-box4'


	scoreboardText.box1.append(scoreboardText.name)
	scoreboardText.box2.append(scoreboardText.guess)
	scoreboardText.box3.append(scoreboardText.result)
	overlay.overlayDiv.append(scoreboardHead)
	overlay.overlayDiv.append(scoreboardText.box1)
	overlay.overlayDiv.append(scoreboardText.box2)
	overlay.overlayDiv.append(scoreboardText.box3)
	overlay.overlayDiv.append(scoreboardText.box4)

	let scoreIndex = 0

	storedScores.slice().reverse().forEach(element => {

		if (scoreIndex >= 10) {
			return
		}
		else {
			let name = document.createElement('p')
			name.innerText = element.name;
			scoreboardText.box1.append(name)
			let score = document.createElement('p')
			score.innerText = element.score;
			scoreboardText.box2.append(score)
			let result = document.createElement('p')
			result.innerText = element.result;
			scoreboardText.box3.append(result)
			let deleteButton = document.createElement('button')
			deleteButton.innerText = 'Ta bort';
			scoreboardText.box4.append(deleteButton)
		}
		scoreIndex++
	});

	overlay.overlayDiv.className = 'scoreboard'
	overlay.overlayButton.innerText = 'Spela igen'

	overlay.overlayButton.addEventListener('click', event => {
		console.log('clicked')
		location.reload();  //Laddar om sidan
		event.stopPropagation()

		//Stoppar bubblingen uppåt så att overlayen bara stängs när man klickar utanför
	})

	overlay.overlayDiv.addEventListener('click', event => {
		event.stopPropagation()

		//Stoppar bubblingen uppåt så att overlayen bara stängs när man klickar utanför overlayen
	})

	overlay.backgroundBlur.addEventListener('click', event => {
		overlay.backgroundBlur.classList.add('invisible')

		//Stänger overlayen när man klickar utanför div-en
	})
}

function storeScore() {
	const matchRound = {
		name: overlayInput.value,
		score: wrongGuess,
		result: checkResult(result)
	}

	let scoreStringFromLocalStorage = localStorage.getItem(LS_KEY)
	// Obs! Användaren kan ta bort datan från localStorage
	if (!scoreStringFromLocalStorage) {
		scoreStringFromLocalStorage = '[]'
	}
	let scores = JSON.parse(scoreStringFromLocalStorage)

	scores.push(matchRound)

	let scoreStringToSave = JSON.stringify(scores)
	localStorage.setItem(LS_KEY, scoreStringToSave)

	// Om man behöver flera arrayer då?
	// const dataExample = {
	// 	results: [],
	// 	pvpResults: []
	// }
	return matchRound
}


function checkResult(result) {
	if (result === true) {
		return 'Vinst'
	}
	else {
		return 'Förlust'
	}
}

