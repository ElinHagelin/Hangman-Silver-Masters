import wordList from "../JSON/word-list.json" assert { type: "json" };
import kidsWordList from "../JSON/kids-word-list.json" assert { type: "json" };

const letterDivContainer = document.querySelector('.letter-div-container')
const letterInput = document.querySelector('#letter-input')
const wrongLetterContainer = document.querySelector('.wrong-letter-container')
const wrongGuessLeftContainer = document.querySelector('.wrong-guess-left-container')
const body = document.querySelector('body')
const quitButton = document.querySelector('.quit-button')
const scoreboardButton = document.querySelector('.scoreboard-button')
const wordHelpContainer = document.querySelector('.word-letter-container')
const letterHelpContainer = document.querySelector('.letter-help-container')


let easyWordList = wordList.filter(word => word.length > 12)
let mediumWordList = wordList.filter(word => word.length > 6 && word.length < 12)
let hardWordList = wordList.filter(word => word.length < 6)


let letterArray = []
let divArray = []
let rightGuessArray = []
let wrongGuessArray = []
let validKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'å', 'ä', 'ö', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö', 'Backspace']


// Variabel för hela gubben sparad i ett objekt
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
let wrongGuess = 0
const overlayInput = document.createElement('input')


// När man trycker på "poänglista" så kommer scoreboarden upp, funktionen för scorebord finns längre ner i koden.
scoreboardButton.addEventListener('click', () => {
	scoreboard()
})

quitButton.addEventListener('click', () => {
	overlayInput.value = ''
	location.reload();
})

function generateRandomWord(list) {
	word = list[Math.floor(Math.random() * list.length)];

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
}

// Eventlyssnare på Enter-tangenten. Kör funktionen som kollar om gissningen matchar någon av bokstäverna i ordet och tömmer sen input-fältet. 


letterInput.addEventListener('keydown', event => {
	if (event.key == 'Enter' && letterInput.value != "") {
		compareLetters()
		letterInput.value = ''
		guesses = guesses + 1

	}
	else if (validKeys.includes(event.key) == false) {
		event.preventDefault()
		console.log('skriv in en bokstav');
	}
	else if (rightGuessArray.includes(event.key) == true || wrongGuessArray.includes(event.key) == true) {
		event.preventDefault()
		console.log('du har redan gissat på den bokstaven');
	}
})


// Funktionen som räknar ut om man skrivit in rätt eller fel bostav

function compareLetters() {
	let letterInWord = false

	// Loop som kollar om input matchar någon av bokstäverna i ordet. Variabeln blir då true

	for (let l = 0; l < letterArray.length; l++) {
		if (letterInput.value === word[l]) {
			divArray[l].innerText = letterInput.value.toUpperCase()
			letterInWord = true
			rightGuessArray.push(letterInput.value)
		}
	}

	// Om variabeln inte blev true läggs bokstaven ut ovanför istället. När antal rätt gissade bokstäver stämmer med antalet bokstäver i ordet skapas vinnar-overlay.

	if (letterInWord === false) {
		wrongGuess = wrongGuess + 1
		const wrongLetter = document.createElement('p')
		wrongLetter.classList.add('wrong')
		wrongLetter.innerText = letterInput.value.toUpperCase()
		wrongGuessArray.push(letterInput.value)
		wrongLetterContainer.append(wrongLetter)
		drawHangman(wrongGuess)
	}
	else if (letterArray.length === rightGuessArray.length) {
		winner()
	}
}

// Funktionen för att spelet ska rita ut gubben när man gissar på fel bokstav.

function drawHangman() {
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
		headContainer: document.createElement('div')
	}

	overlayElements.backgroundBlur.className = 'overlay'
	overlayElements.overlayDiv.classList.add = 'dialogue'
	overlayElements.headContainer.append(overlayElements.overlayText)
	overlayElements.backgroundBlur.append(overlayElements.overlayDiv)
	overlayElements.overlayDiv.append(overlayElements.headContainer)
	body.append(overlayElements.backgroundBlur)
	return overlayElements;
}

// Funktion för overlay på startskärmen

