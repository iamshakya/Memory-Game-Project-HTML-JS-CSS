/*select all the elements with the class ".memory-card" and stores it in a const
  called "cards"*/
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
  //If the lockBoard is true it returns so the rest of the code won't run
  if(lockBoard) return;

  /*If the same card is clicked twice in a row disableCards() will be executed.
  To avoid that from happening:
  */
  if(this === firstCard) return; //this variable holds the secondCard

  //Adds 'flip' class to the card that's clicked by the user
  this.classList.add('flip');

  if(!hasFlippedCard){
    //First click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  //Second click
  secondCard = this;

  //Do they match??
  checkForMatch();
}

function checkForMatch(){
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  //Removes the EventListener a.k.a disables card
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  //Locks the board till the cards a flipped back
  lockBoard = true;

  //Sets a time delay for flipping back
  setTimeout(()=>{
    //Removes the flip class from the class
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  },1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

/*SHUFFLES THE MEMORY CARDS:
  Each card is assigned a random number bewtween 1-11.
  The sortered in ascending order.
*/
(function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random()*12);
      card.style.order = randomPos;
    });
})() //IIFE (Immediately Invoked Function Expression)

/*Goes through the each card and
  if it's clicked adds the flipCard function*/
cards.forEach(card => card.addEventListener('click', flipCard));
