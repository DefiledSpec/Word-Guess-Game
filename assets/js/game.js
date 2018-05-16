// On Start
let log = console.log;

let unsolved = getId('unsolvedWord');
let userInput = getId('usersInput');
let guessInput = getId('guessInput');

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
    }
    initArray(arr) {
        let arr2 = [];
        for(let i = 0; i < arr.length; i++) {
            arr2.push('_');
        }
        return arr2;
    }
    displayText() {
        let text = '';
        for(let i = 0; i < this.unsolvedArr.length; i++) {
            text += `${this.unsolvedArr[i]} `;
        }
        unsolved.innerHTML = text;   
    }
    checkCompleted() {
        let idx = this.unsolvedArr.indexOf('_');
        if (idx == -1) {
            alert('You win! The word was: ' + this.startWord);
        } else {
            log('Getting closer!');
        }
    }
    checkWord(input) {
        //todo: decrement letter guesses here
        for(let i = 0; i < this.wordArr.length; i++) {
            if(this.wordArr[i] === input) {
                let b = this.unsolvedArr.splice(i, 1, input); // if we find a match, update the unsolved arr
                this.checkCompleted();
            } else {
                    // we didn't find a match for the char at this idx 
            }
        }
        this.displayText();  
    }
        
}

class Game {
    constructor() {
        this.running = false;
    }
}

class Player {
    constructor() {
        this.inputArr = [ ];
        this.score = 0;
        this.guesses = 0;
    }
    addInput(input) {
        
        let alreadyUsed = this.inputArr.indexOf(input);
        if(p.guesses > 11) {
            alert('Too many guesses, better luck next time!');
            return;
        } else if(alreadyUsed !== -1) {
            log('You already guessed that letter!');
        } else {
            p.guesses++;
            this.inputArr.push(input);
            word.checkWord(input);
        }
        this.displayText();
    }
    displayText() {
        let text = '';
        for(let i = 0; i < this.inputArr.length; i++) {
            text += `${this.inputArr[i]} `;
        }
        userInput.innerHTML = text;
        guessInput.innerHTML = p.guesses;
    }
}

let p = new Player();
let g = new Game();
function start() {
    generateRndmWord();
    
}

window.addEventListener('keydown', checkKeyPress, false);
function checkKeyPress(key) {
    let x = 65; 
    let y = 90;
    if(key.keyCode >= x && key.keyCode <= y) {
        p.addInput(key.key);
    }else{
        log(key.key + ' is an invalid key, please enter letters only!');
    }
}

function generateRndmWord() {
    let rndWord = wordList[randIntRange(wordList.length)];
    word = new Word(rndWord);
    console.log('Random word generated: ' + word.startWord);
    word.displayText();
}

// Utilities
function randIntRange(range) {
    let rand = Math.floor(Math.random() * range);
    return rand;
}
function getId(id) {
    return document.getElementById(id);
}


start();