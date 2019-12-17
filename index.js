document.addEventListener("DOMContentLoaded", () => {
   let currentScore = 0
   let computerScore = 0;
   let deck_ID;
   let playerCurr;
   let pcCurr;
   let ul = document.createElement('ul')
   let declare = document.querySelector("#winOrLoss")
   let playerCurrStat = document.querySelector('#playerData')
   

   const setupBtns = () => {
      let startBtn = document.querySelector('#start')
      startBtn.addEventListener('click', () => {
         startBtn.style.visibility = 'hidden'
         clearBoard()
         clearStats()
         fetchCards()
      })
      
      let hitBtn = document.querySelector('#hit')
      hitBtn.addEventListener('click', () => {
         drawCard()
      })
      
      let stayBtn = document.querySelector('#stay')
      stayBtn.addEventListener('click', () => {
         computerDraws()
         declareWinner()
      })
   }


   const fetchCards = async () => {
      
      try {
         let res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
         deck_ID = res.data.deck_id
         let getTwoCards = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_ID}/draw/?count=2`)
         let cards = getTwoCards.data.cards


         //cardsImage
         ul = document.createElement('ul')
         let playerDiv = document.createElement('div')
         playerDiv.id = "playerDiv"
         let displayCards = document.querySelector('#board')
         playerCurr = document.createElement('h3')
         playerCurr.id = "playerData"
         playerDiv.appendChild(ul)
         displayCards.appendChild(playerDiv)
         cards.forEach(card => {
            let li = document.createElement('li')
            let cardImgs = document.createElement('img')
            cardImgs.src = card.image
            li.appendChild(cardImgs)
            ul.appendChild(li)

            //Assign values to J, Q, K and Ace
            if (card.value === "JACK" || card.value === "QUEEN" || card.value === "KING") {
               card.value = 10
            } else if (card.value === "ACE")
               if (currentScore > 10) {
               card.value = 1;
               } else {
                  card.value = 11;
               }

            //Add the current card values 
            currentScore += Number(card.value)


            //display the sum of the 2 current Cards
            playerCurr.innerText = `Current Player score is ${currentScore}`
            playerDiv.appendChild(playerCurr)
         })


         //
         if (currentScore === 21) {
            startBtn = document.querySelector('#start')
            startBtn.style.visibility = "visible"

            playerCurrStat = document.querySelector("#playerData")
            playerCurrStat.innerText = "BLACKJACK!!!"
            declare.appendChild(playerCurrStat)

         }

      } catch (err) {
         console.log(err)
      }

   }

   const drawCard = async () => {

      playerCurrStat = document.querySelector('#playerData')
      if (playerCurrStat) playerCurrStat.parentNode.removeChild(playerCurrStat)

      try {
         let singleCard = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_ID}/draw/?count=1`)
         let getCard = singleCard.data.cards[0]

         //get image
         let playerDiv = document.createElement('div')
         playerDiv.id = "playerDiv"
         let displayCards = document.querySelector('#board')
         playerCurr = document.createElement('h3')
         playerCurr.id = "playerData"
         playerDiv.appendChild(ul)
         displayCards.appendChild(playerDiv)

         let li = document.createElement('li')
         let cardImgs = document.createElement('img')
         cardImgs.src = getCard.image
         li.appendChild(cardImgs)
         ul.appendChild(li)

         if (getCard.value === "JACK" || getCard.value === "QUEEN" || getCard.value === "KING") {
            getCard.value = 10
         } else if (getCard.value === "ACE") getCard.value = 11;

         currentScore += Number(getCard.value)

         //add the sum to the current total
         playerCurr.innerText = `Current Player score is ${currentScore}`
         playerDiv.appendChild(playerCurr)


         if (currentScore === 21) {      
            playerCurr = document.querySelector("#playerData")
            playerCurr.innerText = `Player score is ${currentScore}, BLACKJACK`
            declare.innerText = "PLAYER WINS!!!"
            
            startBtn = document.querySelector('#start')
            startBtn.style.visibility = "visible"
         }

         if (currentScore > 21) {
            playerCurr = document.querySelector("#playerData")
            playerCurr.innerText = `Player score is ${currentScore}, you BUSTED`
            declare.innerText = "PLAYER LOSE!!!"
            
            startBtn = document.querySelector('#start')
            startBtn.style.visibility = "visible"
         }
      }

      catch (err) {
         console.log(err)
      }
   }

   const computerDraws = async () => {

      try {
         let getThreeCards = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_ID}/draw/?count=3`)
         let cards = getThreeCards.data.cards

         //cardsImage
         let ul = document.createElement('ul')
         let computerDiv = document.createElement('div')
         computerDiv.id = "computerDiv"
         let displayCards = document.querySelector('#board')
         pcCurr = document.createElement('h3')
         pcCurr.id = "computerData"
         computerDiv.appendChild(ul)
         displayCards.appendChild(computerDiv)
         cards.forEach(card => {
            let li = document.createElement('li')
            let cardImgs = document.createElement('img')
            cardImgs.src = card.image
            li.appendChild(cardImgs)
            ul.appendChild(li)
            if (card.value === "JACK" || card.value === "QUEEN" || card.value === "KING") {
               card.value = 10
            } else if (card.value === "ACE") card.value = 11;
            // console.log(card.value)
            computerScore += Number(card.value)
         })

         //display the sum of the 3 current Cards
         pcCurr.innerText = `Dealer score is ${computerScore}`
         computerDiv.appendChild(pcCurr)

         //
         if (computerScore === 21) {
            startBtn = document.querySelector('#start')
            startBtn.style.visibility = "visible"

            pcCurr = document.querySelector("#computerData")
            pcCurr.innerText = `Dealer score is ${computerScore}, BLACKJACK`
            declare.innerText = "DEALER WINS!"

         }
         if (computerScore > 21) {
            startBtn = document.querySelector('#start')
            startBtn.style.visibility = "visible"

            pcCurr = document.querySelector("#computerData")
            pcCurr.innerText = `Dealer score is ${computerScore}, Dealer BUSTED`
            declare.innerText = "DEALER LOSE!"
         }

      } catch (err) {
         console.log(err)
      }
   }

   const clearBoard = () => {
      const board = document.querySelector("#board");
      board.innerHTML = "";
   }

   const clearStats = () => {
      currentScore = 0;
      computerScore = 0;
      const winnerOrLoser = document.querySelector("#winOrLoss")
      winnerOrLoser.innerHTML = "";
   }

   const declareWinner = () => {
      if(currentScore > computerScore){
         console.log(currentScore)
         declare.innerText = "PLAYER WINS!"
      } else if (currentScore < computerScore){
         declare.innerText = "DEALER WINS"
      } else {
         "TIE, START A NEW GAME"
      }
   }
   setupBtns()
})
