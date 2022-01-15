class sortSelectTemplate{
    constructor(id){
        this.id = id
        let idName = '#' + this.id
        this.select = document.querySelector(idName)
        this.name = this.capitalizeFirstLetter(id)
        
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    removeList(){
        this.select.querySelector('.sort-list').innerHTML = ''
    }

    openSelect(){
       let that = this
       let input = that.select.querySelector('input')

       // all selects
        let allSelects = document.querySelectorAll('.sort-select')

       input.addEventListener('click', function(){

        // allSelects.forEach((select)=>{
        //     select.querySelector('input').value = ''
        // })

        if(that.select.classList.contains('active')){
            that.select.classList.remove('active')
            
            input.setAttribute('placeholder', that.name)

            that.select.classList.remove('col-lg-4')
            that.select.classList.remove('col-md-5')

            that.select.classList.add('col-lg-2')
            that.select.classList.add('col-md-3')


        }else{
            allSelects.forEach((elem) => {
                elem.classList.remove('active')
                let idPlaceholder = that.capitalizeFirstLetter(elem.id)
                elem.querySelector('input').setAttribute('placeholder', idPlaceholder)

                elem.classList.remove('col-lg-4')
                elem.classList.remove('col-md-5')
    
                elem.classList.add('col-lg-2')
                elem.classList.add('col-md-3')
            })

            that.select.classList.remove('col-lg-2')
            that.select.classList.remove('col-md-3')

            that.select.classList.add('col-lg-4')
            that.select.classList.add('col-md-5')
            
            that.select.classList.add('active')

            if(that.name == 'Ingredients'){
                input.setAttribute('placeholder', 'Recherche un ingredient') 
            }else if(that.name == 'Appareil'){
                input.setAttribute('placeholder', 'Recherche un appareil')
            }else{
                input.setAttribute('placeholder', 'Recherche une ustensile')
            }
        } 
        
       })
    }

    inputTextOnFilter(myRecipes, allSelects){
        let that = this
        let myInput = that.select.querySelector('input')
        let filtredItems = []

        let filtredRecipesTmp = []
        let filtredRecipes = []
        
 
        myInput.addEventListener('input', function(){
        
            // 0. If user input data in the inputElement, we delete all data from anouther inputs
            let ourInput
            allSelects.forEach((mySelect)=>{
                ourInput = document.querySelector('#'+mySelect.id + ' input')
                if(mySelect.id != that.select.id){
                    ourInput.value = ''
                }
            })
            // 0-end

            if(myInput.value.length >= 3){

                // 1. Get recipes:
                if(that.id === 'ingredients'){
                    filtredRecipesTmp = []
                    
                    for(let i = 0; i < recipes.length; i++){
                        
                        for(let j = 0; j < recipes[i].ingredients.length; j++){
                            if(recipes[i].ingredients[j].ingredient.toLowerCase().indexOf(myInput.value.toLowerCase()) !== -1){
                                
                                if(filtredRecipesTmp.length !== 0){
                                    for(let s = 0; s < filtredRecipesTmp.length; s++){
                                        if(filtredRecipesTmp[s].id != recipes[i].id){
                                            filtredRecipesTmp.push(recipes[i])
                                            break
                                        }
                                    }
                                }else{
                                    filtredRecipesTmp.push(recipes[i])
                                 
                                }
                            }
                            else{
                                
                                allSelects.forEach((mySelect)=>{
                                    mySelect.removeList()
                                })
                            }
                        }
                    }
                }
                if(that.id === 'appareil'){
                    filtredRecipesTmp = []
                    for(let i = 0; i < recipes.length; i++){
                        
                        if(recipes[i].appliance.toLowerCase().indexOf(myInput.value.toLowerCase()) !== -1){
                            if(filtredRecipesTmp.length !== 0){
                                for(let s = 0; s < filtredRecipesTmp.length; s++){
                                    if(filtredRecipesTmp[s].id !== recipes[i].id){
                                        filtredRecipesTmp.push(recipes[i])
                                      
                                        break
                                    }
                                }
                            }else{
                                filtredRecipesTmp.push(recipes[i])
                                
                            }
                        } else{
                           
                            allSelects.forEach((mySelect)=>{
                                mySelect.removeList()
                            })
                        }
                    }
                }
                if(that.id === 'ustensiles'){
                    filtredRecipesTmp = []
                    for(let i = 0; i < recipes.length; i++){
                        
                        for(let j = 0; j < recipes[i].ustensils.length; j++){
                            if(recipes[i].ustensils[j].toLowerCase().indexOf(myInput.value.toLowerCase()) !== -1){
                                if(filtredRecipesTmp.length !== 0){    
                                    for(let s = 0; s < filtredRecipesTmp.length; s++){
                                        if(filtredRecipesTmp[s].id !== recipes[i].id){
                                            filtredRecipesTmp.push(recipes[i])
                                           
                                            break
                                        }
                                    }
                                }else{
                                    filtredRecipesTmp.push(recipes[i])
                                   
                                }
                            } else{
                                
                                allSelects.forEach((mySelect)=>{
                                    mySelect.removeList()
                                })
                            }
                        }
                       
                    }
                }
                // 1-end
                // 2. delete dubles
                
                let filtredRecipesTmpId = []
                filtredRecipes = []
                for(let i = 0; i < filtredRecipesTmp.length; i++) {
                    // Si le tableau sortedRecipesTmpId ne contient pas l'id d'une recette (égale à -1) alors je récupère la recette
                    if (filtredRecipesTmpId.indexOf(filtredRecipesTmp[i].id) == -1) {
                        filtredRecipes.push(filtredRecipesTmp[i])
                        filtredRecipesTmpId.push(filtredRecipesTmp[i].id)
                    }
                }
                // 2-end
                console.log(filtredRecipes)
                //3. set items
                allSelects.forEach((mySelect)=>{
                    mySelect.removeList()
                    mySelect.setListToDOM(filtredRecipes)
                })
                // 3-end


                // 4. set items in current filter
                filtredItems = []
                that.removeList()
                for(let i = 0; i < that.getList(myRecipes)[0].length; i++){
                    if(that.getList(myRecipes)[0][i].toLowerCase().indexOf(myInput.value.toLowerCase()) !== -1){
                        let itemIsExist = false
                        for(let j = 0; j<filtredItems.length; j++){
                            if(filtredItems[j].toLowerCase() === that.getList(myRecipes)[0][i].toLowerCase()){
                                itemIsExist = true
                                break
                            }
                        }
                        if(!itemIsExist){
                            filtredItems.push(that.getList(myRecipes)[0][i])
                        }
                    }
                }
                filtredItems.forEach((item, i)=>{
                    let li = document.createElement("li")
                    li.innerHTML = item
                    li.setAttribute('data-tag', item)
                    that.select.querySelector('.sort-list').appendChild(li)
                })
                // 4-end



                
            }
            else{
                    
                
                    allSelects.forEach((mySelect)=>{
                        mySelect.removeList()
                        mySelect.setListToDOM(myRecipes)
                    })

            }
            allSelects.forEach((mySelect)=>{
                mySelect.quantityChangeEvent()
            })
        })
    }

    deleteCSSClassesColumn(elem){
       
        let myClassList = elem.classList
        
        myClassList.forEach((myClass) => {
            if(myClass.indexOf('column-') !== -1){
                elem.classList.remove(myClass)
               
            }
        })
    }

    quantityChangeEvent(){
        
        let that = this
        var target = document.querySelectorAll('.sort-list')
        let myCount
       
        target.forEach((filter) => {

            myCount = filter.children.length
            // console.log(myCount)
            if(myCount >= 0 && myCount < 7){
                // console.log('test1')
                that.deleteCSSClassesColumn(filter)
                filter.classList.add('column-1')
            }
            else if(myCount >= 7 && myCount < 15){
                // console.log('test1')
                that.deleteCSSClassesColumn(filter)
                filter.classList.add('column-2')
            }
            else if(myCount >= 15 && myCount < 25){
                // console.log('test2')
                that.deleteCSSClassesColumn(filter)
                filter.classList.add('column-3')
                }
            else if(myCount >= 25 && myCount < 40){
                // console.log('test2')
                that.deleteCSSClassesColumn(filter)
                filter.classList.add('column-4')
                }
            else if(myCount >= 40 && myCount < 80){
                // console.log('test3')
                that.deleteCSSClassesColumn(filter)
                filter.classList.add('column-5')
            }
            else if(myCount >= 80){
                // console.log('test4')
                that.deleteCSSClassesColumn(filter)
                filter.classList.add('column-8')
            }

        })
      
       
          
    }

    
}

//=============================//

class ingredientsSelectTemplate extends sortSelectTemplate{
    constructor(id, select, name){
        super(id, select, name)
    } 

    capitalizeFirstLetter(string) {
        return super.capitalizeFirstLetter(string)
    }

    openSelect(){
        return super.openSelect()
    }

    removeList(){
        return super.removeList()
    }

    inputTextOnFilter(myRecipes, allSelects){
        return super.inputTextOnFilter(myRecipes, allSelects)
    }

    deleteCSSClassesColumn(elem){
        return super.deleteCSSClassesColumn(elem)
    }

    quantityChangeEvent(){
        return super.quantityChangeEvent()
    }
    getList(recipes){
        let allIngredients = []
        let allIds = []
        
        recipes.forEach((recipe) => {
            recipe.ingredients.forEach((myIngredient) => {
                let verif = false
                for(let i = 0; i < allIngredients.length; i++){
                    if(allIngredients[i].toLowerCase() === myIngredient.ingredient.toLowerCase()){
                        verif = true
                        break
                    }
                }
                if(verif === false){
                    allIngredients.push(myIngredient.ingredient)
                    allIds.push(recipe.id)
                }
            })
        })
        let data = []
        data[0] = allIngredients
        data[1] = allIds
        return data
    }

    setListToDOM(recipes){

        this.getList(recipes)[0].forEach((ingredient, i) => {
           
            let li = document.createElement("li")
            li.innerHTML = ingredient
            li.setAttribute('data-tag', ingredient)
            this.select.querySelector('.sort-list').appendChild(li)
        })
    }
}

//========================================//

class appareilSelectTemplate extends sortSelectTemplate{
    constructor(id, select, name){
        super(id, select, name)
    } 

    capitalizeFirstLetter(string) {
        return super.capitalizeFirstLetter(string)
    }

    openSelect(){
        return super.openSelect()
    }
    removeList(){
        return super.removeList()
    }
    inputTextOnFilter(myRecipes, allSelects){
        return super.inputTextOnFilter(myRecipes, allSelects)
    }
    deleteCSSClassesColumn(elem){
        return super.deleteCSSClassesColumn(elem)
    }

    quantityChangeEvent(){
        return super.quantityChangeEvent()
    }
    getList(recipes){
        let allAppareils = []
        let allIds = []
        recipes.forEach((recipe) => {
            let verif = false
            for(let i = 0; i< allAppareils.length; i++){
                if(allAppareils[i].toLowerCase() === recipe.appliance.toLowerCase()){
                    verif = true
                }
            }
            if(verif === false){
                allAppareils.push(recipe.appliance)
                allIds.push(recipe.id)
            }
        })
        let data = []
        data[0] = allAppareils
        data[1] = allIds
        return data
    }

    setListToDOM(recipes){
        this.getList(recipes)[0].forEach((appliance, i) => {
            let li = document.createElement("li")
            li.innerHTML = appliance
            li.setAttribute('data-tag', appliance)
            this.select.querySelector('.sort-list').appendChild(li)
        })
    }
}

//========================================//

class ustensilesSelectTemplate extends sortSelectTemplate{
    constructor(id, select, name){
        super(id, select, name)
    } 

    capitalizeFirstLetter(string) {
        return super.capitalizeFirstLetter(string)
    }

    openSelect(){
        return super.openSelect()
    }
    removeList(){
        return super.removeList()
    }
    inputTextOnFilter(myRecipes, allSelects){
        return super.inputTextOnFilter(myRecipes, allSelects)
    }
    deleteCSSClassesColumn(elem){
        return super.deleteCSSClassesColumn(elem)
    }

    quantityChangeEvent(){
        return super.quantityChangeEvent()
    }
    getList(recipes){
        let allUstensiles = []
        let allIds = []
        recipes.forEach((recipe) => {
            recipe.ustensils.forEach((myUstensil) => {
                let verif = false
                for(let i = 0; i< allUstensiles.length; i++){
                    if(allUstensiles[i].toLowerCase() === myUstensil.toLowerCase()){
                        verif = true
                    }
                }
                if(verif === false){
                    allUstensiles.push(myUstensil)
                    allIds.push(recipe.id)
                }
            })
        })
        let data = []
        data[0] = allUstensiles
        data[1] = allIds
        return data
    }

    setListToDOM(recipes){
        
        this.getList(recipes)[0].forEach((ustensile, i) => {
            let li = document.createElement("li")
            li.innerHTML = ustensile
            li.setAttribute('data-tag', ustensile)
            this.select.querySelector('.sort-list').appendChild(li)
        })
    }
}