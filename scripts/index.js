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
            
            // hide the message with null results
            if(!document.querySelector('#aucune-recette').classList.contains('hidden')){
                document.querySelector('#aucune-recette').classList.add('hidden')
            }

            if(searchInput.value.length >= 3){
                
                that.removeCards()
                sortedCards = []

                for(let i = 0; i < recipes.length; i++){
                    let isAnyOption = false

                    // name
                    if( recipes[i].name.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1){
                        sortedCards.push(recipes[i]) 
                        isAnyOption = true
                        
                    }
                    // appliance
                    if(isAnyOption === false){
                        if(recipes[i].appliance.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1){
                            sortedCards.push(recipes[i])
                            isAnyOption = true
                        }
                    }

                    // ingredients
                    if(isAnyOption === false){
                        for(let j = 0; j < recipes[i].ingredients.length; j++){
                            if(recipes[i].ingredients[j].ingredient.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1){
                                sortedCards.push(recipes[i])
                                isAnyOption = true
                            }
                        }
                    }

                    // ustensils
                    if(isAnyOption === false){ 
                        for(let j = 0; j < recipes[i].ustensils.length; j++){
                            if(recipes[i].ustensils[j].toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1){
                                sortedCards.push(recipes[i])
                                isAnyOption = true
                            }
                        }
                    }

                    // description
                    if(isAnyOption === false){
                        if(recipes[i].description.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1){
                            sortedCards.push(recipes[i])
                            isAnyOption = true
                        }
                    }
                    // null results
                    if(isAnyOption === false){
                         document.querySelector('#aucune-recette').classList.remove('hidden')
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