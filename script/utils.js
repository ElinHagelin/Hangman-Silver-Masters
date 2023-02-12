import wordList from "../JSON/word-list.json" assert { type: "json" };
import kidsWordList from "../JSON/kids-word-list.json" assert { type: "json" };

const letterDivContainer = document.querySelector('.letter-div-container')
const letterInput = document.querySelector('#letter-input')
const wrongLetterContainer = document.querySelector('.wrong-letter-container')
const wrongGuessLeftContainer = document.querySelector('.wrong-guess-left-container')
// const invisible = document.querySelector('.invisible')
const body = document.querySelector('body')
const scoreboardButton = document.querySelector('.scoreboard-button')


let easyWordList = wordList.filter(word => word.length > 12)
let mediumWordList = wordList.filter(word => word.length > 6 && word.length < 12)
let hardWordList = wordList.filter(word => word.length < 6)


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

function generateRandomWord() {
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
	//startScreen()
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
	let wrongGuessLeft = 6 - wrongGuess;
	let writeWrongGuess = document.createElement('h3');
	writeWrongGuess.innerText = wrongGuessLeft + ' drag kvar';

	while (wrongGuessLeftContainer.firstChild) {
		wrongGuessLeftContainer.removeChild(wrongGuessLeftContainer.firstChild);
	}

	wrongGuessLeftContainer.append(writeWrongGuess);

	if (wrongGuess >= 1) {
		hangman.ground.classList.remove('invisible');
		wrongGuessLeftContainer.classList.remove('invisible')
	}

	if (wrongGuess >= 2) {
		hangman.scaffold.classList.remove('invisible');
	}

	if (wrongGuess >= 3) {
		hangman.head.classList.remove('invisible');
	}

	if (wrongGuess >= 4) {
		hangman.body.classList.remove('invisible');
	}

	if (wrongGuess >= 5) {
		hangman.arms.classList.remove('invisible');
	}

	if (wrongGuess >= 6) {
		hangman.legs.classList.remove('invisible');

		loser()		// Här körs overlay för när man förlorar då hela gubben har ritats ut från och med här.

	}
}

// Funktion för att skapa en overlay

function createOverlay() {
	let overlayElements = {
		backgroundBlur: document.createElement('div'),
		overlayDiv: document.createElement('div'),
		overlayText: document.createElement('h1'),
	}

	overlayElements.backgroundBlur.className = 'overlay'
	overlayElements.overlayDiv.classList.add = 'dialogue'
	overlayElements.backgroundBlur.append(overlayElements.overlayDiv)
	overlayElements.overlayDiv.append(overlayElements.overlayText)
	body.append(overlayElements.backgroundBlur)
	return overlayElements;
}

// Funktion för overlay på startskärmen


let overlayInput = document.createElement('input')

