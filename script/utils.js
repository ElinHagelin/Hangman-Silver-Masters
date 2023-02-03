import wordList from "../JSON/word-list.json" assert { type: "json" };

const letterDivContainer = document.querySelector('.letter-div-container')
const letterInput = document.querySelector('#letter-input')
const wrongLetterContainer = document.querySelector('.wrong-letter-container')

let letter = ''
let letterDiv = null
let word = ''
let letterArray = []
let divArray = []
let validKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'å', 'ä', 'ö', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö', 'Backspace']

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
		letterInput.value = ''
	}
	else if (validKeys.includes(event.key) == false) {
		event.preventDefault()
		console.log('fel');
	}
})


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
		const wrongLetter = document.createElement('p')
		wrongLetter.classList.add('wrong')
		wrongLetter.innerText = letterInput.value.toUpperCase()
		wrongLetterContainer.append(wrongLetter)
	}
}