export default function startScreen() {
	let overlayElements = createOverlay()
	const imgHangman = document.createElement('img')
	imgHangman.src = 'img/Hangman-icon2.png'
	const startText = document.createElement('p')
	startText.className = 'start-text'
	startText.innerText = 'Skriv in ditt namn: '
	overlayInput.className = 'name-input'
	overlayInput.maxLength = "5";

	overlayElements.overlayDiv.className = 'start'
	overlayElements.overlayText.className = 'start-heading'
	overlayElements.overlayText.innerText = 'Välkommen till Hänga Gubbe!'

	overlayElements.overlayDiv.append(imgHangman)
	overlayElements.overlayDiv.append(startText)
	overlayElements.overlayDiv.append(overlayInput)

	const buttonContainer = document.createElement('div')
	const kidsButton = document.createElement('button')
	const easyButton = document.createElement('button')
	const mediumButton = document.createElement('button')
	const hardButton = document.createElement('button')
	buttonContainer.className = 'button-container'
	kidsButton.className = 'overlay-button'
	easyButton.className = 'overlay-button'
	mediumButton.className = 'overlay-button'
	hardButton.className = 'overlay-button'
	kidsButton.innerText = 'Barn'
	easyButton.innerText = 'Lätt'
	mediumButton.innerText = 'Mellan'
	hardButton.innerText = 'Svårt'

	buttonContainer.append(kidsButton)
	buttonContainer.append(easyButton)
	buttonContainer.append(mediumButton)
	buttonContainer.append(hardButton)
	overlayElements.overlayDiv.append(buttonContainer)

	// Eventlyssnare på knapparna för att stänga overlayen och starta spelet

	kidsButton.addEventListener('click', () => {
		if (overlayInput != '') {
			overlayElements.backgroundBlur.remove()
			generateRandomWord(kidsWordList)
		}
	})
	easyButton.addEventListener('click', () => {
		if (overlayInput != '' || overlayInput != null) {
			overlayElements.backgroundBlur.remove()
			generateRandomWord(easyWordList)
		}
	})
	mediumButton.addEventListener('click', () => {
		if (overlayInput != '') {
			overlayElements.backgroundBlur.remove()
			generateRandomWord(mediumWordList)

		}
	})
	hardButton.addEventListener('click', () => {
		if (overlayInput != '') {
			overlayElements.backgroundBlur.remove()
			generateRandomWord(hardWordList)
		}
	})
}


// funktionen för overlay när man förlorar:

function loser() {
	let overlayElements = createOverlay()
	let looserText = document.createElement('p')
	let playAgainButton = document.createElement('button')
	looserText.className = 'looser-text'
	playAgainButton.className = 'overlay-button'
	overlayElements.overlayDiv.className = 'loser'
	overlayElements.overlayText.className = 'loser-text'
	looserText.innerText = 'Det rätta ordet var: ' + word
	playAgainButton.innerText = 'Spela igen'
	overlayElements.overlayText.innerText = 'AJDÅ, Du förlorade! '
	overlayElements.overlayDiv.append(looserText)
	overlayElements.overlayDiv.append(playAgainButton)
	storeScore()//Sparar omgången i localStorage

	playAgainButton.addEventListener('click', () => {
		console.log('clicked')
		location.reload();  //Laddar om sidan
	})
}

// funktionen för overlay när man vinner:

function winner() {
	result = true
	let overlayElements = createOverlay()
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
	overlayElements.overlayDiv.className = 'winner'
	overlayElements.overlayText.className = 'winner-heading'
	playAgainButton.className = 'overlay-button'
	overlayElements.overlayText.innerText = 'Grattis!'
	playAgainButton.innerText = 'Spela igen'
	scoreboardButton.className = 'winner-scoreboard-button'
	scoreboardButton.innerText = 'Poängtavla'
	overlayElements.overlayDiv.append(winnerText2)
	overlayElements.overlayDiv.append(winnerText)
	overlayElements.overlayDiv.append(buttonDiv)
	buttonDiv.append(playAgainButton)
	buttonDiv.append(scoreboardButton)
	storeScore() //Sparar omgången i localStorage

	playAgainButton.addEventListener('click', () => {
		console.log('clicked')
		location.reload(); //Laddar om sidan
	})

	scoreboardButton.addEventListener('click', () => {
		overlayElements.backgroundBlur.remove()
		scoreboard() //Byter overlay till scoreboard
	})
}

// Objekt med element-variabler till scoreboard

let scoreboardElements = {
	name: document.createElement('h2'),
	guess: document.createElement('h2'),
	result: document.createElement('h2'),
	listBox: document.createElement('div'),
	switchButtonContainer: document.createElement('div'),
	checkbox: document.createElement('input'),
	switchButton: document.createElement('label'),
	checkBoxTag: document.createElement('p')
}

// Funktion för scoreboarden som är en overlay.