export default function startScreen() {
	const overlay = createOverlay()
	const imgHangman = document.createElement('img')
	imgHangman.src = 'img/Hangman-icon2.png'
	let startText = document.createElement('p')
	startText.className = 'start-text'
	startText.innerText = 'Välj ditt namn: '
	overlayInput.className = 'name-input'
	// overlayInput.setAttribute('required', '')
	overlay.overlayDiv.insertBefore(overlayInput, overlay.overlayButton)
	overlay.overlayDiv.insertBefore(startText, overlayInput)
	overlay.overlayDiv.insertBefore(imgHangman, startText)

	// overlayInput.placeholder = 'Skriv in ditt namn här'

	overlay.overlayDiv.className = 'start'
	overlay.overlayText.className = 'start-heading'
	overlay.overlayText.innerText = 'Välkommen till Hangman-Game!'

	let buttonContainer = document.createElement('div')
	let kidsButton = document.createElement('button')
	let easyButton = document.createElement('button')
	let mediumButton = document.createElement('button')
	let hardButton = document.createElement('button')
	buttonContainer.className = 'button-container'
	kidsButton.className = 'overlay-button'
	easyButton.className = 'overlay-button'
	mediumButton.className = 'overlay-button'
	hardButton.className = 'overlay-button'
	kidsButton.innerText = 'barn'
	easyButton.innerText = 'Lätt'
	mediumButton.innerText = 'Mellan'
	hardButton.innerText = 'Svårt'


	buttonContainer.append(kidsButton)
	buttonContainer.append(easyButton)
	buttonContainer.append(mediumButton)
	buttonContainer.append(hardButton)
	overlay.overlayDiv.append(buttonContainer)
	
	

	kidsButton.addEventListener('click', () => {
		if (overlayInput != '') {
			overlay.backgroundBlur.classList.add('invisible')
			generateRandomWord(kidsWordList)
			
		}
	})

	// ------------Jag försöker göra så att man endast kan komma vidare från start-overlay när man skrivit något i input-fältet------------funkar inte just nu-------

	easyButton.addEventListener('click', () => {
		if (overlayInput != '' || overlayInput != null) {
			overlay.backgroundBlur.classList.add('invisible')
			generateRandomWord(easyWordList)
			
		}
		// //else {
		// 	easyButton.preventDefault()
		// 	overlayInput.placeholder = 'Skriv in ditt namn här'
		// }
	})

	// --------------------------------------------------

	mediumButton.addEventListener('click', () => {
		if (overlayInput != '') {
			overlay.backgroundBlur.classList.add('invisible')
			generateRandomWord(mediumWordList)
			
		}
	})

	hardButton.addEventListener('click', () => {
		if (overlayInput != '') {
			overlay.backgroundBlur.classList.add('invisible')
			generateRandomWord(hardWordList)
			
		}
	})
}

startScreen()

// funktionen för overlay när man förlorar:

function loser() {
	const overlay = createOverlay()
	let looserText = document.createElement('p')
	let playAgainButton = document.createElement('button')
	looserText.className = 'looser-text'
	playAgainButton.className = 'overlay-button'
	overlay.overlayDiv.className = 'loser'
	overlay.overlayText.className = 'loser-text'
	looserText.innerText = 'Det rätta ordet var: ' + word
	playAgainButton.innerText = 'Spela igen'
	overlay.overlayText.innerText = 'AJDÅ, Du förlorade! '
	overlay.overlayDiv.append(looserText)
	overlay.overlayDiv.append(playAgainButton)
	storeScore()

	playAgainButton.addEventListener('click', () => {
		console.log('clicked')
		location.reload();  //Laddar om sidan
	})
}

// funktionen för overlay när man vinner:

