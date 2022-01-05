class cardTemplate{
    constructor(data){
        this.name = data.name,
        this.ingredients = data.ingredients,
        this.time = data.time,
        this.desc = data.description,
        this.appliance = data.appliance,
        this.ustensils = data.ustensils
    }

    getIngredients(){
       
        let content = `<dl>`
        this.ingredients.forEach(myIngredient => {
            let ingredient = myIngredient.ingredient
            let quantity
            if(myIngredient.quantity){
                ingredient += ': '
                quantity = myIngredient.quantity
            }else{
                quantity = ''
            }
            let unit
            if(myIngredient.unit){
                if(myIngredient.unit === 'grammes'){
                    unit = 'g'
                }else{
                    unit = myIngredient.unit
                }
                
            }else{
                unit = ''
            }
            let ingredDOM =
            `<dt class='font-weight-bold'>${ingredient}</dt>
            <dd>${quantity} ${unit}</dd>
            `
            content += ingredDOM
            
        })
        content += `</dl>`
        return content
    }

    getCardDOM(){
        const card = document.createElement( 'div' )
        card.classList.add('col-12')
        card.classList.add('col-md-6')
        card.classList.add('col-lg-4')
        card.classList.add('mb-3')
        card.classList.add('card-container')
        let cardContent = 
        `<div class="card bg-light border-0">
            <img class="card-img-top" src="images/empty.jpg" alt="${this.name}">
            <div class="card-body">
                <div class = 'row title mb-2'>
                    <h5 class="card-title" title='${this.name}'>${this.name}</h5>
                    <div class='time'>${this.time} min</div>
                </div>    
                <div class='row desk'>
                    <div class='col-6 ingredients'>${this.getIngredients()}</div>
                    <p class="col-6 card-text">${this.desc}</p>
                </div>
            
            </div>
        </div>`

        card.innerHTML = cardContent
        return card
    }
}