let cards = {
    '2_of_clubs.svg': 2,
    '2_of_spades.svg': 2,
    '2_of_diamonds.svg': 2,
    '2_of_hearts.svg': 2,
    '3_of_clubs.svg': 3,
    '3_of_spades.svg': 3,
    '3_of_diamonds.svg': 3,
    '3_of_hearts.svg': 3,
    '4_of_clubs.svg': 4,
    '4_of_spades.svg': 4,
    '4_of_diamonds.svg': 4,
    '4_of_hearts.svg': 4,
    '5_of_clubs.svg': 5,
    '5_of_spades.svg': 5,
    '5_of_diamonds.svg': 5,
    '5_of_hearts.svg': 5,
    '6_of_clubs.svg': 6,
    '6_of_spades.svg': 6,
    '6_of_diamonds.svg': 6,
    '6_of_hearts.svg': 6,
    '7_of_clubs.svg': 7,
    '7_of_spades.svg': 7,
    '7_of_diamonds.svg': 7,
    '7_of_hearts.svg': 7,
    '8_of_clubs.svg': 8,
    '8_of_spades.svg': 8,
    '8_of_diamonds.svg': 8,
    '8_of_hearts.svg': 8,
    '9_of_clubs.svg': 9,
    '9_of_spades.svg': 9,
    '9_of_diamonds.svg': 9,
    '9_of_hearts.svg': 9,
    '10_of_clubs.svg': 10,
    '10_of_spades.svg': 10,
    '10_of_diamonds.svg': 10,
    '10_of_hearts.svg': 10,
    'jack_of_clubs.svg': 11,
    'jack_of_spades.svg': 11,
    'jack_of_diamonds.svg': 11,
    'jack_of_hearts.svg': 11,
    'queen_of_clubs.svg': 12,
    'queen_of_spades.svg': 12,
    'queen_of_diamonds.svg': 12,
    'queen_of_hearts.svg': 12,
    'king_of_clubs.svg': 13,
    'king_of_spades.svg': 13,
    'king_of_diamonds.svg': 13,
    'king_of_hearts.svg': 13,
    'ace_of_clubs.svg': 14,
    'ace_of_spades.svg': 14,
    'ace_of_diamonds.svg': 14,
    'ace_of_hearts.svg': 14,
}


let player1 = [],
    player2 = [],
    board = [],
    stack1 = [],
    stack2 = [];
let play1, play2;

//yeah, I copied this from stack overflow.
let shuffle = (array) => {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const newGame = () => {
    document.getElementById("play").disabled = false;
    document.querySelector('p').innerHTML = `You have a deck of size ${player1.length} and stack of size ${stack1.length}.<br>The opponent has a deck of size ${player2.length} and stack of size ${stack2.length}`;
    document.querySelector('h1').innerHTML = '';
    player1 = [], player2 = [];
    for (let key in cards) {
        player1.push(key);
        player2.push(key)
    }
    player1 = shuffle(player1);
    player2 = shuffle(player2);
    stack1 = [], stack2 = [];
    document.querySelector('#card1').src = `img/svg-cards/black_joker.svg`;
    document.querySelector('#card2').src = `img/svg-cards/red_joker.svg`;
}

const battle = () => {
    play1 = player1.pop();
    play2 = player2.pop();
    board.push(play1, play2);
    document.querySelector('#card1').src = `img/svg-cards/${play1}`;
    document.querySelector('#card2').src = `img/svg-cards/${play2}`;
}

const resolve = () => {
    cards[play1] > cards[play2] ? stack1.unshift(...board) : cards[play2] > cards[play1] ? stack2.unshift(...board) : war();
}

const win = () => {
    document.querySelector('h1').innerHTML = 'You win!';
    document.getElementById("play").disabled = true;
    document.querySelector('#card1').src = `img/svg-cards/black_joker.svg`;
    document.querySelector('#card2').src = `img/svg-cards/red_joker.svg`;
}

const lose = () => {
    document.querySelector('h1').innerHTML = "You lose!";
    document.getElementById("play").disabled = true;
    document.querySelector('#card1').src = `img/svg-cards/black_joker.svg`;
    document.querySelector('#card2').src = `img/svg-cards/red_joker.svg`;
}

const winLoseHandler = () => {
    if (player2.length === 0 && stack2.length === 0) {
        win();
        return;
    } else if (player1.length === 0 && stack1.length === 0) {
        lose();
        return;
    }
    if (player1.length === 0) {
        stack1.reverse();
        player1.push(...stack1);
        stack1 = [];
    }
    if (player2.length === 0) {
        stack2.reverse();
        player2.push(...stack2);
        stack2 = [];
    }
}

const war = () => {
    for (let i = 0; i < 3; i++) {
        if (player2.length === 0 && stack2.length === 0) {
            win();
            return;
        } else if (player1.length === 0 && stack1.length === 0) {
            lose();
            return;
        }
        if (player1.length === 0) {
            stack1.reverse();
            player1.push(...stack1);
            stack1 = [];
        }
        if (player2.length === 0) {
            stack2.reverse();
            player2.push(...stack2);
            stack2 = [];
        }
        play1 = player1.pop();
        play2 = player2.pop();
        board.push(play1, play2);
    }
    battle();
    cards[play1] > cards[play2] ? stack1.unshift(...board) : cards[play2] > cards[play1] ? stack2.unshift(...board) : war();
}

const play = () => {
    winLoseHandler();
    battle();
    resolve();
    board = [];
    document.querySelector('p').innerHTML = `You have a deck of size ${player1.length} and stack of size ${stack1.length}.<br>The opponent has a deck of size ${player2.length} and stack of size ${stack2.length}`;
}

newGame();

document.querySelector('#new-game').addEventListener('click', newGame)
document.querySelector('#play').addEventListener('click', play)