function winner() {
	result = true
	const overlay = createOverlay()
	let buttonDiv = document.createElement('div')
	let scoreboardButton = document.createElement('button')
	let winnerText = document.createElement('p')
	let winnerText2 = document.createElement('p')
	let playAgainButton = document.createElement('button')
	buttonDiv.className = 'button-div'
	winnerText2.className = 'winner-text'
	winnerText.className = 'winner-text'
	winnerText.innerText = 'Det rätta ordet var: ' + word
	winnerText2.innerText = 'Du vann på ' + (guesses + 1) + ' gissningar'
	overlay.overlayDiv.className = 'winner'
	overlay.overlayText.className = 'winner-heading'
	playAgainButton.className = 'overlay-button'
	overlay.overlayText.innerText = 'Grattis!'
	playAgainButton.innerText = 'Spela igen'
	scoreboardButton.className = 'winner-scoreboard-button'
	scoreboardButton.innerText = 'Poängtavla'
	overlay.overlayDiv.append(winnerText2)
	overlay.overlayDiv.append(winnerText)
	overlay.overlayDiv.append(buttonDiv)
	buttonDiv.append(playAgainButton)
	buttonDiv.append(scoreboardButton)
	storeScore()

	playAgainButton.addEventListener('click', () => {
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
	let scoreIndex = 0
	const sortByBest = findBestScores(scoreArrayCopy)
	let sortByLatest = storedScores.slice().reverse()
	let scoreboardElements = {
		name: document.createElement('h2'),
		guess: document.createElement('h2'),
		result: document.createElement('h2'),
		listBox: document.createElement('div'),
		checkbox: document.createElement('input'),
		switchButton: document.createElement('label')
	}

	scoreboardElements.checkbox.type = 'checkbox'
	scoreboardElements.checkbox.id = 'switch'
	scoreboardElements.switchButton.htmlFor = 'switch'


	overlay.overlayText.className = 'scoreboard-head'
	overlay.overlayText.innerText = 'Scoreboard'

	scoreboardElements.name.className = 'style scoreboard-text-name'
	scoreboardElements.name.innerText = 'Namn:'

	scoreboardElements.guess.className = 'style scoreboard-text-guess'
	scoreboardElements.guess.innerText = 'Poäng: '

	scoreboardElements.result.className = 'style scoreboard-text-result'
	scoreboardElements.result.innerText = 'Resultat: '

	scoreboardElements.listBox.className = 'list-box'






	overlay.overlayDiv.append(scoreboardElements.listBox)


	overlay.overlayDiv.append(scoreboardElements.checkbox)
	overlay.overlayDiv.append(scoreboardElements.switchButton)


	showScores(sortByLatest) // Startar med listan som visar senast resultat först på scoreboarden.

	// Lyssnar om checkboxen är ikryssad, byter vilken lista vi ska köra showScores-funktionen med beroende på state på checkboxen.

	scoreboardElements.checkbox.addEventListener('change', event => {

		if (scoreboardElements.checkbox.checked) {
			clearScoreList()
			showScores(sortByBest)
			console.log('sortera bäst först');
		} else {
			clearScoreList()
			showScores(sortByLatest)
			console.log('sortera senast först');
		}
	})


	// Skapar en poänglista som anttingen visar en lista med senaste omgångarna först eller med de bästa resultaten först beroende på vilken lista man stoppar in som parameter.

	function showScores(list) {
		const scoreList = document.createElement("ul");
		scoreList.className = 'score-list'

		for (let i = 0; i < 10; i++) {
			const listItem = document.createElement("li");
			listItem.innerHTML = `<p>${list[i].name}</p> <p>${list[i].score} poäng</p> <p>${list[i].result}</p>`;
			const deleteButton = document.createElement("button");
			deleteButton.innerText = 'Ta bort'
			scoreList.appendChild(listItem);
			listItem.appendChild(deleteButton);

			deleteButton.addEventListener('click', () => listItem.remove())
		}

		// overlay.overlayDiv.appendChild(scoreList);
		scoreboardElements.listBox.append(scoreList)
	}


	function clearScoreList() {
		let listToClear = document.querySelector('.score-list')
		if (listToClear != null) {
			listToClear.remove()
		}
	}


	overlay.overlayDiv.className = 'scoreboard'
	// overlay.overlayButton.innerText = 'Spela igen'

	// overlay.overlayButton.addEventListener('click', event => {
	// 	console.log('clicked')
	// 	location.reload();  //Laddar om sidan
	// 	event.stopPropagation()

	// 	//Stoppar bubblingen uppåt så att overlayen bara stängs när man klickar utanför
	// })

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

const scoreStringArray = localStorage.getItem(LS_KEY)
let scoresParsed = JSON.parse(scoreStringArray)
const scoreArrayCopy = scoresParsed.concat()


function findBestScores(list) {
	const bestScoreArray = []


	for (let check = 0; check < 10; check++) {
		let bestScoreSoFar = null;
		let bestScoreIndex = null;

		for (let j = 0; j < list.length; j++) {
			if (bestScoreSoFar === null || list[j].score < bestScoreSoFar) {
				bestScoreSoFar = list[j].score;
				bestScoreIndex = j;
			}
		}
		bestScoreArray.push(list[bestScoreIndex]);

		list.splice(bestScoreIndex, 1);
	}
	return bestScoreArray
}