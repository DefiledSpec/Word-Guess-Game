// On Start
let log = console.log;

let unsolved = getId('unsolvedWord');
let userInput = getId('usersInput');
let userScore = getId('userScore');
let myDate = getId('myDate');

let myInterval = setInterval(myTimer, 1000);

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
    wordReset() {
        unsolved.innerText = this.unsolvedArr;
        // this.startWord = '';
        // this.wordArr = [];
        // this.unsolvedArr = [];
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
            log(`You win! The word was: ${this.startWord}`);
            reset();
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
                p.score += 5;// TODO MOVE THIS OUT of the LOOP
            } else {
                
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
    playerReset() {
        this.guesses = 0;
        this.inputArr = [];
    }
    addInput(input) {        
        let alreadyUsed = this.inputArr.indexOf(input);
        if(alreadyUsed !== -1) {
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
    word.displayText();
    
}
start();

window.addEventListener('keydown', (key) => {
    let x = 65; 
    let y = 90;
    if(p.guesses === 11) { 
        reset()
    }
    if(key.keyCode >= x && key.keyCode <= y) {
        p.addInput(key.key);
    } else if(key.keyCode == 123) { //f12 debug menu
        log('No Cheating! ;)');
    } else {
        log(key.key + ' is an invalid key, please enter letters only!');
    }
});
// Utilities
function reset() {
    unsolved.innerText = '';

    p.playerReset();
    log(p.guesses);
    word.wordReset();
    start();
}

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

function myTimer() {
    var d = new Date();
    myDate.innerText = d.toLocaleTimeString();
}