function scoreboard() {
	const storedStringScores = localStorage.getItem(LS_KEY)
	const storedScores = JSON.parse(storedStringScores)
	let playAgainButton = document.createElement('button')
	let overlayElements = createOverlay()


	scoreboardElements.switchButtonContainer.className = 'switch-button-container'
	overlayElements.headContainer.className = 'head-container'

	scoreboardElements.checkBoxTag.className = 'checkbox-tag'
	scoreboardElements.checkBoxTag.innerText = 'Sortera bäst först'
	overlayElements.headContainer.append(overlayElements.overlayText)
	scoreboardElements.switchButtonContainer.append(scoreboardElements.checkBoxTag)
	overlayElements.headContainer.append(scoreboardElements.switchButtonContainer)

	scoreboardElements.checkbox.type = 'checkbox'
	scoreboardElements.checkbox.id = 'switch'
	scoreboardElements.switchButton.htmlFor = 'switch'
	playAgainButton.className = 'overlay-button'

	overlayElements.overlayDiv.className = 'scoreboard'
	overlayElements.overlayText.className = 'scoreboard-head'
	overlayElements.overlayText.innerText = 'Scoreboard'

	scoreboardElements.name.className = 'style scoreboard-text-name'
	scoreboardElements.name.innerText = 'Namn:'
	scoreboardElements.guess.className = 'style scoreboard-text-guess'
	scoreboardElements.guess.innerText = 'Poäng: '
	scoreboardElements.result.className = 'style scoreboard-text-result'
	scoreboardElements.result.innerText = 'Resultat: '
	scoreboardElements.listBox.className = 'list-box'

	playAgainButton.innerText = 'Spela igen'
	overlayElements.overlayDiv.append(playAgainButton)
	overlayElements.overlayDiv.append(scoreboardElements.listBox)

	scoreboardElements.switchButtonContainer.append(scoreboardElements.checkbox)
	scoreboardElements.switchButtonContainer.append(scoreboardElements.switchButton)

	playAgainButton.addEventListener('click', event => {
		console.log('clicked')
		location.reload();  //Laddar om sidan

	})

	overlayElements.overlayDiv.addEventListener('click', event => {
		event.stopPropagation()

		//Stoppar bubblingen uppåt så att overlayen bara stängs när man klickar utanför overlayen
	})

	overlayElements.backgroundBlur.addEventListener('click', event => {
		overlayElements.backgroundBlur.remove()

		//Stänger overlayen när man klickar utanför div-en
	})

	clearScoreList()
	showScores(findLatestScores()) // Startar med listan som visar senast resultat först på scoreboarden.

	// Lyssnar om checkboxen är ikryssad, byter vilken lista vi ska köra showScores-funktionen med beroende på state på checkboxen.

	scoreboardElements.checkbox.addEventListener('change', () => {

		if (scoreboardElements.checkbox.checked) {
			clearScoreList()
			showScores(findBestScores())
			scoreboardElements.checkBoxTag.innerText = 'Sortera senast först'

		} else {
			clearScoreList()
			showScores(findLatestScores())
			scoreboardElements.checkBoxTag.innerText = 'Sortera bäst först'
		}
	})
}


// Skapar en poänglista som antingen visar en lista med senaste omgångarna först eller med de bästa resultaten först beroende på vilken lista(funktion som returnerar lista) man stoppar in som parameter.

function showScores(list) {
	const scoreList = document.createElement("ul");
	scoreList.className = 'score-list'

	if (list != undefined) {
		list.forEach(element => {
			const listItem = document.createElement("li");
			listItem.innerHTML = `<p>${element.name}</p> <p>${element.score} poäng</p> <p>${element.result}</p>`;
			const deleteButton = document.createElement("button");
			deleteButton.className = 'delete-button'
			deleteButton.innerText = 'Ta bort'
			scoreList.appendChild(listItem);
			listItem.appendChild(deleteButton);

			deleteButton.addEventListener('click', () => listItem.remove())
		});
	}
	scoreboardElements.listBox.append(scoreList)
}

// Funktion för att hitta de bästa reslutaten och lägga dem i en ny lista sorterade med bäst först. 

function findBestScores() {
	let list = (JSON.parse(localStorage.getItem(LS_KEY)))
	const bestScoreArray = []

	if (list == null) {
		return
	} else {
		for (let check = 0; check = list.length; check++) {
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
}

// Funktion för att hämta omgångarna från localStorage och vända på listan för att få fram de senaste först.

function findLatestScores() {
	let list = (JSON.parse(localStorage.getItem(LS_KEY)))
	if (list == null) {
		return
	} else {
		let latestScoreArray = list.slice().reverse()

		return latestScoreArray
	}
}

// Funktion för att rensa listan

function clearScoreList() {
	let listToClear = document.querySelector('.score-list')
	if (listToClear != null) {
		listToClear.remove()
	}
}

// Funktion för att spara omgång i localStorage

function storeScore() {
	const matchRound = {
		name: overlayInput.value,
		score: wrongGuess,
		result: checkResult(result)
	}

	let scoreStringFromLocalStorage = localStorage.getItem(LS_KEY)

	if (!scoreStringFromLocalStorage) {
		scoreStringFromLocalStorage = '[]'
	}
	let scores = JSON.parse(scoreStringFromLocalStorage)

	scores.push(matchRound)

	let scoreStringToSave = JSON.stringify(scores)
	localStorage.setItem(LS_KEY, scoreStringToSave)

	return matchRound
}

// Funktion för att ändra resultat från true/false till vinst/förlust

function checkResult(result) {
	if (result === true) {
		return 'Vinst'
	}
	else {
		return 'Förlust'
	}
}