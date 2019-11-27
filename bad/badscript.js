// Blackjack
// Marta Wiśniewska
// based on "Mark Zamoyta Blackjack" tutorial on pluralsight.com

//Karty
let suits = ['♥', '♠', '♦', '♣'],
    values = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

//Przyciski
let textArea=document.getElementById('text-area'),
    newGameButton=document.getElementById('new-game-button'),
    hitButton=document.getElementById('hit-button'),
    stayButton=document.getElementById('stay-button'),
    tryAgainButton=document.getElementById('try-again');

//Wartości gry
let gameStarted=false,
    gameOver=false,
    playerWon=false,
    dealerCards=[],
    playerCards=[],
    dealerScore=0,
    playerScore=0,
    deck=[];

//Komunikaty
let loseInfo=['PRZEGRAŁEŚ', 'OTÓŻ NIE TYM RAZEM', 'CÓŻ TO SIĘ STAŁO, SKĄD TO ZWĄTPIENIE?', 'KTO BY SIĘ SPODZIEWAŁ ŻE PRZEGRASZ'],
    wonInfo=['WYGRAŁEŚ', 'NIBY WYGRAŁEŚ, ALE I TAK JESTEŚ PRZEGRYWEM','TYM RAZEM CI SIĘ UDAŁO', 'I CZEGO SIĘ CIESZYSZ?'],
    drawInfo=['REMIS', 'GRATULACJE! OBYDWOJE PRZEGRALIŚCIE','REMIS, LEPIEJ JUŻ NIE BĘDZIE'];

//Ustawienia przycisków
hitButton.style.display='none';
stayButton.style.display='none';
tryAgainButton.style.display='none';
newGameButton.style.display='inline';
showStatus();
  
//Przycisk nowa gra
newGameButton.addEventListener('click',function(){
  gameStarted=true;
  gameOver=false;
  playerWon=false;
  
  deck=createDeck();
  shuffleDeck(deck);
  dealerCards=[getNextCard(),getNextCard()];
  playerCards=[getNextCard(),getNextCard()];

  newGameButton.style.display='none';
  tryAgainButton.style.display='inline';
  hitButton.style.display='inline';
  stayButton.style.display='inline';
  showStatus();
});

//Rozpocznij grę od nowa
tryAgainButton.addEventListener('click',function(){
    gameStarted=true;
    gameOver=false;
    playerWon=false;
    
    deck=createDeck();
    shuffleDeck(deck);
    dealerCards=[getNextCard(),getNextCard()];
    playerCards=[getNextCard(),getNextCard()];
  
    newGameButton.style.display='none';
    tryAgainButton.style.display='inline';
    hitButton.style.display='inline';
    stayButton.style.display='inline';
    showStatus();
})

//Dobierz
hitButton.addEventListener('click',function(){
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

//Zostań
stayButton.addEventListener('click',function(){
  gameOver=true;
  checkForEndOfGame();
  showStatus();
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

//Przetasuj info o wygranej
function shuffleWon(wonInfo){
  for (let i=0;i<wonInfo.length;i++){
    let swapIdx=Math.trunc(Math.random()*wonInfo.length);
    let tmp=wonInfo[swapIdx];
    wonInfo[swapIdx]=wonInfo[i];
    wonInfo[i]=tmp;
  }
}

//Przetasuj info o przegranej
function shuffleLose(loseInfo){
  for (let i=0;i<loseInfo.length;i++){
    let swapIdx=Math.trunc(Math.random()*loseInfo.length);
    let tmp=loseInfo[swapIdx];
    loseInfo[swapIdx]=loseInfo[i];
    loseInfo[i]=tmp;
  }
}

//Przetasuj info o remisie
function shuffleDraw(drawInfo){
  for (let i=0;i<drawInfo.length;i++){
    let swapIdx=Math.trunc(Math.random()*drawInfo.length);
    let tmp=drawInfo[swapIdx];
    drawInfo[swapIdx]=drawInfo[i];
    drawInfo[i]=tmp;
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

//Zwracanie wartości punktów
function getCardNumericValue(card){
  switch(card.value){
    case 'A': return 1;
    case '2': return 2;
    case '3': return 3;
    case '4': return 4;
    case '5': return 5;
    case '6': return 6;
    case '7': return 7;
    case '8': return 8;
    case '9': return 9;
    default:  return 10;
  }
}

//Liczenie wyniku
function getScore(cardArray){
  let score=0;
  let hasAce=false;
  for (let i=0;i<cardArray.length;i++){
    let card=cardArray[i];
    score+=getCardNumericValue(card);
    if (card.value==='As'){
      hasAce=true;
    }
  }
  if (hasAce && score+10<=21){
    return score+10;
  }
  return score;
}

//Aktualizacja punktów
function updateScores(){
  dealerScore=getScore(dealerCards);
  playerScore=getScore(playerCards);
}

//Sprawdzanie stanu gry
function checkForEndOfGame(){
  
  updateScores();
  
  if (gameOver){
    while(dealerScore<playerScore && playerScore<=21 && dealerScore<=17){
      dealerCards.push(getNextCard());
      updateScores();
    }
  }
  
  if (playerScore>21){
    playerWon=false;
    gameOver=true;
  }

  else if (dealerScore>21){
    playerWon=true;
    gameOver=true;
  }

  else if (gameOver){
    if (playerScore>dealerScore){
      playerWon=true;
    }

  else {
      playerWon=false;
    }
  }
}

//Wyświetlanie
function showStatus(){
  if (!gameStarted){
    textArea.innerHTML="<p class='inner'>I tak przegrasz xD";
    return;
  }

  let dealerCardString='';
  for (let i=0;i<dealerCards.length;i++){
    dealerCardString+=getCardString(dealerCards[i]);
  }
  
  let playerCardString='';
  for (let i=0;i<playerCards.length;i++){
    playerCardString+=getCardString(playerCards[i]);
  }

  updateScores();
   
  textArea.innerHTML= 
    "<p id='dwajeden'>Jeśli Twój wynik jest równy 21, kliknij \"Zostań\"\.</p>"+
    "<p class='inner'><br>KRUPIER MA:"+dealerCardString+
    "<p class='inner'>WYNIK KRUPIERA: "+dealerScore+'<br><br>'+
    "<p class='inner'>TY MASZ:"+playerCardString+
    "<p class='inner'>TWÓJ WYNIK: "+playerScore+'</p>';
  
  if (gameOver){
    if (playerWon){
      shuffleWon(wonInfo);
      textArea.innerHTML+="<p class='inner'>"+wonInfo[0];
      newGameButton.style.display='none';
      hitButton.style.display='none';
      stayButton.style.display='none';
    }
    else if (playerWon==false && playerScore==dealerScore){
      shuffleDraw(drawInfo);
      textArea.innerHTML+="<p class='inner'>"+drawInfo[0];
      newGameButton.style.display='none';
      hitButton.style.display='none';
      stayButton.style.display='none';
    }
    else{
      shuffleLose(loseInfo);
      textArea.innerHTML+="<p class='inner'>"+loseInfo[0];
      newGameButton.style.display='none';
      hitButton.style.display='none';
      stayButton.style.display='none';
    }
  }

}