document.write(`Press any key to get started.`);
const pBreak = `<br>`;
document.write(pBreak);

let running = false;

let words = [
    'blue',
    'red',
    'green',
    'yellow',
    'black',
    'teal'
];

const randWord = words[randIntRange(words.length)];

document.write(`<b>${randWord}: </b>`);
let i;
let unsolved = [];
for(i = 0; i < randWord.length; i++) {
    unsolved.push('_');
}
document.write(unsolved.join(` `));


class Word {
    constructor(word) {
        this.startWord = word;

    }
    createArray() {

    }
}
let aWord = new Word('apple');
// console.log(aWord);







function randIntRange(range) {
    let rand = Math.floor(Math.random() * range);
    console.log(rand);
    return rand;
}