import wordList from "../JSON/word-list.json" assert { type: "json" };


export default function generateRandomWord() {
	let word = wordList[Math.floor(Math.random() * wordList.length)];
	console.log(word);
	return word;
}




