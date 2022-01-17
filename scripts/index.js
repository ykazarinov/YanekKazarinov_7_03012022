class init{
    constructor(){
        this.mySelect = []
        this.searchSortedCards = []
        this.notActiveTagsNames = []
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
            this.mySelect[i].inputTextOnFilter(recipes, this.mySelect)
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

        let resultTmp = []

        searchInput.addEventListener('input', function(){
            that.clearValuesOfFilters()
            that.hiddenNullMessage()
            if(searchInput.value.length >= 3){
                console.time('doSomething')
                that.mySelect[0].removeList()
                that.mySelect[1].removeList()
                that.mySelect[2].removeList()
                that.searchSortedCards = []
                that.removeCards()

                // name
                recipes.filter(
                    rec => rec.name.toLowerCase().includes(
                        searchInput.value.toLowerCase()
                        )
                    ).forEach((myResult)=>{
                        resultTmp.push(myResult)
                })
                
                // Appliance
                recipes.filter(
                    rec => rec.appliance.toLowerCase().includes(
                        searchInput.value.toLowerCase()
                    )
                ).forEach((myResult) => {
                    resultTmp.push(myResult)
                })
                
                // description
                recipes.filter(
                    rec => rec.description.toLowerCase().includes(
                        searchInput.value.toLowerCase()
                    )
                ).forEach((myResult) => {
                    resultTmp.push(myResult)
                })

                // ustensils
                recipes.filter(
                    rec => rec.ustensils.find(
                        ust => ust.toLowerCase().includes(
                            searchInput.value.toLowerCase()
                        )
                    )
                ).forEach((myResult) => {
                    resultTmp.push(myResult)
                })
                    
                // ingredients
                recipes.filter(
                    rec => rec.ingredients.find(
                        ing => ing.ingredient.toLowerCase().includes(
                            searchInput.value.toLowerCase()
                        )
                    )
                ).forEach((myResult) => {
                    resultTmp.push(myResult)
                })


                
                // Je supprime les doublons
                let sortedRecipesTmpId = []
                that.searchSortedCards = []
                for(let i = 0; i < resultTmp.length; i++) {
                    // Si le tableau sortedRecipesTmpId ne contient pas l'id d'une recette (égale à -1) alors je récupère la recette
                    if (sortedRecipesTmpId.indexOf(resultTmp[i].id) == -1) {
                        that.searchSortedCards.push(resultTmp[i])
                        sortedRecipesTmpId.push(resultTmp[i].id)
                    }
                } 
                resultTmp = []

                // console.log(that.searchSortedCards)

                // null results
                if(that.searchSortedCards.length === 0){
                    let nullResultsMessage = document.querySelector('#aucune-recette')
                    nullResultsMessage.classList.remove('hidden')
                }else{
                    that.hiddenNullMessage()
                }

                //  // set recets cards
                that.removeCards()
                that.displayData(that.searchSortedCards)

                // set filters lists
                that.mySelect.forEach((select)=>{
                    select.setListToDOM(that.searchSortedCards)
                    select.quantityChangeEvent()
                })

                that.sortSelect(that.searchSortedCards)
                console.timeEnd('doSomething')
                
            }else{
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
            arr['text'] = elem.getAttribute('data-tag')
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

        let countGoodIngrediends
        let countGoodAppareil
        let countGoodUsensiles

        let ingredientsTagsCount = 0
        let appareilTagsCount = 0
        let usensilesTagsCount = 0

        let allTagsTypes = []

        tagsData.forEach((myTagData) => {
            if(allTagsTypes.indexOf(myTagData['type']) == -1){
                allTagsTypes.push(myTagData['type'])
            }
            if(myTagData['type'] == 'ingredients'){
                ingredientsTagsCount++
            }
            if(myTagData['type'] == 'appareil'){
                appareilTagsCount++
            }
            if(myTagData['type'] == 'ustensiles'){
                usensilesTagsCount++
            }
        })
        

        for(let i = 0; i < recipes.length; i++){ 
                ingredientFound = false
                appareilFound = false
                ustensilesFound = false 

                countGoodIngrediends = 0
                countGoodAppareil = 0
                countGoodUsensiles = 0
            for(let r = 0; r < tagsData.length; r++){

                if(tagsData[r].type == 'ingredients'){
                    for(let j = 0; j < recipes[i].ingredients.length; j++){
                        if(recipes[i].ingredients[j].ingredient.toLowerCase() === tagsData[r].text.toLowerCase()){
                            countGoodIngrediends++
                        }
                        if(countGoodIngrediends === ingredientsTagsCount){
                            ingredientFound = true
                        }
                    }
                  
                }else if(tagsData[r].type == 'appareil'){
                    if(recipes[i].appliance.toLowerCase() === tagsData[r].text.toLowerCase()){
                        countGoodAppareil++
                        
                    }
                    if(countGoodAppareil === appareilTagsCount){
                        appareilFound = true
                    }
                    
                }else if(tagsData[r].type == 'ustensiles'){
                    for(let j = 0; j < recipes[i].ustensils.length; j++){
                        if(recipes[i].ustensils[j].toLowerCase() === tagsData[r].text.toLowerCase()){
                            countGoodUsensiles++
                        }
                        if(countGoodUsensiles === usensilesTagsCount){
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
            //  console.log(ingredientFound, appareilFound, ustensilesFound)
            
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

        // change lists of the filters
        this.mySelect.forEach((select)=>{
            select.removeList()
            select.setListToDOM(sortedRecipes)
            select.quantityChangeEvent()
            
       })
    }


    closeTag(){
        let that = this
        let tags
        let eventActive = false
        const listener = function(e){
           
                if(e.target.parentElement.classList.contains('tag')){
                    
                    e.target.parentNode.remove()
                    tags = document.querySelectorAll('.tag')

                    let tagText = e.target.parentElement.getAttribute('data-tag')
                    let dataType = e.target.parentElement.getAttribute('data-type')
                    // let items

                    function findItem(items, sample){
                        // items.forEach((item)=>{
                        //     if(item.textContent.replace(/\s+/g, '') == sample){
                        //         item.classList.remove('noclick')
                        //     }
                        // })
                        let myIndex
                        
                        myIndex = items.indexOf(sample)
                        if(myIndex != -1){
                            items.splice(myIndex, 1)
                        }
                        
                        items.forEach((item)=>{
                            if(document.querySelector('li[data-tag="'+item+'"]')){
                                document.querySelector('li[data-tag="'+item+'"]').classList.add('noclick')
                            }
                            
                        })
                    }



                    if(tags.length != 0){
                        
                        that.createCardsListBasedOnTags()
                    
                    }else{
                        that.removeCards()
                        if(that.searchSortedCards.length != 0){
                            // if somithing is inputed in searchInput
                            that.displayData(that.searchSortedCards)

                            // change lists of the filters
                            that.mySelect.forEach((select)=>{
                                select.removeList()
                                select.setListToDOM(that.searchSortedCards)
                                select.quantityChangeEvent()
                                    
                            })
                        }else{
                            // if nothing is not inputed in searchInput
                            that.displayData(recipes)
                            that.mySelect.forEach((select)=>{
                                select.removeList()
                                select.setListToDOM(recipes)
                                select.quantityChangeEvent()
                                    
                            })
                        }
                    }

                    findItem(that.notActiveTagsNames, tagText)
                }
            
        }

        if(!eventActive){
            eventActive = true
            document.querySelector('.tags-col').addEventListener('click', listener, false)
        }
    }

    // filterBlur(){
    //     let allInputs = document.querySelectorAll('.sort-select input')
    //     let selectId

    //     allInputs.forEach((myInput)=> {
    //         myInput.addEventListener('blur', (e)=>{
    //             selectId = e.target.parentNode.id
                
    //             e.target.value = ''
    //             e.target.parentNode.classList.remove('active')
                
    //         })
    //     })
    // }

    filterItemClick(){
        let that = this
        const tagData = {}
        let tagsContainer = document.querySelector('#tags-section .tags-col')
        let eventActive = false
        if(!eventActive){
            eventActive = true
            document.addEventListener('click', (e)=>{

               

                let targetDataTagAttr = e.target.getAttribute('data-tag')
                if(e.target.parentElement.classList.contains('sort-list')){

                     //clear all filters
                    e.target.parentNode.parentNode.querySelector('input').value = ''

                    //close select
                    // e.target.parentNode.parentNode.classList.remove('active')
                        
                

                    tagData['filterId'] = e.target.parentElement.parentElement.id
                    // tagData['filterItemValue'] = e.target.innerHTML
                    tagData['filterItemValue'] = e.target.getAttribute('data-tag')
                    // console.log(tagData['filterItemValue'])
                    let newTag = new tagTemplate(tagData)
                    tagsContainer.appendChild(newTag.getTagDOM())
                    that.createCardsListBasedOnTags()
                    that.notActiveTagsNames.push(targetDataTagAttr)
                    
                    that.notActiveTagsNames.forEach((notActiveTagName)=>{
                        if(document.querySelector('li[data-tag="'+notActiveTagName+'"]')){
                            document.querySelector('li[data-tag="'+notActiveTagName+'"]').classList.add('noclick')
                        }
                        
                    })
                    
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








   
