class init{
    // async getCards() {
    //     const cards = await fetch('data/recipes.js')
    //     .then(response => response.json())
    //     console.log(cards)
    //     return cards
    // }

    displayData(cards) {
        const cardsSection = document.querySelector("#cards-section")
        cards.forEach((card) => {
            const cardModel = new cardTemplate(card)
            const cardDOM = cardModel.getCardDOM()
            
            cardsSection.appendChild(cardDOM)

                       
        })
    }
}

let myInit = new init()
// let allData = myInit.getCards()
myInit.displayData(recipes)