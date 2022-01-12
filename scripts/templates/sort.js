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
            input.setAttribute('placeholder', 'Recherche un ingredient') 
        } 
        
       })
    }

    inputTextOnFilter(myRecipes){
        let that = this
        let myInput = that.select.querySelector('input')

        let filtredItems = []
        let filtredIds = []
        
        
            myInput.addEventListener('input', function(){
                that.removeList()
                filtredItems = []
                filtredIds = []
                if(myInput.value.length >= 3){
                    for(let i = 0; i < that.getList(myRecipes)[0].length; i++){
                        if(that.getList(myRecipes)[0][i].toLowerCase().indexOf(myInput.value.toLowerCase()) !== -1){
                            // console.log(that.getList(myRecipes)[i])
                            let itemIsExist = false
                           
                            for(let j = 0; j<filtredItems.length; j++){
                                if(filtredItems[j].toLowerCase() === that.getList(myRecipes)[0][i].toLowerCase()){
                                    itemIsExist = true
                                    break

                                }
                            }
                            if(!itemIsExist){
                                filtredItems.push(that.getList(myRecipes)[0][i])
                                filtredIds.push(that.getList(myRecipes)[1][i])
                            }
                           

                            
                        }
                        // else{
                        //     console.log('No')
                        // }
                    }
                    // console.log( filtredItems)
                    filtredItems.forEach((item, i)=>{
                        let li = document.createElement("li")
                        li.setAttribute('data-id', filtredIds[i])
                        console.log(item)
                        li.innerHTML = item
                        that.select.querySelector('.sort-list').appendChild(li)
                    })
                    

                    
                }
                else{
                    
                   
                    
                    that.setListToDOM(myRecipes)
                   
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

    inputTextOnFilter(myRecipes){
        return super.inputTextOnFilter(myRecipes)
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
            li.setAttribute('data-id', this.getList(recipes)[1][i])
            li.innerHTML = ingredient
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
    inputTextOnFilter(myRecipes){
        return super.inputTextOnFilter(myRecipes)
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
            li.setAttribute('data-id', this.getList(recipes)[1][i])
            li.innerHTML = appliance
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
    inputTextOnFilter(myRecipes){
        return super.inputTextOnFilter(myRecipes)
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
            li.setAttribute('data-id', this.getList(recipes)[1][i])
            li.innerHTML = ustensile
            this.select.querySelector('.sort-list').appendChild(li)
        })
    }
}