document.addEventListener("DOMContentLoaded", () => {
   let currentScore = 0
   let computerScore = 0;
   let deck_ID;
   let playerCurr;
   let pcCurr;
   let declare = document.querySelector("#winOrLoss")
   let body = document.body
   let playerCurrStat = document.querySelector('#playerData')
   let ul = document.createElement('ul')
   let scoreTracker = document.createElement('div')
   scoreTracker.id = "scores"

   const setupBtns = () => {
      let startBtn = document.querySelector('#start')
      startBtn.addEventListener('click', () => {
         fetchCards()
      })
      let hitBtn = document.querySelector('#hit')
      hitBtn.addEventListener('click', () => {
         drawCard()
      })
      let stayBtn = document.querySelector('#stay')
      stayBtn.addEventListener('click', () => {
         computerDraws()
      })
   }


   const fetchCards = async () => {
      
      try {
         let res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
         deck_ID = res.data.deck_id
         let getTwoCards = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_ID}/draw/?count=2`)
         let cards = getTwoCards.data.cards

         let startBtn = document.querySelector('#start')
         startBtn.parentNode.removeChild(startBtn)

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
            } else if (card.value === "ACE") card.value = 11;
            
            //Add the current card values 
            currentScore += Number(card.value)
            

            //display the sum of the 2 current Cards
            playerCurr.innerText = `Current Player score is ${currentScore}`
            scoreTracker.appendChild(playerCurr)
            body.appendChild(scoreTracker)
         })


         //
         if (currentScore === 21) {
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
      if (playerCurrStat) playerCurrStat.innerHTML = ""

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
         scoreTracker.appendChild(playerCurr)
         body.appendChild(scoreTracker)


         if (currentScore === 21) {
            playerCurr = document.querySelector("#playerData")
            playerCurr.innerText = "BLACKJACK!!!"
            declare.appendChild(playerCurr)
            fetchCards()
           
         }

         if (currentScore > 21) {
            playerCurr = document.querySelector("##playerData")
            playerCurr.innerText = "BUSTED"
            declare.appendChild(playerCurr)
            fetchCards()
         }
      }

      catch (err) {
         console.log(err)
      }
   }

   const computerDraws = async () =>{
      
      try{
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
            // console.log(computerScore)
         })

         //display the sum of the 3 current Cards
         pcCurr.innerText = `Computer score is ${computerScore}`
         scoreTracker.appendChild(pcCurr)
         body.appendChild(scoreTracker)


         //
         if (computerScore === 21) {
            pcCurr = document.querySelector("#computerData")
            pcCurr.innerText = "BLACKJACK!!!"
         }
         if (computerScore > 21) {
            pcCurr = document.querySelector("#computerData")
            pcCurr.innerText = "BUSTED"
         }

      } catch (err) {
         console.log(err)
      }
   }
   const declareWinner = () => {
      declare = document.querySelector("#winOrLoss")
      playerCurr = document.querySelector("#playerData")
      pcCurr = document.querySelector("#computerData")
      
   }
   setupBtns()
   declareWinner
})

/*
5 parts

1. fetch for a deck
2. draw cards
3. computer draws
4. declare winner


*/