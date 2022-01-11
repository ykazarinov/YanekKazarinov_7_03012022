class init{
    constructor(){
        this.mySelect = []
   

    }

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
        selectIds.forEach((elem, i) => {
            this.mySelect[i] = new selectFactory(elem.id)
            this.mySelect[i].openSelect()
          
            
        })
      
    }

    //clear values of filter's inputs
    clearValuesOfFilters(){
        let selectIds = document.querySelectorAll('.sort-select input')
        selectIds.forEach((elem) => {
            elem.value = ''
        })
    } 

    sortSelect(recipes){
        let selectIds = document.querySelectorAll('.sort-select')
       
        selectIds.forEach((elem, i) => {
            this.mySelect[i].inputTextOnFilter(recipes)
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
            that.clearValuesOfFilters()

            // hide the message with null results
            that.hiddenNullMessage()
            
            if(searchInput.value.length >= 3){
                that.mySelect[0].removeList()
                that.mySelect[1].removeList()
                that.mySelect[2].removeList()
                
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
                // set recets cards
                that.displayData(sortedCards)

                // set filters lists
                that.mySelect.forEach((select)=>{

                     select.setListToDOM(sortedCards)
                })

                
                that.sortSelect(sortedCards)

            }
            else{
                sortedCards = []
                that.removeCards()
                that.displayData(recipes)
                // that.sortSelect(recipes)

                that.mySelect.forEach((select)=>{
                    select.removeList()
                    select.setListToDOM(recipes)
               })


            }
            })
        
        
    }

    filterItemClick(){
        const tagData = {}
        let tagsContainer = document.querySelector('#tags-section .tags-col')
        document.addEventListener('click', (e)=>{
            if(e.target.parentElement.classList.contains('sort-list')){
                tagData['filterId'] = e.target.parentElement.parentElement.id
                tagData['filterItemValue'] = e.target.innerHTML
            
            let newTag = new tagTemplate(tagData)
            tagsContainer.appendChild(newTag.getTagDOM())
            newTag.closeTag()
            }
        })
        
    }
}

let myInit = new init()
myInit.displayData(recipes)
myInit.displaySelect()


myInit.searchInput()

//tags
myInit.filterItemClick()



   
