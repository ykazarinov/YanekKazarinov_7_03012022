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
            mySelect.getList(recipes)
            mySelect.setListToDOM(recipes)
        })
    }

    removeCards(){
        let cardsCont = document.querySelector('#cards-section')
        cardsCont.innerHTML = ''
    }

    hiddenNullMessage(){
        let nullResultsMessage = document.querySelector('#aucune-recette')
        if(!nullResultsMessage.classList.contains('hidden')){
            nullResultsMessage.classList.add('hidden')
            console.log('hidden')
           
        }

    }

    searchInput(){
        let searchInput = document.querySelector('#searchInput')
        let sortedCards = []
        let that = this
        searchInput.addEventListener('input', function(){

            // hide the message with null results
            that.hiddenNullMessage()
            
            if(searchInput.value.length >= 3){
                
                
                sortedCards = []
                

                
                that.removeCards()

                for(let i = 0; i < recipes.length; i++){
                    let isAnyOption = false
                    // name
                    if(isAnyOption === false){
                        
                        if( recipes[i].name.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1){

                            if(sortedCards.length !== 0){
                                
                                for(let s = 0; s < sortedCards.length; s++){
                                    
                                    
                                    if(sortedCards[s].id !== recipes[i].id){
                                        sortedCards.push(recipes[i])
                                        isAnyOption = true
                                        that.hiddenNullMessage()
                                        break
                                    }
                                }
                            }else{
                                sortedCards.push(recipes[i])
                                isAnyOption = true
                                that.hiddenNullMessage()
                            }
                             
                           
                            
                        }
                        
                    }
                    // appliance
                    if(isAnyOption === false){
                       
                        if(recipes[i].appliance.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1){
                            if(sortedCards.length !== 0){
                               
                                for(let s = 0; s < sortedCards.length; s++){
                                    if(sortedCards[s].id !== recipes[i].id){
                                        sortedCards.push(recipes[i])
                                        isAnyOption = true
                                        that.hiddenNullMessage()
                                        break
                                    }
                                }
                            }else{
                                sortedCards.push(recipes[i])
                                isAnyOption = true
                                that.hiddenNullMessage()
                            }
                            
                           
                           
                        }
                       
                    }

                    // ingredients
                    if(isAnyOption === false){
                       
                        for(let j = 0; j < recipes[i].ingredients.length; j++){
                            if(recipes[i].ingredients[j].ingredient.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1){
                                
                                if(sortedCards.length !== 0){
                                  
                                    for(let s = 0; s < sortedCards.length; s++){
                                       
                                        if(sortedCards[s].id !== recipes[i].id){
                                            sortedCards.push(recipes[i])
                                            isAnyOption = true
                                            that.hiddenNullMessage()
                                            break
                                        }
                                    }
                                }else{
                                    sortedCards.push(recipes[i])
                                    isAnyOption = true
                                    that.hiddenNullMessage()
                                }
                                
                                
                                
                            }
                        }
                       
                    }

                    // ustensils
                    if(isAnyOption === false){ 
                       
                        for(let j = 0; j < recipes[i].ustensils.length; j++){
                            if(recipes[i].ustensils[j].toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1){
                                if(sortedCards.length !== 0){    
                                  
                                    for(let s = 0; s < sortedCards.length; s++){
                                       
                                        if(sortedCards[s].id !== recipes[i].id){
                                            sortedCards.push(recipes[i])
                                            isAnyOption = true
                                            that.hiddenNullMessage()
                                            break
                                        }
                                    }
                                }else{
                                    sortedCards.push(recipes[i])
                                    isAnyOption = true
                                    that.hiddenNullMessage()
                                }
                                
                                
                                
                            }
                        }
                        
                    }

                    // description
                    if(isAnyOption === false){
                        
                        if(recipes[i].description.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1){
                            if(sortedCards.length !== 0){ 
                               
                                for(let s = 0; s < sortedCards.length; s++){
                                    
                                    if(sortedCards[s].id !== recipes[i].id){
                                        sortedCards.push(recipes[i])
                                        isAnyOption = true
                                        that.hiddenNullMessage()
                                        break
                                    }
                                }
                            }else{
                                sortedCards.push(recipes[i])
                                isAnyOption = true
                                that.hiddenNullMessage()
                            }
                            
                            
                        }
                       
                    }
                    // null results
                    if(sortedCards.length === 0){
                        let nullResultsMessage = document.querySelector('#aucune-recette')
                        nullResultsMessage.classList.remove('hidden')
                        console.log('display')
                       
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