class init{
    constructor(){
        this.mySelect = []
        this.searchSortedCards = []
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
        }

    }

    initialSelects(){
        this.mySelect[0].setListToDOM(recipes)
        this.mySelect[1].setListToDOM(recipes)
        this.mySelect[2].setListToDOM(recipes)
        this.sortSelect(recipes)
    }

    searchInput(){
        let searchInput = document.querySelector('#searchInput')
        let that = this

        searchInput.addEventListener('input', function(){
            that.clearValuesOfFilters()

            // hide the message with null results
            that.hiddenNullMessage()
            
            if(searchInput.value.length >= 3){
                that.mySelect[0].removeList()
                that.mySelect[1].removeList()
                that.mySelect[2].removeList()
                that.searchSortedCards = []
                that.removeCards()

                for(let i = 0; i < recipes.length; i++){
                    let isAnyOption = false
                    // name
                    if(isAnyOption === false){
                        if( recipes[i].name.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1){
                            if(that.searchSortedCards.length !== 0){
                                for(let s = 0; s < that.searchSortedCards.length; s++){
                                    if(that.searchSortedCards[s].id !== recipes[i].id){
                                        that.searchSortedCards.push(recipes[i])
                                        isAnyOption = true
                                        that.hiddenNullMessage()
                                        break
                                    }
                                }
                            }else{
                                that.searchSortedCards.push(recipes[i])
                                isAnyOption = true
                                that.hiddenNullMessage()
                            }
                        }
                    }
                    // appliance
                    if(isAnyOption === false){
                        if(recipes[i].appliance.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1){
                            if(that.searchSortedCards.length !== 0){
                                for(let s = 0; s < that.searchSortedCards.length; s++){
                                    if(that.searchSortedCards[s].id !== recipes[i].id){
                                        that.searchSortedCards.push(recipes[i])
                                        isAnyOption = true
                                        that.hiddenNullMessage()
                                        break
                                    }
                                }
                            }else{
                                that.searchSortedCards.push(recipes[i])
                                isAnyOption = true
                                that.hiddenNullMessage()
                            }
                        }
                    }

                    // ingredients
                    if(isAnyOption === false){
                        for(let j = 0; j < recipes[i].ingredients.length; j++){
                            if(recipes[i].ingredients[j].ingredient.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1){
                                if(that.searchSortedCards.length !== 0){
                                    for(let s = 0; s < that.searchSortedCards.length; s++){
                                        if(that.searchSortedCards[s].id !== recipes[i].id){
                                            that.searchSortedCards.push(recipes[i])
                                            isAnyOption = true
                                            that.hiddenNullMessage()
                                            break
                                        }
                                    }
                                }else{
                                    that.searchSortedCards.push(recipes[i])
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
                                if(that.searchSortedCards.length !== 0){    
                                    for(let s = 0; s < that.searchSortedCards.length; s++){
                                        if(that.searchSortedCards[s].id !== recipes[i].id){
                                            that.searchSortedCards.push(recipes[i])
                                            isAnyOption = true
                                            that.hiddenNullMessage()
                                            break
                                        }
                                    }
                                }else{
                                    that.searchSortedCards.push(recipes[i])
                                    isAnyOption = true
                                    that.hiddenNullMessage()
                                }
                            }
                        }
                    }

                    // description
                    if(isAnyOption === false){
                        if(recipes[i].description.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1){
                            if(that.searchSortedCards.length !== 0){ 
                                for(let s = 0; s < that.searchSortedCards.length; s++){
                                    if(that.searchSortedCards[s].id !== recipes[i].id){
                                        that.searchSortedCards.push(recipes[i])
                                        isAnyOption = true
                                        that.hiddenNullMessage()
                                        break
                                    }
                                }
                            }else{
                                that.searchSortedCards.push(recipes[i])
                                isAnyOption = true
                                that.hiddenNullMessage()
                            }
                        }
                    }
                    // null results
                    if(that.searchSortedCards.length === 0){
                        let nullResultsMessage = document.querySelector('#aucune-recette')
                        nullResultsMessage.classList.remove('hidden')
                    }
                
                }
                // set recets cards
                that.displayData(that.searchSortedCards)

                // set filters lists
                that.mySelect.forEach((select)=>{
                     select.setListToDOM(that.searchSortedCards)
                     select.quantityChangeEvent()
                })

                that.sortSelect(that.searchSortedCards)

            }
            else{
                that.searchSortedCards = []
                that.removeCards()
                that.displayData(recipes)
                
                that.mySelect.forEach((select)=>{
                    select.removeList()
                    select.setListToDOM(recipes)
                    select.quantityChangeEvent()
                    
               })
            }
        })
    }

    collectAllTags(){
        
        let tags = document.querySelectorAll('.tag')
        let tagsData = []
        
        tags.forEach((elem, i) => {
            let arr = {}
            arr['type'] = elem.getAttribute('data-type')
            arr['text'] = elem.textContent.replace(/\s+/g, '')
            tagsData.push(arr)
        })
        return tagsData
    }

    createCardsListBasedOnTags(){
        let tagsData = this.collectAllTags()
        let sortedRecipes = []
        let sortedRecipesTmp = []

        let ingredientFound
        let appareilFound
        let ustensilesFound

        let allTagsTypes = []

        tagsData.forEach((myTagData) => {
            if(allTagsTypes.indexOf(myTagData['type']) == -1){
                allTagsTypes.push(myTagData['type'])
            }
        })

        for(let i = 0; i < recipes.length; i++){ 
            ingredientFound = false
            appareilFound = false
            ustensilesFound = false 
            for(let r = 0; r < tagsData.length; r++){
                if(tagsData[r].type == 'ingredients'){
                    for(let j = 0; j < recipes[i].ingredients.length; j++){
                        if(recipes[i].ingredients[j].ingredient.replace(/\s+/g, '').toLowerCase().indexOf(tagsData[r].text.toLowerCase()) !== -1){
                            ingredientFound = true
                        }
                    }
                  
                }else if(tagsData[r].type == 'appareil'){
                    if(recipes[i].appliance.replace(/\s+/g, '').toLowerCase().indexOf(tagsData[r].text.toLowerCase()) !== -1){
                        appareilFound = true
                    }
                    
                }else if(tagsData[r].type == 'ustensiles'){
                    for(let j = 0; j < recipes[i].ustensils.length; j++){
                        if(recipes[i].ustensils[j].replace(/\s+/g, '').toLowerCase().indexOf(tagsData[r].text.toLowerCase()) !== -1){
                            ustensilesFound = true
                        }
                    }
                }
            } 

            if(!ingredientFound){
                if(allTagsTypes.indexOf('ingredients') == -1){
                    ingredientFound = true
                }
            }
            
            if(!appareilFound){
                if(allTagsTypes.indexOf('appareil')  == -1){
                    appareilFound = true
                }
            }
            if(!ustensilesFound){
                if(allTagsTypes.indexOf('ustensiles') == -1){
                    ustensilesFound = true
                }
            }
            console.log(ingredientFound, appareilFound, ustensilesFound)
            
            if(ingredientFound && appareilFound && ustensilesFound){
                sortedRecipesTmp.push(recipes[i])
            }
            
        }



       



        // Je supprime les doublons
        let sortedRecipesTmpId = []
        for(let i = 0; i < sortedRecipesTmp.length; i++) {
            // Si le tableau sortedRecipesTmpId ne contient pas l'id d'une recette (égale à -1) alors je récupère la recette
            if (sortedRecipesTmpId.indexOf(sortedRecipesTmp[i].id) == -1) {
                sortedRecipes.push(sortedRecipesTmp[i])
                sortedRecipesTmpId.push(sortedRecipesTmp[i].id)
            }
        }
        this.removeCards()
        this.displayData(sortedRecipes)
    }


    closeTag(){
        let that = this
        let tags
        let eventActive = false
        const listener = function(e){
            if(e.target.parentElement.classList.contains('tag')){
                
                e.target.parentNode.remove()
                tags = document.querySelectorAll('.tag')

                let tagText = e.target.parentElement.textContent.replace(/\s+/g, '')
                let dataType = e.target.parentElement.getAttribute('data-type')
                let items

                function findItem(items, sample){
                    items.forEach((item)=>{
                        if(item.textContent.replace(/\s+/g, '') == sample){
                            item.classList.remove('noclick')
                        }
                    })
                }

                switch (dataType) {
                    case "ingredients":
                        
                        items = document.querySelectorAll('#ingredients .sort-list li')
                        findItem(items, tagText)
                        break
                    case "appareil":
                        items = document.querySelectorAll('#appareil .sort-list li')
                        findItem(items, tagText)
                        break
                    case "ustensiles":
                        items = document.querySelectorAll('#ustensiles .sort-list li')
                        findItem(items, tagText)
                        break
                }

                if(tags.length != 0){
                    
                    that.createCardsListBasedOnTags()
                   
                }else{
                    that.removeCards()
                    if(that.searchSortedCards.length != 0){
                        // if somithing is inputed in searchInput
                        that.displayData(that.searchSortedCards)
                    }else{
                        // if nothing is not inputed in searchInput
                        that.displayData(recipes)
                    }
                }
            }
        }

        if(!eventActive){
            eventActive = true
            document.addEventListener('click', listener, false)
        }
    }

    filterItemClick(){
        let that = this
        const tagData = {}
        let tagsContainer = document.querySelector('#tags-section .tags-col')
        let eventActive = false
        if(!eventActive){
            eventActive = true
            document.addEventListener('click', (e)=>{
                if(e.target.parentElement.classList.contains('sort-list')){
                    tagData['filterId'] = e.target.parentElement.parentElement.id
                    tagData['filterItemValue'] = e.target.innerHTML
                    let newTag = new tagTemplate(tagData)
                    tagsContainer.appendChild(newTag.getTagDOM())
                    that.createCardsListBasedOnTags()
                    e.target.classList.add('noclick')
                }
            })
        }
    }
}

let myInit = new init()

myInit.displayData(recipes)
myInit.displaySelect()

myInit.searchInput()

myInit.initialSelects()

//tags
myInit.filterItemClick()
myInit.closeTag()






   
