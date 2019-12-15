document.addEventListener("DOMContentLoaded", () => {
   let currentScore = 0
   let computerScore = 0;
   let deck_ID;


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
         let ul = document.createElement('ul')
         let displayCards = document.querySelector('#board')
         let h3 = document.createElement('h3')
         displayCards.appendChild(ul)
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
            currentScore += Number(card.value)
            // console.log(currentScore)
         })

         //display the sum of the 2 current Cards
         h3.innerText = currentScore
         displayCards.appendChild(h3)

         //
         if (currentScore === 21) {
            let declare = document.querySelector("#winOrLoss")
            return declare.innerText = "BLACKJACK!!!"
         }
         if (currentScore > 21) {
            let declare = document.querySelector("#winOrLoss")
            return declare.innerText = "BUSTED"
         }

      } catch (err) {
         console.log(err)
      }

   }

   const drawCard = async () => {
      let h3 = document.querySelector('h3')
      if (h3) h3.innerHTML = ""
      try {
         let singleCard = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_ID}/draw/?count=1`)
         getCard = singleCard.data.cards[0]
         

         //get image
         
         let ul = document.createElement('ul')
         let displayCards = document.querySelector('#board')
         let h3 = document.createElement('h3')
         displayCards.appendChild(ul)

         let li = document.createElement('li')
         let cardImgs = document.createElement('img')
         cardImgs.src = getCard.image
         li.appendChild(cardImgs)
         ul.appendChild(li)

         if (getCard.value === "JACK" || getCard.value === "QUEEN" || getCard.value === "KING") {
            getCard.value = 10
         } else if (getCard.value === "ACE") getCard.value = 11;
         currentScore += Number(getCard.value)
         // console.log(currentScore)


         //add the sum to the current total
         h3.innerText = currentScore
         displayCards.appendChild(h3)

         if (currentScore === 21) {
            let declare = document.querySelector("#winOrLoss")
            return declare.innerText = "BLACKJACK!!!"
         }
         if (currentScore > 21) {
            let declare = document.querySelector("#winOrLoss")
            return declare.innerText = "BUSTED"
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
         let displayCards = document.querySelector('#board')
         let h3 = document.createElement('h3')
         displayCards.appendChild(ul)
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

         //display the sum of the 2 current Cards
         h3.innerText = computerScore
         displayCards.appendChild(h3)

         //
         if (computerScore === 21) {
            let declare = document.querySelector("#winOrLoss")
            return declare.innerText = "BLACKJACK!!!"
         }
         if (computerScore > 21) {
            let declare = document.querySelector("#winOrLoss")
            return declare.innerText = "BUSTED"
         }

      } catch (err) {
         console.log(err)
      }
   }
   setupBtns()
})

/*
5 parts

1. fetch for a deck
2. draw cards
3. computer draws
4. declare winner


*/