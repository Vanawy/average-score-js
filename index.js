class ScoreCounter
{
    constructor() {
        this.scores = [];
    }

    add(score) {
        this.scores.push(score)
    }

    delete() {
        this.scores.pop();
    }

    reset() {
        this.scores = [];
    }

    count() {
        return this.scores.length;
    }

    sum() {
        let sum = 0;
        for (let score of this.scores) {
            sum += score;
        }
        return sum;
    }

    average() {
        return this.sum() / this.count();
    }

    scoresText() {
        if (this.scores.length == 0) return '-';
        return this.scores.join(', ');
    }

    averageText() {
        if (this.scores.length == 0) return '-';
        return Math.round(this.average() * 1000) / 1000;
    }
}

let buttonsDiv  = document.getElementById('buttons');
let scoresP     = document.getElementById('scores');
let descP       = document.getElementById('description');
let averageP    = document.getElementById('average');

const ACTION_ADD    = 'add';
const ACTION_RESET  = 'reset';
const ACTION_DELETE = 'delete';

let counter = new ScoreCounter(); 
buttonsDiv.addEventListener('click', addScore);

function addScore(e) {
    let target = e.target;
    let action = target.dataset.action;

    switch (action) {
        case ACTION_ADD:
            let score = parseInt(target.dataset.score);
            counter.add(score);
            break;
        case ACTION_DELETE:
            counter.delete();
            break;
        case ACTION_RESET:
            counter.reset();
            break;
        default:
            break;
    }
    renderResults();
}

function renderResults() {
    scoresP.innerText = counter.scoresText();
    descP.innerText = `${counter.sum()} / ${counter.count()}`;
    averageP.innerText = counter.averageText();
}

function createButtons() {
    let buttons = [];
    for (let i = 1; i < 10; i++) {
        let button = document.createElement('sl-button');
        button.dataset.action = ACTION_ADD;
        button.dataset.score = i;
        button.innerText = i;
        buttons.push(button);
        if (i % 3 == 0) {
            buttons.push(document.createElement('br'));
        }
    }

    let buttonReset = document.createElement('sl-button');
    buttonReset.dataset.action = ACTION_RESET;
    // buttonReset.innerText = 'X';
    let buttonResetIcon = document.createElement('sl-icon');
    buttonResetIcon.setAttribute('name', 'x-lg');
    buttonReset.appendChild(buttonResetIcon);
    buttons.push(buttonReset);

    let button10 = document.createElement('sl-button');
    button10.dataset.action = ACTION_ADD;
    button10.dataset.score = 10;
    button10.innerText = 10;
    buttons.push(button10);

    let buttonDelete = document.createElement('sl-button');
    buttonDelete.dataset.action = ACTION_DELETE;
    // buttonDelete.innerText = '<-';
    let buttonDeleteIcon = document.createElement('sl-icon');
    buttonDeleteIcon.setAttribute('name', 'chevron-left');
    buttonDelete.appendChild(buttonDeleteIcon);
    buttons.push(buttonDelete);

    buttonsDiv.replaceChildren(...buttons)
}

createButtons();