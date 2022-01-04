class cardTemplate{
    constructor(data){
        this.name = data.name,
        this.ingredients = data.ingredients,
        this.time = data.time,
        this.desc = data.description,
        this.appliance = data.appliance,
        this.ustensils = data.ustensils
    }

    getCardDOM(){
        const card = document.createElement( 'div' )
        card.classList.add('col-4')
        let cardContent = 
        `<div class="card">
            <img class="card-img-top" src="images/empty.jpg" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">${this.name}</h5>
            <div class='time'>${this.time} min</div>
            <p class="card-text">${this.desc}</p>
            
            </div>
        </div>`

        card.innerHTML = cardContent
        return card
    }
}