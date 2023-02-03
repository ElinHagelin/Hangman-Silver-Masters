import wordList from "../JSON/word-list.json" assert { type: "json" };

const letterDivContainer = document.querySelector('.letter-div-container')
const letterInput = document.querySelector('#letter-input')
const wrongLetterContainer = document.querySelector('.wrong-letter-container')

let letter = ''
let letterDiv = null
let word = ''

export default function generateRandomWord() {
	word = wordList[Math.floor(Math.random() * wordList.length)];

	console.log(word);

	for (let i = 0; i < word.length; i++) {
		letter = word[i];
		letterDiv = document.createElement('div')

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

function compareLetters() {

	for (let l = 0; l < word.length; l++) {

		if (letterInput.value === letter) {
			letterDiv.innerText = letter
			console.log('right!');
		}
		else {
			const wrongLetter = document.createElement('p')
			wrongLetter.innerText = letter
			console.log('try again')
		}
	}
}






