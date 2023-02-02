import wordList from "../JSON/word-list.json" assert { type: "json" };

const letterDivContainer = document.querySelector('.letter-div-container')

export default function generateRandomWord() {
	let word = wordList[Math.floor(Math.random() * wordList.length)];

	for (let i = 0; i < word.length; i++) {
		const letter = word[i];
		const letterDiv = document.createElement('div')
		letterDiv.innerText = letter
		letterDivContainer.append(letterDiv)
	}
}







