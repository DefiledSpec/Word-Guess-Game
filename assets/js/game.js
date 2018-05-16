// On Start
let log = console.log;

let unsolved = getId('unsolvedWord');
let userInput = getId('usersInput');
let userScore = getId('userScore');

// Variables
let word, p;
let wordList = [ //Add colors ass needed
    'blue',
    'red',
    'green',
    'yellow',
    'black',
    'teal'
];
// Classess
/**
 * This class initiates the word that was randomly generated and creates its assocciated arrays.
 */
class Word {
    constructor(word) {
        this.startWord = word;
        this.wordArr = word.split('');
        this.unsolvedArr = this.initArray(this.wordArr);
        this.displayText();
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
            text += this.unsolvedArr[i];
        }
        unsolved.innerHTML = text;   
    }
    checkCompleted() {
        let idx = this.unsolvedArr.indexOf('_');
        if (idx == -1) {
            alert(`You win! The word was: ${this.startWord}`);
            // g.running = false;
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
                p.score++;// todo: MOVE THIS OUT of the LOOP
            } else {
                p.score--;// todo: MOVE THIS OUT of the LOOP
                    // we didn't find a match for the char at this idx 
            }
        }
        this.displayText();  
    }
        
}
// Game state handler maybe?
// class Game {
//     constructor() {
//         this.running = false; // set this to true after player 'presses any key to continue'
//     }
// }
/**
 * A class for handling things to do with the player such as score
 */
class Player {
    constructor() {
        this.inputArr = [];
        this.score = 0;
        this.guesses = 0;
        // this.displayText(); //this removes the start message on startup
                                //maybe we should try to make the player later on and uncomment this
    }
    addInput(input) {        
        let alreadyUsed = this.inputArr.indexOf(input);
        if(p.guesses >= 11) {
            alert(`Too many guesses, better luck next time! The word was ${word.startWord}`);
            // g.running = false;
            return;
        } else if(alreadyUsed !== -1) {
            log(`You already guessed that letter!`);
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
            text += this.inputArr[i];
        }
        userInput.innerHTML = text;
        guessInput.innerHTML = this.guesses;
        userScore.innerHTML = this.score;
    }
}
//The code that runs it all
// let g = new Game();
p = new Player();
function start() {
    generateRndmWord();
    
}
start();

window.addEventListener('keydown', (key) => {
    let x = 65; 
    let y = 90;
    if(key.keyCode >= x && key.keyCode <= y) {
        p.addInput(key.key);
    } else if(key.keyCode == 123) { //f12 debug menu
        log('No Cheating! ;)');
    } else {
        log(key.key + ' is an invalid key, please enter letters only!');
    }
});
// Utilities
function generateRndmWord() {
    let rndWord = wordList[randIntRange(wordList.length)];
    word = new Word(rndWord);
    console.log('Random word generated: ' + word.startWord);
    word.displayText();
}
function randIntRange(range) {
    let rand = Math.floor(Math.random() * range);
    return rand;
}
function getId(id) {
    return document.getElementById(id);
}