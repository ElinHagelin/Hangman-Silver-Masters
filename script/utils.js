import wordList from "../JSON/word-list.json" assert { type: "json" };

const letterDivContainer = document.querySelector('.letter-div-container')
const letterInput = document.querySelector('#letter-input')
const wrongLetterContainer = document.querySelector('.wrong-letter-container')
const invisible = document.querySelector('.invisible')
const body = document.querySelector('body')
let letterArray = []
let divArray = []
let validKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'wrongGuess', 'y', 'z', 'å', 'ä', 'ö', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö', 'Backspace']

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

export default function generateRandomWord() {
	word = wordList[Math.floor(Math.random() * wordList.length)];

	console.log(word);

	for (let i = 0; i < word.length; i++) {
		letter = word[i];
		letterDiv = document.createElement('div')
		divArray.push(letterDiv)
        letterArray.push(letter)
		letterDivContainer.append(letterDiv)
	}
}

letterInput.addEventListener('keydown', event => {
	if (event.key == 'Enter') {
		compareLetters()
		
		letterInput.value = ''
	}
})

console.log(letterInput.value);

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
    }console.log(wrongGuess)
}

function writeHangman() {

		if(wrongGuess === 1){
		hangman.ground.classList.remove('invisible')
		}	
		
		else if (wrongGuess === 2){
			hangman.scaffold.classList.remove('invisible')
		}
		
		else if(wrongGuess === 3){
			hangman.head.classList.remove('invisible')
		}

		else if(wrongGuess === 4){
			hangman.body.classList.remove('invisible')
		}
		
		else if(wrongGuess === 5){
			hangman.arms.classList.remove('invisible')
		}

		else {
			hangman.legs.classList.remove('invisible')

			// Skapar overlay
			let overlay = document.createElement('div')
			let overlayLooser = document.createElement('div')
			let looserText = document.createElement('p')
			let overlayButton = document.createElement('button')
			overlay.append(overlayLooser)
			overlayLooser.append(looserText)
			overlayLooser.append(overlayButton)
			

			overlay.className = 'overlay'
			overlayLooser.className = 'looser'
			overlayButton.className = 'overlay-button'
			looserText.className = 'looser-text'

			looserText.innerText = 'AJDÅ! Du förlorade, det rätta ordet var: ' + word
			overlayButton.innerText = 'Spela igen'

			

			body.append(overlay)
		}
	
} 







