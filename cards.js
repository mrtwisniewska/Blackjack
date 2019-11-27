// Blackjack
// Marta Wiśniewska
// based on "Mark Zamoyta Blackjack" tutorial on pluralsight.com

//Karty
let suits = ['♥', '♠', '♦', '♣'],
    values = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

//Przyciski
let textArea=document.getElementById('text-area'),
    newGameButton=document.getElementById('new-game-button'),
    shuffleButton=document.getElementById('shuffle-button');

//Wartości gry
let gameStarted=false,
    shuffled=false,
    dealerCards=[],
    playerCards=[],
    deck=[];

//Ustawienia przycisków
newGameButton.style.display='inline';
showStatus();
  
//Przycisk uporządkowane
newGameButton.addEventListener('click',function(){
  gameStarted=true;
  shuffled=false;
  deck=createDeck();
  playerCards = Array(52).fill(null).map(getNextCard)
  showStatus();
});

 
//Przycisk przetasuj
shuffleButton.addEventListener('click',function(){
  gameStarted=false;
  shuffled=true;
  deck=createDeck();
  shuffleDeck(deck);
  playerCards = Array(52).fill(null).map(getNextCard)
  showShuffled();
});

//Stwórz talię
function createDeck() {
    let deck = [];
    for (let suitIdx=0;suitIdx<suits.length;suitIdx++){
        for (let valueIdx=0;valueIdx<values.length;valueIdx++){
            let card={
                suit:suits[suitIdx],
                value:values[valueIdx]
            };
            deck.push(card);
        }
    }
    return deck;
}

//Przetasuj karty
function shuffleDeck(deck){
  for (let i=0;i<deck.length;i++){
    let swapIdx=Math.trunc(Math.random()*deck.length);
    let tmp=deck[swapIdx];
    deck[swapIdx]=deck[i];
    deck[i]=tmp;
  }
}

//Wyświetlanie karty
function getCardString(card){
  if ((card.suit == '♥')||(card.suit == '♦')){
  return textArea.innerHTML="<div class='card' id='red'><p id='leftr'>"+card.value+ ' ' +card.suit+"</p><p id='rightr'>"+card.value+ ' ' +card.suit+'</p></div>';}
  else
  {
  return textArea.innerHTML="<div class='card' id='black' ><p id='leftb'>"+card.value+ ' ' +card.suit+"</p><p id='rightb'>"+card.value+ ' ' +card.suit+'</p></div>';}
}

//Uzyskanie kolejnej karty
function getNextCard(){
    return deck.shift();
}

//Wyświetlanie
function showStatus(){
  if (!gameStarted){
    textArea.innerHTML="<p class='inner'>";
    return;
  }

  let playerCardString='';
  for (let i=0;i<playerCards.length;i++){
    playerCardString+=getCardString(playerCards[i]);
  }

  textArea.innerHTML= 
    "<p class='inner'>Karty:<br>"+playerCardString;
  }

//Wyświetlanie przetasowanych
function showShuffled(){
  if (!shuffled){
    textArea.innerHTML="<p class='inner'>";
    return;
  }

  let playerCardString='';
  for (let i=0;i<playerCards.length;i++){
    playerCardString+=getCardString(playerCards[i]);
  }

  textArea.innerHTML= 
    "<p class='inner'>Karty:<br>"+playerCardString;
  }
