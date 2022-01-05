class init{
    displayData(cards) {
        const cardsSection = document.querySelector("#cards-section")
        cards.forEach((card) => {
            const cardModel = new cardTemplate(card)
            const cardDOM = cardModel.getCardDOM()
            cardsSection.appendChild(cardDOM)
        })
    }

    displaySelect(){
        let selectIds = document.querySelectorAll('.sort-select')
        selectIds.forEach((elem) => {
            let mySelect = new selectFactory(elem.id)
            mySelect.openSelect()
            mySelect.getList()
            mySelect.setListToDOM()
        })
    }

    removeCards(){
        let cardsCont = document.querySelector('#cards-section')
        cardsCont.innerHTML = ''
    }

    searchInput(){
        let searchInput = document.querySelector('#searchInput')
        let cardsCont = document.querySelector('#cards-section')
        let sortedCards = []
        let that = this
        searchInput.addEventListener('input', function(){
            if(searchInput.value.length >= 3){
                
                that.removeCards()
                sortedCards = []

                for(let i = 0; i < recipes.length; i++){
                    if(recipes[i].name.indexOf(searchInput.value) !== -1){
                        sortedCards.push(recipes[i]) 
                    }
                }

                that.displayData(sortedCards)


            }
            else{
                that.removeCards()
                that.displayData(recipes)
            }
        })
        
    }
}

let myInit = new init()
myInit.displayData(recipes)
myInit.displaySelect()

myInit.searchInput()