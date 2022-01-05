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
}

let myInit = new init()
myInit.displayData(recipes)
myInit.displaySelect()