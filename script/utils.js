import wordList from "../JSON/word-list.json" assert { type: "json" };

const letterDivContainer = document.querySelector('.letter-div-container')
const letterInput = document.querySelector('#letter-input')
const wrongLetterContainer = document.querySelector('.wrong-letter-container')
const invisible = document.querySelector('.invisible')
const body = document.querySelector('body')
let letterArray = []
let divArray = []
let guessArray = []
let validKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'z', 'å', 'ä', 'ö', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö', 'Backspace']

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
const LS_KEY = 'Hangman-game'
let result = false

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
	console.log(divArray);
	console.log(letterArray);
	return letter
	return letterArray
}

// Eventlyssnare på Enter-tangenten. Kör funktionen som kollar om gissningen matchar någon av bokstäverna i ordet och tömmer sen input-fältet. 

letterInput.addEventListener('keydown', event => {
	if (event.key == 'Enter') {
		compareLetters(letterInput.value, letterArray)
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


let wrongGuess = 0

function compareLetters() {
	let letterInWord = false


	// Gör en loop som kollar om input matchar någon av bokstäverna i ordet. Variabeln blir då true

	for (let l = 0; l < letterArray.length; l++) {
		if (letterInput.value === word[l]) {
			divArray[l].innerText = letterInput.value.toUpperCase()
			letterInWord = true
		}
	}


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
	else {
		guessArray.push(letterInput.value)
		console.log('guessArray är: ' + guessArray);
	}
}

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

		loser()
	}

}

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
	console.log(3)
	return overlayElements;
}

export function startScreen() {
	const overlay = createOverlay()
	overlayInput = document.createElement('input')
	overlayInput.append(overlay.overlayDiv)
	// overlay.overlayButton.after(overlayInput)
	overlay.overlayDiv.classList.add = 'start'
	// overlay.overlayDiv.classList.add = 'dialogue'
	overlay.overlayText.className = 'start-text'
	overlay.overlayText.innerText = 'Vad heter du?'
	overlay.overlayButton.innerText = 'Starta spelet'
}

function loser() {
	const overlay = createOverlay()
	overlay.overlayDiv.classList.add = 'loser'
	overlay.overlayText.className = 'loser-text'
	overlay.overlayText.innerText = 'AJDÅ! Du förlorade, det rätta ordet var: ' + word
	overlay.overlayButton.innerText = 'Spela igen'
}

function winner() {
	result = true
	const overlay = createOverlay()
	overlay.overlayDiv.classList.add = 'winner'
	overlay.overlayText.className = 'winner-text'
	overlay.overlayText.innerText = 'Grattis! Du vann på så här många gissningar: ' + guesses
	overlay.overlayButton.innerText = 'Spela igen'
}

function storeScore(name, score) {
	const result = checkResult()

	// Dessa ska in i parametrarna i funktionen
	// name = overlay.input.value
	// score = guesses

	let personalScore = { name: name, score: score, result: result }
	localStorage.setItem(LS_KEY, JSON.stringify(personalScore))
}

function checkResult(result) {
	if (result == true) {
		return 'Vinst'
	}
	else {
		return 'Förlust'
	}
}

