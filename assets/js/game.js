

// Variables
let word;
let wordList = [
    'blue',
    'red',
    'green',
    'yellow',
    'black',
    'teal'
];

// Classes
class Word {
    constructor(word) {
        this.startWord = word;
        this.wordArr = word.split('');
        this.unsolvedArr = this.initArray(this.wordArr);
        // console.log(this.startWord);
    }
    initArray(arr) {
        let arr2 = [];
        for(let i = 0; i < arr.length; i++) {
            arr2.push('_');
        }
        return arr2;
    }
    checkWord(str) {
        for(let i = 0; i < this.wordArr.length; i++) {
            console.log('in loop');
        }
    }
}
function start() {
    generateRndmWord();
    displayText();
    word.checkWord();
}


// On Start
let unsolved = document.getElementById('unsolvedWord');

function displayText() {
    let text = '';
    for(let i = 0; i < word.unsolvedArr.length; i++) {
        text += `${word.unsolvedArr[i]} `;
    }
    unsolved.innerHTML = text;
}

function generateRndmWord() {
    let rndWord = wordList[randIntRange(wordList.length)];
    word = new Word(rndWord);
    console.log('Random word generated: ' + word.startWord);
}



// Utilities
function randIntRange(range) {
    let rand = Math.floor(Math.random() * range);
    // console.log(rand);
    return rand;
}

start();