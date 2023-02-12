// import { createOverlay, result, overlayElements } from './utils.js'




// Funktion för scoreboarden som är en overlay.

function scoreboard() {
	const storedStringScores = localStorage.getItem(LS_KEY)
	const storedScores = JSON.parse(storedStringScores)
	let overlayElements = createOverlay()
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


	overlayElements.overlayText.className = 'scoreboard-head'
	overlayElements.overlayText.innerText = 'Scoreboard'

	scoreboardElements.name.className = 'style scoreboard-text-name'
	scoreboardElements.name.innerText = 'Namn:'

	scoreboardElements.guess.className = 'style scoreboard-text-guess'
	scoreboardElements.guess.innerText = 'Poäng: '

	scoreboardElements.result.className = 'style scoreboard-text-result'
	scoreboardElements.result.innerText = 'Resultat: '

	scoreboardElements.listBox.className = 'list-box'

	overlayElements.overlayDiv.append(scoreboardElements.listBox)

	overlayElements.overlayDiv.append(scoreboardElements.checkbox)
	overlayElements.overlayDiv.append(scoreboardElements.switchButton)


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
		overlayElements.overlayDiv.className = 'scoreboard'

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


	overlayElements.overlayDiv.addEventListener('click', event => {
		event.stopPropagation()

		//Stoppar bubblingen uppåt så att overlayen bara stängs när man klickar utanför overlayen
	})


	overlayElements.backgroundBlur.addEventListener('click', event => {
		overlayElements.backgroundBlur.remove()

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

// export { scoreboard }